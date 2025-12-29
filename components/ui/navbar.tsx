"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Work", link: "/work" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black h-16 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <div className="relative w-10 h-10 border-2 border-black bg-[#ccff00] p-1 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-rotate-12">
              <Image
                src="/vistaar-logo.svg"
                alt="Vistaar"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-black font-black text-2xl tracking-tighter uppercase italic group-hover:text-stroke-2 group-hover:text-transparent transition-all">
              Vistaar
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`text-lg font-bold text-black uppercase tracking-wide transition-all ${isActive
                    ? "underline decoration-4 underline-offset-4 decoration-[#ccff00]"
                    : "hover:underline hover:decoration-4 hover:underline-offset-4 hover:decoration-[#ccff00]"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="px-6 py-2 bg-black text-white text-lg font-bold uppercase tracking-widest hover:bg-[#ccff00] hover:text-black border-2 border-transparent hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
            >
              Book Call
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 space-y-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-8 h-1 bg-black border border-black"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-8 h-1 bg-black border border-black"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-8 h-1 bg-black border border-black"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#ccff00] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black text-black uppercase tracking-tighter hover:text-white hover:text-stroke-2 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-10 py-5 bg-black text-white text-2xl font-bold uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
              >
                Book Strategy
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
