"use client";

import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  external = false,
  children,
  className = "",
  onClick,
  onMouseEnter,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-serif font-semibold text-[14px] tracking-[-0.01em] py-2.5 px-5 rounded-[6px] transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-[1px]";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#0284C7] to-[#0096C7] text-white border border-[#0369A1] hover:from-[#0369A1] hover:to-[#0284C7] shadow-[0_1px_3px_rgba(2,132,199,0.12),0_4px_14px_rgba(2,132,199,0.25)] hover:shadow-[0_2px_6px_rgba(2,132,199,0.18),0_6px_22px_rgba(2,132,199,0.35)] hover:-translate-y-0.5",
    secondary:
      "bg-white text-[#0B1320] border border-[rgba(14,165,233,0.24)] hover:border-[#0284C7] hover:bg-[#F0F7FC] hover:text-[#0284C7] hover:-translate-y-0.5 shadow-xs",
  }[variant];

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onMouseEnter) {
      // @ts-expect-error type compatibility
      onMouseEnter(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      // @ts-expect-error type compatibility
      onClick(e);
    }
  };

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClasses}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
