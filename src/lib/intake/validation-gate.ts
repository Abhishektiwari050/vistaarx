import { z } from "zod";
import { HealedCellLog } from "./types";

/**
 * Coerces various truthy/falsy string representations to boolean
 */
export function coerceToBoolean(val: unknown): boolean {
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val !== 0;
  if (typeof val === "string") {
    const s = val.trim().toLowerCase();
    if (["true", "1", "yes", "y", "t", "active", "enabled"].includes(s)) return true;
    if (["false", "0", "no", "n", "f", "inactive", "disabled", ""].includes(s)) return false;
  }
  return Boolean(val);
}

/**
 * Normalizes multi-format date strings (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, timestamps) into strict ISO 8601
 */
export function coerceToISO8601(val: unknown, fallbackDate = new Date()): { iso: string; healed: boolean } {
  if (!val) {
    return { iso: fallbackDate.toISOString(), healed: true };
  }

  const s = String(val).trim();

  // Already ISO-8601 (e.g. 2026-03-24T14:30:00Z)
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/i.test(s)) {
    const d = new Date(s);
    if (!isNaN(d.getTime())) return { iso: d.toISOString(), healed: false };
  }

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return { iso: `${s}T00:00:00.000Z`, healed: true };
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, "0");
    const month = dmyMatch[2].padStart(2, "0");
    const year = dmyMatch[3];
    const parsed = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    if (!isNaN(parsed.getTime())) {
      return { iso: parsed.toISOString(), healed: true };
    }
  }

  // Unix epoch timestamp (seconds or milliseconds)
  if (/^\d{10,13}$/.test(s)) {
    const num = parseInt(s, 10);
    const ms = s.length === 10 ? num * 1000 : num;
    const parsed = new Date(ms);
    if (!isNaN(parsed.getTime())) {
      return { iso: parsed.toISOString(), healed: true };
    }
  }

  // Fallback parsing
  const fallbackParsed = new Date(s);
  if (!isNaN(fallbackParsed.getTime())) {
    return { iso: fallbackParsed.toISOString(), healed: true };
  }

  return { iso: fallbackDate.toISOString(), healed: true };
}

/**
 * Standard Enterprise Inventory / Asset Intake Schema
 */
export const EnterpriseAssetSchema = z.object({
  sku: z.string().min(1, "SKU is required").transform((val) => val.trim().toUpperCase()),
  product_name: z.string().min(1, "Product name is required").transform((val) => val.trim()),
  unit_price: z.coerce.number().min(0, "Price must be non-negative"),
  quantity_in_stock: z.coerce.number().int().min(0).default(0),
  is_active: z.preprocess(coerceToBoolean, z.boolean()).default(true),
  category: z.string().default("Uncategorized").transform((val) => val.trim() || "Uncategorized"),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid ISO timestamp"),
  media_url: z.string().url().optional().or(z.literal("")),
});

export type EnterpriseAsset = z.infer<typeof EnterpriseAssetSchema>;

/**
 * Validates a single record against the enterprise schema, executing deterministic coercions
 * and tracking all healed cells.
 */
export function validateAndHealRecord(
  rawRecord: Record<string, unknown>,
  rowIndex = 1
): {
  success: boolean;
  data?: EnterpriseAsset;
  errors?: string[];
  healedLogs: HealedCellLog[];
} {
  const healedLogs: HealedCellLog[] = [];
  const transformed: Record<string, unknown> = { ...rawRecord };

  // 1. Check SKU uppercase coercion
  if (typeof transformed.sku === "string" && transformed.sku !== transformed.sku.toUpperCase()) {
    healedLogs.push({
      row: rowIndex,
      column: "sku",
      originalValue: transformed.sku,
      healedValue: transformed.sku.toUpperCase().trim(),
      rule: "UPPERCASE_AND_TRIM_SKU",
      confidence: 1.0,
    });
    transformed.sku = transformed.sku.toUpperCase().trim();
  }

  // 2. Check Unit Price string coercion
  if (typeof transformed.unit_price === "string") {
    const rawVal = transformed.unit_price;
    const num = parseFloat(rawVal.replace(/[^0-9.-]/g, ""));
    if (!isNaN(num)) {
      healedLogs.push({
        row: rowIndex,
        column: "unit_price",
        originalValue: rawVal,
        healedValue: num,
        rule: "STRING_TO_FLOAT_COERCION",
        confidence: 0.99,
      });
      transformed.unit_price = num;
    }
  }

  // 3. Check Date ISO 8601 coercion
  if (transformed.created_at) {
    const dateCoerce = coerceToISO8601(transformed.created_at);
    if (dateCoerce.healed) {
      healedLogs.push({
        row: rowIndex,
        column: "created_at",
        originalValue: String(transformed.created_at),
        healedValue: dateCoerce.iso,
        rule: "COERCE_TO_ISO8601",
        confidence: 0.98,
      });
    }
    transformed.created_at = dateCoerce.iso;
  } else {
    const nowIso = new Date().toISOString();
    healedLogs.push({
      row: rowIndex,
      column: "created_at",
      originalValue: "NULL",
      healedValue: nowIso,
      rule: "DEFAULT_TIMESTAMP_INJECTION",
      confidence: 1.0,
    });
    transformed.created_at = nowIso;
  }

  // 4. Boolean normalization
  if (transformed.is_active !== undefined && typeof transformed.is_active !== "boolean") {
    const original = String(transformed.is_active);
    const booleanVal = coerceToBoolean(transformed.is_active);
    healedLogs.push({
      row: rowIndex,
      column: "is_active",
      originalValue: original,
      healedValue: booleanVal,
      rule: "TRUTHY_STRING_TO_BOOLEAN",
      confidence: 0.99,
    });
    transformed.is_active = booleanVal;
  }

  // 5. Run Zod strict validation
  const result = EnterpriseAssetSchema.safeParse(transformed);

  if (result.success) {
    return {
      success: true,
      data: result.data,
      healedLogs,
    };
  } else {
    return {
      success: false,
      errors: result.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`),
      healedLogs,
    };
  }
}
