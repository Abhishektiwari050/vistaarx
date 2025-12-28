"use client"
import Image from "next/image";
import { useState } from "react"
import { motion } from "framer-motion"
import TrustSignals from "@/components/contact/TrustSignals"
import { FadeIn, SlideUp } from "@/components/motion/MotionWrappers"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Spotlight } from "@/components/ui/Spotlight"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    goal: "automation"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-20 relative overflow-hidden">
      <BackgroundBeams className="z-0 opacity-40" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-10">

          {/* Left Column: Context & Trust */}
          <FadeIn>
            <TypewriterEffect
              words={[
                { text: "Let's", className: "text-white dark:text-white" },
                { text: "Scale", className: "text-cyan-500 dark:text-cyan-500" },
                { text: "Your", className: "text-white dark:text-white" },
                { text: "Business", className: "text-white dark:text-white" },
              ]}
              className="mb-6 text-left"
              cursorClassName="bg-cyan-500"
            />
            <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-lg">
              Ready to automate your sales and dominate the international market?
              Fill out the form, and our team will get back to you within 2 hours.
            </p>

            <div className="mb-12">
              <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm opacity-70">Why Vistaar?</h3>
              <TrustSignals />
            </div>

            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 rounded-full"></div>
                  <Image src="/vistaar-logo.svg" alt="Vistaar Logo" width={32} height={32} className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500 relative z-10 bg-black" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Direct Access</p>
                  <p className="text-sm text-neutral-400">Founder-led strategy sessions</p>
                </div>
              </div>
              <p className="text-neutral-300 text-sm italic leading-relaxed">
                &quot;We don&apos;t take every project. We only work with exporters who are serious about 10x growth.&quot;
              </p>
            </div>
          </FadeIn>

          {/* Right Column: High-Conversion Form */}
          <SlideUp delay={0.2} className="bg-neutral-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Received!</h3>
                <p className="text-neutral-400 text-lg">We&apos;ll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-300 ml-1">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-neutral-600"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-neutral-300 ml-1">Company</label>
                    <input
                      id="company"
                      type="text"
                      required
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-neutral-600"
                      placeholder="Global Exports Ltd"
                      value={formState.company}
                      onChange={e => setFormState({ ...formState, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">Work Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-neutral-600"
                    placeholder="john@company.com"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="goal" className="text-sm font-medium text-neutral-300 ml-1">Primary Goal</label>
                  <div className="relative">
                    <select
                      id="goal"
                      className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
                      value={formState.goal}
                      onChange={e => setFormState({ ...formState, goal: e.target.value })}
                    >
                      <option value="automation">Alibaba Automation</option>
                      <option value="website">New Website / Re-design</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="crm">CRM Implementation</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="premium"
                  size="xl"
                  className="w-full mt-6 bg-white text-black hover:bg-gray-200 font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : "Book Free Strategy Session"}
                </Button>

                <p className="text-center text-xs text-neutral-500 mt-4">
                  No commitment required. 100% free consultation.
                </p>
              </form>
            )}
          </SlideUp>
        </div>
      </div>
    </main>
  )
}