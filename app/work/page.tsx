"use client"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { FocusCards } from "@/components/ui/focus-cards"
import Image from "next/image"
import { FadeIn } from "@/components/motion/MotionWrappers"

const products = [
  {
    title: "Global Exports Ltd",
    slug: "global-exports-ltd",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "TechTrade India",
    slug: "techtrade-india",
    src: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop",
  },
  {
    title: "Patel Spices",
    slug: "patel-spices",
    src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "EuroFoods Logistics",
    slug: "eurofoods-logistics",
    src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Asian Textiles",
    slug: "asian-textiles",
    src: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Future Tech",
    slug: "future-tech",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Smart Logistics",
    slug: "smart-logistics",
    src: "https://images.unsplash.com/photo-1494412574643-35d324698420?q=80&w=2064&auto=format&fit=crop",
  },
  {
    title: "Eco Packaging",
    slug: "eco-packaging",
    src: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Urban Fashion",
    slug: "urban-fashion",
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "NextGen Auto",
    slug: "nextgen-auto",
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2047&auto=format&fit=crop",
  },
  {
    title: "Green Energy",
    slug: "green-energy",
    src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Cloud Systems",
    slug: "cloud-systems",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Agri Exports",
    slug: "agri-exports",
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "MediCare Global",
    slug: "medicare-global",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "EduTech Pro",
    slug: "edutech-pro",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-24">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl md:text-[6rem] font-black text-black uppercase tracking-tighter mb-8 leading-none">
                Unleash <br />
                <span className="text-[#ccff00] stroke-text-black text-stroke-2">World-Class</span> <br />
                <span className="md:text-[8rem] text-transparent stroke-text text-stroke-2 hover:text-[#ff0080] transition-colors">Products</span>
              </h1>
            </>
          }
        >
          <Image
            src={`https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-none border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] object-cover h-full object-left-top draggable-false"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-32">
        <h2 className="text-4xl md:text-8xl font-black text-black mb-12 text-center uppercase tracking-tighter">
          Selected <span className="italic font-serif text-[#ff0080]">Works</span>
        </h2>
        <FocusCards cards={products} />
      </div>

      <FadeIn className="bg-black py-20 border-t-4 border-[#ccff00] text-center relative overflow-hidden group">
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            SEEN ENOUGH? <br />
            <span className="italic text-[#ccff00] font-serif">LET'S BUILD.</span>
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black transition-all duration-300 bg-[#ccff00] hover:bg-white rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-1 uppercase tracking-widest"
          >
            Start Project
          </a>
        </div>
        {/* Decor */}
        <div className="absolute top-[-50%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-[#ff0080] blur-[150px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
      </FadeIn>
    </main>
  )
}