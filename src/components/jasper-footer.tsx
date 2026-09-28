"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function JasperFooter() {
  return (
    <footer className="w-full bg-[#0D0E12] text-white pt-20 pb-12 px-6 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
          
          {/* Column 1: Platform */}
          <div className="space-y-6">
            <Link
              href="/platform"
              className="inline-flex items-center gap-1 font-serif text-lg font-medium text-white hover:text-[#FF3823] transition-colors"
            >
              Platform <span className="font-sans text-xs">→</span>
            </Link>

            <div className="space-y-5 text-neutral-400">
              <div className="space-y-2">
                <Link href="/platform" className="block text-white font-medium hover:text-[#FF3823] transition-colors">
                  GEO &amp; AI Optimization →
                </Link>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Agents →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/platform" className="hover:text-white transition-colors">Optimization</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Research</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Translation</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Content Pipelines →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/platform" className="hover:text-white transition-colors">AI Studio</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Vistar Grid</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Canvas</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Marketing AI Editor</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Vistar Chat</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Image Pipelines</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Vistar APIs</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Vistar MCP</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Vistar IQ →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/platform" className="hover:text-white transition-colors">Marketing IQ</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Product IQ</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Knowledge Base</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Brand Voice</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Visual Guidelines</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Style Guide</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-6">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1 font-serif text-lg font-medium text-white hover:text-[#FF3823] transition-colors"
            >
              Solutions <span className="font-sans text-xs">→</span>
            </Link>

            <div className="space-y-5 text-neutral-400">
              <div className="space-y-2">
                <span className="block text-white font-medium">Solutions by Use Case →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/solutions" className="hover:text-white transition-colors">GEO</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">SEO &amp; AEO</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Personalization</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Campaigns</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Solutions by Role →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Product Marketing</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Content Marketing</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Performance Marketing</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Field &amp; Events Marketing</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Brand Marketing</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">PR &amp; Communications</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Solutions by Industry →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Financial Services</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Healthcare &amp; Life Sciences</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Technology</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Retail &amp; Consumer Goods</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Media &amp; Entertainment</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Professional Services</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-6">
            <Link
              href="/philosophy"
              className="inline-flex items-center gap-1 font-serif text-lg font-medium text-white hover:text-[#FF3823] transition-colors"
            >
              Resources <span className="font-sans text-xs">→</span>
            </Link>

            <div className="space-y-5 text-neutral-400">
              <div className="space-y-2">
                <span className="block text-white font-medium">Diagnostics &amp; Tools</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/start" className="hover:text-white transition-colors">GEO Diagnostic</Link></li>
                  <li><Link href="/start" className="hover:text-white transition-colors">Brand Compliance</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Vistar ROI Calculator</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Discover</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">Customer Stories</Link></li>
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">Events &amp; Webinars</Link></li>
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">Prompt Library</Link></li>
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">The State of AI in Marketing 2026</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Learn</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">Courses</Link></li>
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">The Vistar Community</Link></li>
                  <li><Link href="/platform" className="hover:text-white transition-colors">Explore Vistar Workflows</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Get Support</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">FAQs &amp; Help Center</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">Customer Success</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Hire a Professional Partner</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4: Company & Actions */}
          <div className="space-y-6">
            <Link
              href="/company"
              className="inline-flex items-center gap-1 font-serif text-lg font-medium text-white hover:text-[#FF3823] transition-colors"
            >
              Company <span className="font-sans text-xs">→</span>
            </Link>

            <div className="space-y-5 text-neutral-400">
              <div className="space-y-2">
                <span className="block text-white font-medium">Information</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/company" className="hover:text-white transition-colors">About Vistar</Link></li>
                  <li><Link href="/company" className="hover:text-white transition-colors">Newsroom</Link></li>
                  <li><Link href="/company" className="hover:text-white transition-colors">Careers at Vistar</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Legal Information</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">Company Logos</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Trust Foundation →</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">LLM-Optimized Architecture</Link></li>
                  <li><Link href="/philosophy" className="hover:text-white transition-colors">Security</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Governance</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Compliance</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Ethics at Vistar</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-white font-medium">Become a Partner</span>
                <ul className="space-y-1.5 pl-2 text-xs">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Become a Solutions Partner</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Become a Tech Partner</Link></li>
                </ul>
              </div>

              <div className="space-y-1.5 pt-2">
                <Link href="/pricing" className="block text-white font-medium hover:text-[#FF3823] transition-colors">
                  Pricing →
                </Link>
                <Link href="/contact" className="block text-white font-medium hover:text-[#FF3823] transition-colors">
                  Enterprise →
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <Link
                  href="/contact"
                  className="block w-full py-2.5 px-4 bg-[#FF3823] hover:bg-[#E0301C] text-white text-center font-semibold text-xs rounded-[4px] shadow-sm transition-colors"
                >
                  Get A Demo
                </Link>
                <Link
                  href="/start"
                  className="block w-full py-2.5 px-4 bg-[#23242A] hover:bg-[#30323A] text-white text-center font-semibold text-xs rounded-[4px] border border-white/10 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Logo, Copyright, and Socials */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-[#FF3823] hover:text-[#FF553E] transition-colors">
              Vistar
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span>© 2026 VISTAR AI, INC.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Legal Center</Link>
          </div>

          <div className="flex items-center gap-5 text-neutral-400">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default JasperFooter;
