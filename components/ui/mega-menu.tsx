"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface MegaMenuItem {
  label: string;
  href?: string;
  description?: string;
  icon?: ReactNode;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuDropdown {
  label: string;
  sections: MegaMenuSection[];
}

interface MegaMenuProps {
  items: (MegaMenuItem | MegaMenuDropdown)[];
  className?: string;
}

export function MegaMenu({ items, className = "" }: MegaMenuProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <nav className={`relative ${className}`}>
      <ul className="flex gap-6">
        {items.map((item, index) => {
          const isDropdown = "sections" in item;
          return (
            <li
              key={index}
              onMouseEnter={() => isDropdown && setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative"
            >
              {isDropdown ? (
                <>
                  <button className="flex items-center gap-1 text-white transition-colors hover:text-[#ccff00]">
                    {item.label}
                    <motion.div
                      animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full z-50 mt-2 w-[600px] rounded-lg border border-white/10 bg-black/95 p-6 shadow-2xl backdrop-blur-md"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {item.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h3 className="mb-3 text-sm font-bold text-[#ccff00]">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.href || "#"}
                                      className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-white/5"
                                    >
                                      {subItem.icon && (
                                        <div className="text-gray-400 transition-colors group-hover:text-[#ccff00]">
                                          {subItem.icon}
                                        </div>
                                      )}
                                      <div>
                                        <div className="text-sm font-medium text-white transition-colors group-hover:text-[#ccff00]">
                                          {subItem.label}
                                        </div>
                                        {subItem.description && (
                                          <div className="text-xs text-gray-400">
                                            {subItem.description}
                                          </div>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="text-white transition-colors hover:text-[#ccff00]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
