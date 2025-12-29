"use client"
import { Globe, BarChart3, ShoppingCart, Zap, Users, Layout, Database, TrendingUp, Truck, ShieldCheck } from "lucide-react"
import TestimonialCarousel from "@/components/ui/TestimonialCarousel"
import { FadeIn } from "@/components/motion/MotionWrappers"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import Image from "next/image"

const services = [
  {
    title: "Alibaba Automation",
    description: "Automate product posting, inquiries, and analytics. Save 80% of manual work hours and respond to leads instantly.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border-2 border-black flex items-center justify-center"><Globe className="w-16 h-16 text-black" /></div>,
    icon: <Globe className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Export CRM",
    description: "Custom CRM solutions tailored for exporters. Track every lead from inquiry to shipment without missing a beat.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-black border-2 border-black flex items-center justify-center"><Users className="w-16 h-16 text-[#ccff00]" /></div>,
    icon: <Users className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "High-Performance Websites",
    description: "Awwwards-tier websites designed for trust and conversion. Fast, secure, and optimized for international SEO.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ff0080] border-2 border-black flex items-center justify-center"><Layout className="w-16 h-16 text-white" /></div>,
    icon: <Layout className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Digital Marketing",
    description: "Targeted B2B campaigns on LinkedIn and Google. Reach international buyers with precision and lower CPA.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white border-2 border-black flex items-center justify-center"><BarChart3 className="w-16 h-16 text-black" /></div>,
    icon: <BarChart3 className="w-8 h-8 text-black" />,
    className: "md:col-span-1", // Modified for balance
  },
  {
    title: "E-commerce Solutions",
    description: "Direct-to-consumer or B2B e-commerce platforms. Seamless payment gateways and logistics integration.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border-2 border-black flex items-center justify-center"><ShoppingCart className="w-16 h-16 text-black" /></div>,
    icon: <ShoppingCart className="w-8 h-8 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Data Intelligence",
    description: "Scrape competitor data and market trends to stay ahead. Make decisions backed by terabytes of export data.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border-2 border-black flex items-center justify-center"><Database className="w-16 h-16 text-black" /></div>,
    icon: <Database className="w-8 h-8 text-black" />,
    className: "md:col-span-1"
  }
]

// Added 6th item for perfect 3x2 grid balance

const scrollContent = [
  {
    title: "Automated Lead Gen",
    description:
      "Stop chasing leads manually. Our systems scrape, qualify, and reach out to potential buyers 24/7. We integrate with major B2B platforms to ensure your pipeline is always full.",
    content: (
      <div className="h-full w-full bg-[#ccff00] flex items-center justify-center text-black border-2 border-black">
        <Globe className="w-20 h-20" />
      </div>
    ),
  },
  {
    title: "Real-time Analytics",
    description:
      "Know exactly what's working. Our custom dashboards provide real-time insights into your export performance, from inquiry rates to conversion metrics.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-white border-2 border-black">
        <TrendingUp className="w-20 h-20 text-black" />
      </div>
    ),
  },
  {
    title: "Smart Logistics",
    description:
      "Optimize your supply chain with AI-driven logistics planning. Predict delays, calculate costs instantly, and manage documentation automatically.",
    content: (
      <div className="h-full w-full bg-[#ff0080] flex items-center justify-center text-white border-2 border-black">
        <Truck className="w-20 h-20" />
      </div>
    ),
  },
  {
    title: "Global Compliance",
    description:
      "Navigate international trade regulations with ease. Our systems automatically check compliance requirements for different markets, reducing risk and delays.",
    content: (
      <div className="h-full w-full bg-black flex items-center justify-center text-white border-2 border-black">
        <ShieldCheck className="w-20 h-20" />
      </div>
    ),
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white relative pt-24 font-sans selection:bg-[#ff0080] selection:text-white">
      {/* Header */}
      <div className="px-6 py-20 text-center relative overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter uppercase mb-4 z-10 relative leading-[0.9]">
          SOLUTIONS <br /> <span className="text-[#ff0080] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">THAT SCALE</span>
        </h1>
        <p className="text-xl md:text-[22px] font-medium font-mono text-neutral-800 max-w-3xl mx-auto z-10 relative mt-8 leading-relaxed">
          We build digital ecosystems designed to <span className="text-black bg-[#ccff00] px-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 inline-block">DOMINATE</span> international markets.
        </p>
        {/* Decor */}
        {/* <div className="absolute top-[20%] left-[10%] w-[30vh] h-[30vh] rounded-full bg-[#ccff00] blur-[100px] opacity-20 pointer-events-none" /> */}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-32">

        {/* Services Grid - 3 Columns */}
        <BentoGrid className="max-w-7xl mx-auto mb-32 grid-cols-1 md:grid-cols-3 auto-rows-[auto]">
          {services.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className + " group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-white"}
            />
          ))}
        </BentoGrid>

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
              Proven <span className="text-[#ccff00] bg-black px-2 text-stroke-2">Results</span>
            </h2>
            <p className="text-neutral-600 text-lg font-mono font-bold">Don&apos;t just take our word for it.</p>
          </div>
          <TestimonialCarousel />
        </section>

        <FadeIn className="bg-black rounded-none p-8 md:p-20 text-center border-4 border-[#ccff00] relative overflow-hidden max-w-5xl mx-auto group shadow-[16px_16px_0px_0px_rgba(204,255,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(255,0,128,1)] transition-shadow duration-500">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              READY TO <span className="text-[#ff0080]">GROW?</span>
            </h2>
            <p className="text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto font-mono">
              Book a free strategy session with our export technology experts.
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
