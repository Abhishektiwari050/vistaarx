"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { LoaderOne } from "@/components/ui/loader"
import { Badge } from "@/components/ui/badge"
import { CardBody, CardContainer, CardItem } from "@/components/ui/three-d-card"
import { CometCard } from "@/components/ui/comet-card"
import { TracingBeam } from "@/components/ui/tracing-beam"
import {
  Palette,
  Code,
  Smartphone,
  BarChart3,
  Zap,
  Layers,
  Sparkles,
  MousePointer,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

const capabilities = [
  {
    id: "architecture",
    title: "NEURAL ARCHITECTURE",
    description: "Engineering massive-scale distributed backends that serve as the foundation for modern AI. We architect for high-availability, multi-region dominance, and absolute consistency.",
    icon: Layers,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
    demo: "Distributed neural network visualization",
    tags: ["Kubernetes", "gRPC", "Vector-Sync"],
  },
  {
    id: "ai-layer",
    title: "AI INTELLIGENCE LAYER",
    description: "Deploying high-fidelity LLM operations natively into production environments. From complex RAG pipelines to autonomous agents capable of independent reasoning and execution.",
    icon: Sparkles,
    color: "from-[#ccff00]/20 to-green-500/20",
    borderColor: "border-[#ccff00]/30",
    iconColor: "text-[#ccff00]",
    demo: "AI Reasoning dashboard",
    tags: ["LangChain", "LLMOps", "Vector DBs"],
  },
  {
    id: "sdlc",
    title: "AI-ENABLED SDLC",
    description: "Re-engineering the delivery pipeline. We build internal tools that leverage AI to automate code reviews, security scanning, and deployment at terminal velocity.",
    icon: Code,
    color: "from-[#ff0080]/20 to-purple-500/20",
    borderColor: "border-[#ff0080]/30",
    iconColor: "text-[#ff0080]",
    demo: "Autonomous SDLC Simulation",
    tags: ["Auto-Review", "IaC", "Edge-CI"],
  },
  {
    id: "analytics",
    title: "Predictive Analytics",
    description: "Transforming raw telemetry into strategic clarity. We build real-time dashboards that use ML to forecast scaling needs and detect anomalies before they crash.",
    icon: BarChart3,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500",
    demo: "Anomalies detection chart",
    tags: ["Data Engineering", "MLOps", "Grafana"],
  },
  {
    id: "performance",
    title: "Deterministic Performance",
    description: "Zero-bloat engineering. We optimize every layer of the stack—from DB queries to edge caching—to ensure sub-100ms response times globally.",
    icon: Zap,
    color: "from-red-500/20 to-[#ff0080]/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-500",
    demo: "Edge performance map",
    tags: ["Edge Computing", "DB Optimization", "Rust/Go"],
  },
  {
    id: "interface",
    title: "Technical Interfaces",
    description: "Engineering internal tools and command centers for high-stakes environments. We build dense, data-rich UIs that maintain absolute clarity.",
    icon: MousePointer,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-500",
    demo: "Command center GUI",
    tags: ["Next.js", "Zustand", "Type-Safe UI"],
  },
]

const showcaseItems = [
  {
    title: "Vector-Native Search Engine",
    description: "Proprietary RAG architecture for sub-second retrieval from millions of technical documents.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    tech: ["Pinecone", "OpenAI", "Next.js"],
  },
  {
    title: "Autonomous Repo-Guardian",
    description: "AI-driven SDLC agent that performs automated code reviews and security audits in real-time.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    tech: ["GitHub Apps", "Python", "Llama 3"],
  },
];

export function CapabilitiesLab() {
  const [activeShowcase, setActiveShowcase] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-24 bg-black relative w-full overflow-hidden border-t-4 border-[#ff0080]">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#ccff00] mr-2" />
              <span className="text-[#ccff00] font-medium text-sm font-mono tracking-widest uppercase">The Engine Room</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-white mb-6 text-balance uppercase tracking-tighter">
              Engineering <br />
              <span className="text-transparent stroke-text text-stroke-2">The Intelligence</span> <br />
              Layer
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-[#ccff00] pl-6 text-left">
              We don't follow industry trends; we engineer the standard. Vistar is where complex legacy overhead is replaced by streamlined, AI-Native intelligence layers.
            </p>
          </div>

          <div className="flex flex-col gap-10 md:gap-24">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={capability.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className={`order-2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <ThreeDCard capability={capability} IconComponent={IconComponent} />
                  </div>
                  <div className={`order-1 ${isEven ? 'md:order-2' : 'md:order-1'} space-y-4`}>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4 border ${capability.borderColor}`}>
                      <IconComponent className={`w-6 h-6 ${capability.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{capability.title}</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed font-mono">
                      {capability.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capability.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-[#ccff00]/20 text-[#ccff00] font-mono">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Showcase Gallery Section */}
          <div className="mt-32">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-heading font-black text-white mb-4 uppercase tracking-widest">High-Frequency Deployments</h3>
              <p className="text-neutral-400 max-w-2xl mx-auto border-b border-white/10 pb-6 font-mono">
                Real systems engineered for high-stakes environments. No fluff.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8place-items-center">
              {showcaseItems.map((item, index) => (
                <CometCard key={index} className="w-full">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#0F0F1E] p-2 md:p-4 saturate-0 transition-all duration-300 hover:saturate-100 h-[350px] md:h-[400px] [transform-style:preserve-3d] transform-none opacity-100"
                    onClick={() => setActiveShowcase(index)}
                  >
                    <div className="flex-1 p-2">
                      <div className="relative aspect-[3/4] w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center bg-[#000000]">
                          <LoaderOne />
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full rounded-[12px] bg-[#000000] object-cover contrast-75 hover:contrast-100 transition-all duration-300 shadow-[0px_5px_6px_0px_rgba(0,0,0,0.05)] opacity-100"
                          alt={item.title}
                          src={item.image || "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=800&auto=format&fit=crop"}
                          onLoad={(e) => {
                            const loader = e.currentTarget.previousElementSibling as HTMLElement;
                            if (loader) loader.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center justify-between p-3 font-mono text-white border-t border-white/10">
                      <div className="text-xs font-medium truncate pr-2">{item.title}</div>
                      <div className="text-xs text-neutral-500 flex-shrink-0">#{String(index + 1).padStart(2, '0')}</div>
                    </div>
                  </button>
                </CometCard>
              ))}
            </div>

            <div className="mt-20 text-center">
              <div className="bg-gradient-to-br from-accent/5 to-secondary/5 border border-accent/20 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-4">
                  <MousePointer className="w-8 h-8 text-accent mr-3" />
                  <h3 className="text-2xl font-heading font-black text-white">Ready to Push Boundaries?</h3>
                </div>
                <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
                  Let&apos;s collaborate on something extraordinary. Whether it&apos;s a complex technical challenge or a creative
                  vision, we&apos;re here to make it happen.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 group"
                  >
                    Discuss Your Vision
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent/30 text-accent hover:bg-accent/10 font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore More Work
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TracingBeam>
    </section >
  )
}

function ThreeDCard({ capability, IconComponent }: { capability: any, IconComponent: any }) {
  return (
    <CardContainer className="inter-var py-0 w-full">
      <CardBody className={`bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white/10 w-full h-[300px] rounded-xl p-6 border flex flex-col justify-between`}>
        <div>
          <CardItem
            translateZ="50"
            className="text-lg font-bold text-white mb-3"
          >
            {capability.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-400 text-sm mb-6 line-clamp-3"
          >
            {capability.description}
          </CardItem>
        </div>

        <CardItem translateZ="100" className="w-full mt-2">
          <div className={`p-4 rounded-lg bg-gradient-to-br ${capability.color} ${capability.borderColor} border w-fit mx-auto`}>
            <IconComponent className={`w-8 h-8 ${capability.iconColor}`} />
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

