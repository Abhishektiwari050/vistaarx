"use client"
import { Globe, BarChart3, ShoppingCart, Zap, Users, Layout, Database, TrendingUp, Truck, ShieldCheck, Bot, Code, Cpu, Terminal, Rocket, Layers } from "lucide-react"
import TestimonialCarousel from "@/components/ui/TestimonialCarousel"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/MotionWrappers"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import Image from "next/image"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"

const services = [
  {
    title: "AI Agent Workflows",
    description: "Autonomous agents that handle complex business logic, lead qualification, and multi-step operations 24/7.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border-2 border-black flex items-center justify-center"><Bot className="w-16 h-16 text-black" /></div>,
    icon: <Bot className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Custom SDLC & Software",
    description: "End-to-end software development lifecycle management. From architecture design to production-scale engineering.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-black border-2 border-black flex items-center justify-center"><Code className="w-16 h-16 text-[#ccff00]" /></div>,
    icon: <Code className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "High-Performance Platforms",
    description: "Enterprise-grade web systems optimized for 60fps performance and global scale. Beyond simple websites.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ff0080] border-2 border-black flex items-center justify-center"><Cpu className="w-16 h-16 text-white" /></div>,
    icon: <Cpu className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Intelligence & Analytics",
    description: "Bespoke data engineering and real-time visualization dashboards. Turn raw data into decisive strategic advantages.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white border-2 border-black flex items-center justify-center"><BarChart3 className="w-16 h-16 text-black" /></div>,
    icon: <BarChart3 className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Infrastructure & DevOps",
    description: "Robust cloud architecture and automated CI/CD pipelines. Ensuring zero-downtime and rapid iteration cycles.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border-2 border-black flex items-center justify-center"><Layers className="w-16 h-16 text-black" /></div>,
    icon: <Layers className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Product Strategy",
    description: "Deep technical auditing and product roadmap consulting for high-growth tech startups and enterprises.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border-2 border-black flex items-center justify-center"><Rocket className="w-16 h-16 text-black" /></div>,
    icon: <Rocket className="w-8 h-8 text-black" />,
    className: "md:col-span-1"
  }
]

// Added 6th item for perfect 3x2 grid balance

const scrollContent = [
  {
    title: "AI Agent Orchestration",
    description:
      "We build and deploy autonomous agents that can browse the web, handle customer support, and execute complex workflows across your entire software stack without human intervention.",
    content: (
      <div className="h-full w-full bg-[#ccff00] flex items-center justify-center text-black border-2 border-black">
        <Bot className="w-20 h-20" />
      </div>
    ),
  },
  {
    title: "Full-Stack SDLC",
    description:
      "From planning and architecture to testing and deployment. We handle the entire SDLC with a focus on code quality, security, and scalability for modern software ventures.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-white border-2 border-black">
        <Code className="w-20 h-20 text-black" />
      </div>
    ),
  },
  {
    title: "High-Load Infrastructure",
    description:
      "Scaling to millions of users? We design cloud-native infrastructures on AWS/GCP that auto-scale based on load, ensuring your software is always performant and cost-effective.",
    content: (
      <div className="h-full w-full bg-[#ff0080] flex items-center justify-center text-white border-2 border-black">
        <Layers className="w-20 h-20" />
      </div>
    ),
  },
  {
    title: "Tech Audit & Recovery",
    description:
      "Inherited a legacy codebase? We perform deep technical audits to identify bottlenecks, security vulnerabilities, and technical debt, then execute a precision roadmap to recovery.",
    content: (
      <div className="h-full w-full bg-black flex items-center justify-center text-white border-2 border-black">
        <Terminal className="w-20 h-20" />
      </div>
    ),
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white relative font-sans selection:bg-[#ff0080] selection:text-white">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
        bgImageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
        title="Solutions That Scale"
        date="Engineering Excellence"
        scrollToExpand="Scroll to Explore"
        textBlend
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-40 pb-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-3 py-1 bg-[#ccff00] text-black text-xs font-black uppercase tracking-widest mb-6 inline-block">Studio Protocol</span>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-8 uppercase tracking-tighter leading-[0.9]">
              PREMIUM <br/>
              <span className="text-transparent stroke-text text-stroke-2">ARCHITECTURES.</span>
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed">
              We don&apos;t just build websites. We engineer autonomous AI workflows and high-performance software systems that dominate their markets.
            </p>
          </motion.div>
        </div>
      </ScrollExpandMedia>

      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-32">

        <section className="mb-32">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-12 text-center uppercase tracking-tight">
            Deep Dive <span className="text-transparent stroke-text text-stroke-2">Tech</span>
          </h2>
          <div className="type-body font-medium">
            <StickyScroll content={scrollContent} contentClassName="p-10" />
          </div>
        </section>

        <section className="mb-32 relative">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tight">
              Proven <span className="text-white bg-black px-2">Results</span>
            </h2>
            <p className="text-neutral-600 text-lg font-mono font-bold italic">Don&apos;t just take our word for it.</p>
          </div>
          <TestimonialCarousel />
        </section>

        <FadeIn className="bg-black rounded-none p-8 md:p-20 text-center border-4 border-[#ccff00] relative overflow-hidden max-w-5xl mx-auto group shadow-[16px_16px_0px_0px_rgba(204,255,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(255,0,128,1)] transition-shadow duration-500">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              READY TO <span className="text-[#ff0080]">GROW?</span>
            </h2>
            <p className="text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto font-mono">
              Book a free strategy session with our AI-first software engineering studio.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-black transition-all duration-300 bg-[#ccff00] hover:bg-white rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-2 uppercase tracking-widest"
            >
              Get Started Now
            </a>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
