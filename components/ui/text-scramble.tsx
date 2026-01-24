"use client";

import { useEffect, useRef, useState } from "react";

export const TextScramble = ({
  text,
  className = "",
  speed = 50,
}: {
  text: string;
  className?: string;
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const originalText = useRef(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    originalText.current = text;
    let frame = 0;
    const queue: { from: string; to: string; start: number; end: number }[] =
      [];

    for (let i = 0; i < text.length; i++) {
      const from = text[i];
      const to = text[i];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (Math.random() < 0.28) {
            output += chars[Math.floor(Math.random() * chars.length)];
          } else {
            output += from;
          }
        } else {
          output += "";
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        return;
      }

      frame++;
      setTimeout(update, speed);
    };

    update();
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};
