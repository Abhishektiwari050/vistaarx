"use client"
import { Globe, BarChart3, ShoppingCart, Zap, Users, Layout } from "lucide-react"
import TestimonialCarousel from "@/components/ui/TestimonialCarousel"
import { FadeIn } from "@/components/motion/MotionWrappers"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import Image from "next/image"

const services = [
  {
    title: "Alibaba Automation",
    description: "Automate product posting, inquiries, and analytics. Save 80% of manual work hours and respond to leads instantly.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border-2 border-black"></div>,
    icon: <Globe className="w-6 h-6 text-black" />,
    className: "md:col-span-2",
  },
  {
    title: "Export CRM Implementation",
    description: "Custom CRM solutions tailored for exporters. Track every lead from inquiry to shipment.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-black border-2 border-black"></div>,
    icon: <Users className="w-6 h-6 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "High-Performance Websites",
    description: "Awwwards-tier websites designed for trust and conversion. Fast, secure, and optimized for international SEO.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ff0080] border-2 border-black"></div>,
    icon: <Layout className="w-6 h-6 text-black" />,
    className: "md:col-span-1",
  },
  {
    title: "Digital Marketing",
    description: "Targeted B2B campaigns on LinkedIn and Google. Reach international buyers with precision.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white border-2 border-black"></div>,
    icon: <BarChart3 className="w-6 h-6 text-black" />,
    className: "md:col-span-2",
  },
  {
    title: "E-commerce Solutions",
    description: "Direct-to-consumer or B2B e-commerce platforms. Seamless payment gateways and logistics integration.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border-2 border-black"></div>,
    icon: <ShoppingCart className="w-6 h-6 text-black" />,
    className: "md:col-span-1",
  }
]

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
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Smart Logistics",
    description:
      "Optimize your supply chain with AI-driven logistics planning. Predict delays, calculate costs instantly, and manage documentation automatically.",
    content: (
      <div className="h-full w-full bg-[#ff0080] flex items-center justify-center text-white border-2 border-black">
        <Zap className="w-20 h-20" />
      </div>
    ),
  },
  {
    title: "Global Compliance",
    description:
      "Navigate international trade regulations with ease. Our systems automatically check compliance requirements for different markets, reducing risk and delays.",
    content: (
      <div className="h-full w-full bg-black flex items-center justify-center text-white border-2 border-black">
        <Users className="w-20 h-20" />
      </div>
    ),
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white relative pt-24">
      {/* Header */}
      <div className="px-6 py-20 text-center relative overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter uppercase mb-4 z-10 relative">
          Solutions <br /> That <span className="text-[#ff0080] italic font-serif">Scale</span>
        </h1>
        <p className="text-xl md:text-2xl font-mono text-neutral-600 max-w-2xl mx-auto z-10 relative">
          We build digital ecosystems designed to <span className="text-[#ccff00] bg-black px-2 font-bold">DOMINATE</span> international markets.
        </p>
        {/* Decor */}
        <div className="absolute top-[20%] left-[10%] w-[30vh] h-[30vh] rounded-full bg-[#ccff00] blur-[100px] opacity-20 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-32">
        <BentoGrid className="max-w-4xl mx-auto mb-32">
          {services.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className + " shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black"}
            />
          ))}
        </BentoGrid>

        <section className="mb-32">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-12 text-center uppercase">
            Deep Dive <span className="text-transparent stroke-text text-stroke-2">Tech</span>
          </h2>
          <StickyScroll content={scrollContent} />
        </section>

        <section className="mb-32 relative">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase">
              Proven <span className="text-[#ccff00] bg-black px-2">Results</span>
            </h2>
            <p className="text-neutral-600 text-lg font-mono">Don&apos;t just take our word for it.</p>
          </div>
          <TestimonialCarousel />
        </section>

        <FadeIn className="bg-black rounded-[2rem] p-8 md:p-20 text-center border-4 border-[#ccff00] relative overflow-hidden max-w-5xl mx-auto group shadow-[12px_12px_0px_0px_rgba(204,255,0,1)]">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              READY TO <span className="italic text-[#ff0080] font-serif">GROW?</span>
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-mono">
              Book a free strategy session with our export technology experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black transition-all duration-300 bg-[#ccff00] hover:bg-white rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-1"
            >
              Get Started Now
            </a>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
