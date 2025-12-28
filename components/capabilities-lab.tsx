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
    id: "branding",
    title: "Brand Identity Design",
    description: "Complete visual identity systems that capture your brand essence. We don't just design logos; we craft the soul of your business.",
    icon: Palette,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-500",
    demo: "Interactive logo animation",
    tags: ["Logo Design", "Color Systems", "Typography"],
  },
  {
    id: "development",
    title: "Advanced Web Development",
    description: "Cutting-edge websites with smooth animations and interactions. Built on the latest tech stack including Next.js and React Server Components.",
    icon: Code,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
    demo: "3D CSS animations",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "mobile",
    title: "Mobile-First Design",
    description: "Responsive experiences that work flawlessly across all devices. We ensure your site looks stunning on everything from a watch to an 8K display.",
    icon: Smartphone,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500",
    demo: "Device mockup showcase",
    tags: ["Responsive", "PWA", "Mobile UX"],
  },
  {
    id: "analytics",
    title: "Data Visualization",
    description: "Transform complex data into beautiful, actionable insights. We turn boring spreadsheets into interactive, engaging dashboards.",
    icon: BarChart3,
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-500",
    demo: "Interactive charts",
    tags: ["D3.js", "Charts", "Dashboards"],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Lightning-fast loading times and seamless user experiences. We obsess over every millisecond to ensure optimal conversion rates.",
    icon: Zap,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500",
    demo: "Speed test results",
    tags: ["Core Web Vitals", "SEO", "Optimization"],
  },
  {
    id: "ui-systems",
    title: "Design Systems",
    description: "Scalable component libraries for consistent user experiences. Future-proof your product with a robust, documented design language.",
    icon: Layers,
    color: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-500",
    demo: "Component showcase",
    tags: ["Figma", "Storybook", "Components"],
  },
]

const showcaseItems = [
  {
    title: "Interactive 3D Product Showcase",
    description: "Immersive product experiences with WebGL",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    tech: ["Three.js", "WebGL", "GSAP"],
  },
  {
    title: "AI-Powered Content Generator",
    description: "Smart content creation with machine learning",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    tech: ["OpenAI", "React", "Python"],
  },
];

export function CapabilitiesLab() {
  const [activeShowcase, setActiveShowcase] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-24 bg-black relative w-full overflow-hidden">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-accent font-medium text-sm">Capabilities Lab</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-white mb-6 text-balance">
              Where Ideas Become
              <br />
              <span className="text-accent">Digital Reality</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed text-pretty">
              Our creative playground where we push the boundaries of what&apos;s possible. Every project is an opportunity to
              innovate and exceed expectations.
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
                    <h3 className="text-2xl font-bold text-white">{capability.title}</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                      {capability.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capability.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/10 text-neutral-300">
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
              <h3 className="text-3xl font-heading font-black text-white mb-4">Featured Innovations</h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                A glimpse into our most ambitious projects that showcase the cutting edge of digital creativity and
                technical excellence.
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

