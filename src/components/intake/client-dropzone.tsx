"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  QrCode,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  X,
  RefreshCw,
  Camera,
  Smartphone,
  ShieldCheck,
  Check,
} from "lucide-react";
import { BatchEvent, HealedCellLog } from "@/lib/intake/types";

interface ClientDropzoneProps {
  clientSlug?: string;
  clientName?: string;
  onBatchIngested?: (event: BatchEvent) => void;
}

export function ClientDropzone({
  clientSlug = "enterprise-client",
  clientName = "Enterprise Client",
  onBatchIngested,
}: ClientDropzoneProps) {
  // Global Window Dragging State
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  const dragCounter = useRef(0);

  // Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isChunking, setIsChunking] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(20);
  const [transferSpeed, setTransferSpeed] = useState("42.4 MB/s");

  // Modals & Drawers
  const [showRemapModal, setShowRemapModal] = useState(false);
  const [showQRBridge, setShowQRBridge] = useState(false);
  const [showHealingDrawer, setShowHealingDrawer] = useState(false);
  const [healedPreviewLogs, setHealedPreviewLogs] = useState<HealedCellLog[]>([]);
  const [lastUploadedBatch, setLastUploadedBatch] = useState<BatchEvent | null>(null);

  // Column Remapping State
  const [rawHeaders, setRawHeaders] = useState<string[]>([
    "Item Code / SKU",
    "Product Description",
    "Price USD ($)",
    "Available Units",
    "Published Status",
    "Asset Image URL",
  ]);
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({
    "Item Code / SKU": "sku",
    "Product Description": "product_name",
    "Price USD ($)": "unit_price",
    "Available Units": "quantity_in_stock",
    "Published Status": "is_active",
    "Asset Image URL": "media_url",
  });

  // Global window drag-and-drop listener
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current += 1;
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current -= 1;
      if (dragCounter.current <= 0) {
        setIsWindowDragging(false);
        dragCounter.current = 0;
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsWindowDragging(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        handleFileSelection(file);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    // Simulate chunked upload for batches
    startChunkedUpload(file.name);
  };

  const startChunkedUpload = (fileName: string) => {
    setIsChunking(true);
    setUploadProgress(0);
    setCurrentChunk(1);
    const chunks = 20;
    setTotalChunks(chunks);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      setCurrentChunk(Math.min(chunks, Math.ceil((progress / 100) * chunks)));

      if (progress >= 100) {
        clearInterval(interval);
        setIsChunking(false);

        // Auto-run intake simulation for this uploaded batch
        fetch("/api/intake/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scenario: "currency-chaos",
            clientName,
            clientSlug,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.success && data.event) {
              setLastUploadedBatch(data.event);
              setHealedPreviewLogs(data.event.healedLogs);
              if (onBatchIngested) onBatchIngested(data.event);
            }
          })
          .catch(console.error);
      }
    }, 120);
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#0D0D0E]/95 backdrop-blur-2xl border border-white/[0.14] shadow-2xl p-6 md:p-8 space-y-6 select-none overflow-hidden">
      {/* ── FULL-WINDOW DRAGGING FROSTED GLASS OVERLAY ── */}
      {isWindowDragging && (
        <div className="fixed inset-0 z-50 bg-[#060709]/85 backdrop-blur-3xl border-2 border-dashed border-sky-400 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
          <div className="w-20 h-20 rounded-3xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-[#38BDF8] animate-bounce mb-4">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            Release to Ingest into Vistar Intake OS
          </h2>
          <p className="font-sans text-sm text-neutral-300 mt-2 max-w-md">
            Zero-rejection pipeline automatically activates BOM stripping, dHash deduplication, and schema validation.
          </p>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-[#38BDF8] text-[10px] font-mono font-bold tracking-wider">
              CLIENT MAGIC INTAKE PORTAL &bull; {clientSlug.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Zero-Login Secure Link
            </span>
          </div>
          <h2 className="font-display font-bold text-xl md:text-2xl text-white mt-1">
            {clientName} Ingestion Dropzone
          </h2>
          <p className="font-sans text-xs text-neutral-400 mt-1 max-w-xl">
            Drop messy supplier spreadsheets (CSV, XLSX) or unpadded asset zip dumps. Automatic BOM cleaning, perceptual duplicate purges, and Drizzle PostgreSQL commit.
          </p>
        </div>

        {/* Action Buttons: Remap & Mobile QR Bridge */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRemapModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-mono font-semibold transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Column Remapper</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQRBridge(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-mono font-semibold transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mobile Camera Bridge</span>
          </button>
        </div>
      </div>

      {/* Primary Dropzone Interactive Target */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelection(e.dataTransfer.files[0]);
          }
        }}
        className="relative group rounded-2xl border-2 border-dashed border-white/15 hover:border-sky-400/60 bg-white/[0.02] hover:bg-sky-500/[0.02] transition-all p-8 md:p-12 text-center flex flex-col items-center justify-center cursor-pointer"
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.json,.zip"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileSelection(e.target.files[0]);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-105 group-hover:border-sky-400/40 group-hover:bg-sky-500/10 flex items-center justify-center text-neutral-300 group-hover:text-[#38BDF8] transition-all mb-4">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="font-display font-bold text-base md:text-lg text-white">
          Drop Master Inventory Spreadsheet or Raw Asset Archive
        </h3>
        <p className="font-sans text-xs text-neutral-400 mt-1 max-w-md">
          Supports CSV with UTF-8/UTF-16 BOM, messy currency tokens ($/€/£/¥), and raw image folders (&gt;100MB chunked upload).
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[11px] font-mono text-neutral-500">
          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">.CSV / .XLSX</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">.ZIP (Images)</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">Up to 2GB Chunks</span>
        </div>
      </div>

      {/* Chunked Upload Progress Telemetry */}
      {isChunking && (
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-sky-400/30 space-y-3 font-mono text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white">
            <span className="font-bold flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
              Chunked Ingestion Active ({uploadProgress}%)
            </span>
            <span className="text-sky-300">
              Chunk {currentChunk} of {totalChunks} &bull; {transferSpeed}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
            <div
              style={{ width: `${uploadProgress}%` }}
              className="h-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] rounded-full transition-all duration-150"
            />
          </div>

          <div className="flex justify-between text-[11px] text-neutral-400">
            <span>Stage 01: Pre-Sanitizer buffer stream active</span>
            <span className="text-emerald-400">0 dropped packets</span>
          </div>
        </div>
      )}

      {/* Last Upload Results & Validation Error Healing Drawer */}
      {lastUploadedBatch && (
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold">{lastUploadedBatch.fileName}</div>
              <div className="text-[11px] text-neutral-400">
                {lastUploadedBatch.validRows} rows committed &bull; {lastUploadedBatch.healedCells} cells auto-healed &bull; {lastUploadedBatch.latencyMs}ms
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {lastUploadedBatch.healedCells > 0 && (
              <button
                type="button"
                onClick={() => setShowHealingDrawer(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inspect {lastUploadedBatch.healedCells} Healed Cells</span>
              </button>
            )}
            <span className="px-2 py-1 rounded bg-black/40 text-sky-300 text-[10px]">
              SHA-256: {lastUploadedBatch.sha256Signature.slice(0, 10)}...
            </span>
          </div>
        </div>
      )}

      {/* ── MODAL 1: VISUAL COLUMN REMAPPING ── */}
      {showRemapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0D0D0E] border border-white/[0.14] p-6 md:p-8 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  Visual Column Header Remapper
                </h3>
                <p className="font-sans text-xs text-neutral-400 mt-0.5">
                  Connect raw supplier headers to Vistar Enterprise Schema targets. SHA-256 memory saves this for future 0ms auto-mapping.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRemapModal(false)}
                className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 font-mono text-xs">
              {rawHeaders.map((raw) => (
                <div
                  key={raw}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-white font-bold">{raw}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                  <select
                    value={columnMappings[raw] || "sku"}
                    onChange={(e) =>
                      setColumnMappings({ ...columnMappings, [raw]: e.target.value })
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-black border border-white/20 text-emerald-400 font-bold focus:outline-none focus:border-sky-400"
                  >
                    <option value="sku">sku (Stock Keeping Unit)</option>
                    <option value="product_name">product_name (Title)</option>
                    <option value="unit_price">unit_price (Numeric Float)</option>
                    <option value="quantity_in_stock">quantity_in_stock (Int)</option>
                    <option value="is_active">is_active (Boolean)</option>
                    <option value="media_url">media_url (Image/dHash)</option>
                    <option value="category">category (Taxonomy)</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-500">
                Matches stored in Stage 04 Mapping Memory
              </span>
              <button
                type="button"
                onClick={() => setShowRemapModal(false)}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Save &amp; Cache Header Memory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: MOBILE QR CAMERA BRIDGE ── */}
      {showQRBridge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D0D0E] border border-white/[0.14] p-6 md:p-8 space-y-6 shadow-2xl text-center">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-bold text-base text-white">Mobile Camera QR Bridge</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQRBridge(false)}
                className="p-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Code Graphic Representation */}
            <div className="mx-auto w-48 h-48 rounded-2xl bg-white p-3 shadow-xl flex flex-col items-center justify-center">
              <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-neutral-900 rounded-lg">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i % 2 === 0 && i % 3 === 0) || i < 7 || i % 6 === 0
                        ? "bg-white"
                        : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <span className="text-white font-bold block">Zero-Login Session Authenticated</span>
              <p className="text-neutral-400 text-[11px] font-sans">
                Scan with any smartphone camera to snap barcode/inventory photos directly into this intake queue.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowQRBridge(false);
                  startChunkedUpload("mobile_warehouse_camera_batch.zip");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Simulate Mobile Upload Intake
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DRAWER: REAL-TIME VALIDATION ERROR HEALING ── */}
      {showHealingDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm select-none animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl h-full bg-[#0D0D0E] border-l border-white/[0.12] p-6 md:p-8 flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 text-[10px] font-mono font-bold">
                    AUTONOMOUS CELL HEALING AUDIT
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mt-1">
                  Healed Cell Traceability Log
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHealingDrawer(false)}
                className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-2.5 font-mono text-xs scrollbar-thin scrollbar-thumb-white/10">
              {healedPreviewLogs.map((log, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">
                      Row {log.row} &bull; Column: {log.column}
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {(log.confidence * 100).toFixed(0)}% Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] p-2 rounded-lg bg-black/60">
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase">Raw Input</span>
                      <span className="text-rose-300 line-through">{String(log.originalValue)}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase">Normalized Healed</span>
                      <span className="text-emerald-400 font-bold">{String(log.healedValue)}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-400 flex items-center gap-1.5">
                    <span>Applied Rule:</span>
                    <span className="text-neutral-300 font-semibold">{log.ruleApplied}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500">Committed to PostgreSQL Audit Trail</span>
              <button
                type="button"
                onClick={() => setShowHealingDrawer(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold"
              >
                Close Trace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
