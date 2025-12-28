"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const logos = [
    { name: "Vercel", url: "https://res.cloudinary.com/algorn/image/upload/v1525905783/algolia_logo.svg" },
    { name: "Nextjs", url: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
    { name: "Prime", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
    { name: "Trust", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" },
    { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/640px-Meta-Logo.png" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
];

export const LogoMarquee = () => {
    return (
        <div className="relative w-full overflow-hidden bg-black py-12 border-y border-white/5">
            <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-black before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-black after:to-transparent after:content-['']"></div>

            <div className="flex w-max animate-scroll">
                {[...logos, ...logos, ...logos].map((logo, idx) => (
                    <div key={idx} className="mx-8 md:mx-16 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 contrast-0 hover:contrast-100 filter grayscale hover:grayscale-0">
                        {/* Using simple img tags for external SVG/PNGs to avoid Next.js domain config issues for now, or Image if configured */}
                        {/* For safety in this environment without editing next.config often, standard img with some classes is safer if domains aren't whitelisted. 
                 However, Vercel/Wiki are widely used. I'll use text placeholders if images break, or generic icons.
                 Actually, let's use text/icons to be 100% safe against broken links, or SVGs.
              */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.url} alt={logo.name} className="h-8 md:h-10 w-auto object-contain invert" />
                    </div>
                ))}
            </div>
        </div>
    );
};
