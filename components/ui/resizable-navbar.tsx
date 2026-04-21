"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <nav className={cn("fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 transition-all duration-500", className)}>
      {children}
    </nav>
  );
};

export const NavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-between gap-8 hidden md:flex", className)}>
      {children}
    </div>
  );
};

export const NavItems = ({ items, className }: { items: { name: string; link: string }[]; className?: string }) => {
  const scrollToSection = (link: string) => {
    const sectionId = link.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={cn("flex items-center space-x-6", className)}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => scrollToSection(item.link)}
          className="text-white hover:text-white/80 transition-all duration-300 font-medium text-sm"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export const NavbarLogo = ({ className }: { className?: string }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("cursor-pointer group", className)} onClick={scrollToTop}>
      <h1 className="text-xl font-heading font-black text-white transition-all duration-300 group-hover:text-white/80">
        Vistar
      </h1>
    </div>
  );
};

export const NavbarButton = ({ 
  children, 
  variant = "primary", 
  className, 
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: "primary" | "secondary"; 
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm",
        variant === "primary" 
          ? "bg-white text-black hover:bg-white/90" 
          : "bg-white/10 border border-white/20 text-white hover:bg-white/20",
        className
      )}
    >
      {children}
    </Button>
  );
};

export const MobileNav = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("md:hidden", className)}>
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3", className)}>
      {children}
    </div>
  );
};

export const MobileNavToggle = ({ 
  isOpen, 
  onClick, 
  className 
}: { 
  isOpen: boolean; 
  onClick: () => void; 
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className={cn("text-white hover:text-white/80 transition-all duration-300", className)}
    >
      <div className="relative w-5 h-5">
        <Menu
          className={`absolute inset-0 transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
          size={20}
        />
        <X
          className={`absolute inset-0 transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
          size={20}
        />
      </div>
    </button>
  );
};

export const MobileNavMenu = ({ 
  children, 
  isOpen, 
  onClose, 
  className 
}: { 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClose: () => void;
  className?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("overflow-hidden bg-white/10 backdrop-blur-xl border-t border-white/20 rounded-b-2xl mt-2", className)}
        >
          <div className="px-4 pt-2 pb-3 space-y-3">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};