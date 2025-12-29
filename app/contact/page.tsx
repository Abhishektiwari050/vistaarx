"use client"
import Image from "next/image";
import { useState } from "react"
import { motion } from "framer-motion"
import { FadeIn, SlideUp } from "@/components/motion/MotionWrappers"
import { MagneticButton } from "@/components/ui/magnetic-button"

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
    <main className="min-h-screen bg-white pt-24 pb-20 relative overflow-hidden font-sans selection:bg-[#ccff00] selection:text-black">

      {/* Dynamic Background Elements */}
      <div className="absolute top-20 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#ccff00] blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#ff0080] blur-[100px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-10">

          {/* Left Column: Context & Trust */}
          <FadeIn>
            <div className="relative">
              {/* Funky Sticker Badge */}
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block px-4 py-1 mb-6 border-2 border-black bg-[#ff0080] text-white font-mono font-bold text-sm transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                READY TO DOMINATE?
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-6 leading-[0.9]">
                LET'S <br />
                <span className="text-transparent stroke-text text-stroke-2">SCALE</span> <br />
                <span className="text-[#ccff00] bg-black px-2">YOUR</span> <br />
                BUSINESS.
              </h1>

              <p className="text-xl md:text-2xl font-medium text-neutral-800 mb-12 leading-relaxed max-w-lg font-mono border-l-4 border-[#ff0080] pl-6">
                Stop playing small. Automate operations, crush competitors, and 10x your growth.
              </p>

              <div className="p-8 bg-neutral-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#ccff00] rounded-full border-2 border-black flex items-center justify-center font-bold text-xs text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                  100% <br /> FREE
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-white">
                    <Image src="/vistaar-logo.svg" alt="Vistaar Logo" width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="text-black font-black text-lg uppercase">Founder Direct</p>
                    <p className="text-sm text-neutral-600 font-mono">No middle-men.</p>
                  </div>
                </div>
                <p className="text-black font-medium italic leading-relaxed">
                  "We only work with exporters who are serious about dominating their niche. If that's you, let's talk."
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: High-Conversion Form */}
          <SlideUp delay={0.2} className="relative">

            {/* Form Container */}
            <div className="bg-white p-8 md:p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-[#ccff00] border-4 border-black text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-4xl font-black text-black mb-4 uppercase tracking-tighter">Received!</h3>
                  <p className="text-neutral-600 text-lg font-mono">We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-4 mb-8">Application Form</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-black uppercase tracking-wider ml-1">Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full bg-neutral-50 border-2 border-black px-4 py-3 text-black focus:bg-[#ccff00]/20 focus:ring-0 outline-none transition-all placeholder:text-neutral-400 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-bold text-black uppercase tracking-wider ml-1">Company</label>
                      <input
                        id="company"
                        type="text"
                        required
                        className="w-full bg-neutral-50 border-2 border-black px-4 py-3 text-black focus:bg-[#ccff00]/20 focus:ring-0 outline-none transition-all placeholder:text-neutral-400 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="Global Exports Ltd"
                        value={formState.company}
                        onChange={e => setFormState({ ...formState, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-black uppercase tracking-wider ml-1">Work Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full bg-neutral-50 border-2 border-black px-4 py-3 text-black focus:bg-[#ccff00]/20 focus:ring-0 outline-none transition-all placeholder:text-neutral-400 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      placeholder="john@company.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goal" className="text-sm font-bold text-black uppercase tracking-wider ml-1">Primary Goal</label>
                    <div className="relative">
                      <select
                        id="goal"
                        className="w-full bg-neutral-50 border-2 border-black px-4 py-3 text-black focus:bg-[#ccff00]/20 focus:ring-0 outline-none transition-all appearance-none cursor-pointer font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        value={formState.goal}
                        onChange={e => setFormState({ ...formState, goal: e.target.value })}
                      >
                        <option value="automation">Alibaba Automation</option>
                        <option value="website">New Website / Re-design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="crm">CRM Implementation</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <MagneticButton
                    className="w-full mt-6 bg-[#1a73e8] text-white text-lg font-bold py-4 border-2 border-black transition-all duration-200 active:scale-[0.98] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 uppercase tracking-widest"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : "Book Strategy Session"}
                  </MagneticButton>

                  <p className="text-center text-xs font-mono font-bold text-neutral-500 mt-4 uppercase">
                    100% Free • No Commitments
                  </p>
                </form>
              )}
            </div>
          </SlideUp>
        </div>
      </div>
    </main>
  )
}