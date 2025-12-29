"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Work", link: "/work" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 border-2 border-black bg-[#ccff00] p-1 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-rotate-12">
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
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-lg font-bold text-black uppercase tracking-wide hover:underline decoration-4 underline-offset-4 decoration-[#ccff00] transition-all"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-6 py-3 bg-black text-white text-lg font-bold uppercase tracking-widest hover:bg-[#ccff00] hover:text-black border-2 border-transparent hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Book Call
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Link href="/contact" className="text-sm font-bold bg-black text-white px-4 py-2">MENU</Link>
        </div>
      </div>
    </nav>
  );
};
