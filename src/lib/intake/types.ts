export type IngestionStageId =
  | "stage-01-pre-sanitizer"
  | "stage-02-sharp-media"
  | "stage-03-zod-gate"
  | "stage-04-mapping-memory"
  | "stage-05-db-commit";

export type IngestionStatus = "passed" | "healed" | "blocked" | "processing";

export interface StageTelemetry {
  id: IngestionStageId;
  name: string;
  order: number;
  durationMs: number;
  status: IngestionStatus;
  details: string;
  itemsProcessed: number;
  itemsHealed: number;
  itemsBlocked: number;
  logs: string[];
}

export interface HealedCellLog {
  row: number;
  column: string;
  originalValue: string;
  healedValue: string | number | boolean;
  ruleApplied?: string;
  rule?: string;
  confidence: number;
}

export interface MediaDuplicationLog {
  assetId: string;
  fileName: string;
  originalUrl: string;
  dHash: string;
  hammingDistance: number;
  duplicateOf?: string;
  isDuplicate: boolean;
  normalizedAspect: "1:1";
  canvasPadded: boolean;
  format: "webp";
}

export interface BatchEvent {
  id: string;
  timestamp: string;
  clientSlug: string;
  clientName: string;
  fileName: string;
  totalRows: number;
  validRows: number;
  healedCells: number;
  blockedDuplicates: number;
  sha256Signature: string;
  latencyMs: number;
  status: IngestionStatus;
  stages: StageTelemetry[];
  healedLogs: HealedCellLog[];
  mediaLogs: MediaDuplicationLog[];
}

export type ChartFormType = "spline-wave" | "velocity-bars" | "activity-rings" | "sla-latency";

export interface HourlyTelemetryNode {
  hour: string;
  rpm: number;
  throughputKb: number;
  healedCount: number;
  blockedCount: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  successRate: number;
}

export interface FieldConstraint {
  id: string;
  name: string;
  label: string;
  type: "string" | "number" | "boolean" | "datetime" | "currency" | "url" | "image";
  required: boolean;
  defaultValue?: string | number | boolean;
  regexPattern?: string;
  minVal?: number;
  maxVal?: number;
  allowedValues?: string[];
  description?: string;
}

export interface SchemaBlueprint {
  id: string;
  name: string;
  slug: string;
  version: string;
  description: string;
  fields: FieldConstraint[];
  updatedAt: string;
}

export interface MappingMemoryRecord {
  id: string;
  headerHash: string;
  clientSlug: string;
  clientName: string;
  detectedHeaders: string[];
  targetFieldMappings: Record<string, string>; // rawHeader -> targetField
  matchCount: number;
  confidence: number;
  createdAt: string;
  lastMatchedAt: string;
}
