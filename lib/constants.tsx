import React from "react";
import Image from "next/image";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

export const testimonials = [
    {
        quote: "Vistar engineered our entire intelligence layer. They didn't just build a tool; they transformed our SDLC into a self-healing engine.",
        name: "Marcus Chen",
        title: "CTO @ Flux Systems",
    },
    {
        quote: "The architecture Vistar delivered is battle-hardened. We scaled to 1M requests per second without a single frame drop. Pure technical excellence.",
        name: "Sarah Jenkins",
        title: "Lead Architect @ Arca Corp",
    },
    {
        quote: "They speak the language of engineering. Vistar is the first studio we've worked with that understands deterministic performance and LLM operationalization.",
        name: "David Vark",
        title: "VP Engineering @ QuantEdge",
    },
    {
        quote: "High-fidelity execution. Their automation of our build-to-deploy pipeline reduced our release cycle by 80%.",
        name: "James Thorne",
        title: "Founder @ NeoStack",
    },
];

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 animate-pulse"></div>
);

export const bentoItems = [
    {
        title: "LLM Operationalization",
        description: "Moving AI from experiments to production. Robust RAG pipelines and autonomous agent swarms engineered for reliability.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
                    alt="AI Automation"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                />
            </div>
        ),
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Systemic Architecture",
        description: "Engineered for atomic scaling. High-frequency systems that maintain 99.999% availability under extreme load.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop"
                    alt="SEO Dominance"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                />
            </div>
        ),
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "High-Fidelity Codebase",
        description: "Clean, type-safe, and deterministic. We build codebases that are assets, not liabilities.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"
                    alt="Web Design"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                />
            </div>
        ),
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Automated SDLC",
        description: "Zero-friction deployment engines. We automate the boring stuff so you can focus on building what matters.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                    alt="CRM Dashboard"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                />
            </div>
        ),
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
];

export const stickyContent = [
    {
        title: "1. Architecture Audit",
        description:
            "We dissect your existing stack to find the bottlenecks. From DB latency to CI/CD friction, we map out a high-fidelity roadmap for technical dominance.",
        content: (
            <div className="h-full w-full flex items-center justify-center text-white">
                <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="Audit and Strategy"
                />
            </div>
        ),
    },
    {
        title: "2. Engineering Phase",
        description:
            "This is where the build happens. We implement the core intelligence layer, automate your SDLC, and harden your architecture. Speed is our primary metric.",
        content: (
            <div className="h-full w-full flex items-center justify-center text-white">
                <Image
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="Build and Automate"
                />
            </div>
        ),
    },
    {
        title: "3. Scale & Harden",
        description:
            "Deployment is just the start. We scale your systems to handle global load while maintaining deterministic performance and absolute security.",
        content: (
            <div className="h-full w-full flex items-center justify-center text-white">
                <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="Scale and Optimize"
                />
            </div>
        ),
    },
];
