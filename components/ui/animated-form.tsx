"use client";

import { motion } from "framer-motion";
import { useState, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Check, X, AlertCircle } from "lucide-react";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export function AnimatedInput({
  label,
  error,
  success,
  className = "",
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <motion.label
          animate={{
            y: isFocused || props.value ? -20 : 0,
            scale: isFocused || props.value ? 0.85 : 1,
            color: error ? "#ff0080" : success ? "#ccff00" : "#9ca3af",
          }}
          className="absolute left-3 top-3 pointer-events-none origin-left text-sm font-medium"
        >
          {label}
        </motion.label>
      )}
      <motion.div
        animate={{
          borderColor: error ? "#ff0080" : success ? "#ccff00" : isFocused ? "#ccff00" : "rgba(255,255,255,0.1)",
        }}
        className="relative"
      >
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`w-full rounded-lg border bg-black/40 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:outline-none ${label ? "pt-6 pb-2" : ""} ${className}`}
        />
        {(error || success) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {error && <X className="h-5 w-5 text-[#ff0080]" />}
            {success && <Check className="h-5 w-5 text-[#ccff00]" />}
          </motion.div>
        )}
      </motion.div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 flex items-center gap-1 text-xs text-[#ff0080]"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </motion.div>
      )}
    </div>
  );
}

interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export function AnimatedTextarea({
  label,
  error,
  success,
  className = "",
  ...props
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <motion.label
          animate={{
            y: isFocused || props.value ? -20 : 0,
            scale: isFocused || props.value ? 0.85 : 1,
            color: error ? "#ff0080" : success ? "#ccff00" : "#9ca3af",
          }}
          className="absolute left-3 top-3 pointer-events-none origin-left text-sm font-medium"
        >
          {label}
        </motion.label>
      )}
      <motion.div
        animate={{
          borderColor: error ? "#ff0080" : success ? "#ccff00" : isFocused ? "#ccff00" : "rgba(255,255,255,0.1)",
        }}
      >
        <textarea
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`w-full rounded-lg border bg-black/40 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:outline-none ${label ? "pt-6 pb-2" : ""} ${className}`}
        />
      </motion.div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 flex items-center gap-1 text-xs text-[#ff0080]"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </motion.div>
      )}
    </div>
  );
}

export function AnimatedCheckbox({
  label,
  checked,
  onChange,
  className = "",
}: {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <motion.div
          animate={{
            backgroundColor: checked ? "#ccff00" : "transparent",
            borderColor: checked ? "#ccff00" : "rgba(255,255,255,0.1)",
          }}
          className="h-5 w-5 rounded border-2"
        >
          {checked && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Check className="h-4 w-4 text-black" />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && <span className="text-sm text-white">{label}</span>}
    </label>
  );
}
