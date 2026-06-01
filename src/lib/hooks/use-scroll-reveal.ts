"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface ScrollRevealOptions {
  /** Threshold for IntersectionObserver (0 to 1) */
  threshold?: number;
  /** Root margin for triggering earlier/later */
  rootMargin?: string;
  /** Only trigger once */
  once?: boolean;
}

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport — enabling manhwa-style scroll-driven panel reveals.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTimeout(() => setIsVisible(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
