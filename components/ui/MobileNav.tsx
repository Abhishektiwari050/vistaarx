"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/contact", label: "Contact" },
]

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-white hover:text-accent transition-colors"
                aria-label="Open Menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                <div className="p-1 bg-[#ccff00] rounded-md border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <Image src="/vistar-logo.svg" alt="Vistar" width={32} height={32} className="w-8 h-8" />
                                </div>
                                <span className="text-xl font-heading font-bold text-white uppercase tracking-tighter">Vistar</span>
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white hover:text-accent transition-colors"
                                aria-label="Close Menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
                            <nav className="flex flex-col space-y-6">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-4xl font-heading font-bold text-white hover:text-accent transition-colors block"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-black bg-accent rounded-full hover:bg-accent-hover transition-colors"
                                >
                                    Let&apos;s Build
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>

                        <div className="p-8 border-t border-white/10">
                            <p className="text-gray-500 text-sm">© 2025 Vistar Studio</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
