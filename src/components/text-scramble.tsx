"use client";

import React, { useEffect, useState, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number; // delay in seconds
}

export function TextScramble({ text, className = "", delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const glyphs = "X01_[]<>\\*/!@#$%^&*()_+{}|:;?";

  const triggerScramble = useCallback(() => {
    let iteration = 0;
    let timer: NodeJS.Timeout;

    const run = () => {
      timer = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(timer);
        }
        iteration += 0.35; // speed parameter
      }, 30);
    };

    if (delay > 0) {
      const delayTimeout = setTimeout(run, delay * 1000);
      return () => {
        clearTimeout(delayTimeout);
        clearInterval(timer);
      };
    } else {
      run();
      return () => clearInterval(timer);
    }
  }, [text, delay]);

  useEffect(() => {
    return triggerScramble();
  }, [triggerScramble]);

  return <span className={className}>{displayText}</span>;
}

export default TextScramble;
