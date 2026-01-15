# New UI Components

This directory contains a collection of modern, animated UI components built with **Framer Motion** and **GSAP**. All components follow the project's design system with the signature black, yellow (#ccff00), and pink (#ff0080) color scheme.

## Components List

### 1. **Animated Cursor** (`animated-cursor.tsx`)
A custom animated cursor that follows mouse movements with smooth spring animations.

```tsx
import { AnimatedCursor } from "@/components/ui/animated-cursor";

<AnimatedCursor />
```

### 2. **Aurora Background** (`aurora-background.tsx`)
Beautiful gradient background with flowing aurora-like animations.

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";

<AuroraBackground className="min-h-screen">
  <YourContent />
</AuroraBackground>
```

### 3. **Floating Elements** (`floating-elements.tsx`)
Decorative floating particles that add depth to the background.

```tsx
import { FloatingElements } from "@/components/ui/floating-elements";

<FloatingElements count={20} />
```

### 4. **Glitch Text** (`glitch-text.tsx`)
Text with a glitch effect that can be triggered on hover or run continuously.

```tsx
import { GlitchText } from "@/components/ui/glitch-text";

<GlitchText text="GLITCH EFFECT" trigger="hover" />
<GlitchText text="ALWAYS ON" trigger="always" />
```

### 5. **Morphing Text** (`morphing-text.tsx`)
Text that smoothly transitions between different words using GSAP.

```tsx
import { MorphingText } from "@/components/ui/morphing-text";

<MorphingText 
  texts={["INNOVATE", "CREATE", "DOMINATE"]} 
  interval={3000}
/>
```

### 6. **Parallax Card** (`parallax-card.tsx`)
Interactive card with 3D parallax effect on mouse movement.

```tsx
import { ParallaxCard } from "@/components/ui/parallax-card";

<ParallaxCard>
  <YourCardContent />
</ParallaxCard>
```

### 7. **Particle Background** (`particle-background.tsx`)
Animated particles rising from bottom to top, creating a dynamic background.

```tsx
import { ParticleBackground } from "@/components/ui/particle-background";

<ParticleBackground density={50} />
```

### 8. **Reveal on Scroll** (`reveal-on-scroll.tsx`)
GSAP-powered scroll animations that reveal content as you scroll.

```tsx
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

<RevealOnScroll direction="up" delay={0.2}>
  <YourContent />
</RevealOnScroll>
```

### 9. **Ripple Effect** (`ripple-effect.tsx`)
Interactive ripple effect that appears on click.

```tsx
import { RippleEffect } from "@/components/ui/ripple-effect";

<RippleEffect className="cursor-pointer">
  <YourClickableContent />
</RippleEffect>
```

### 10. **Shiny Button** (`shiny-button.tsx`)
Button with an animated shine effect that sweeps across.

```tsx
import { ShinyButton } from "@/components/ui/shiny-button";

<ShinyButton onClick={handleClick}>
  Click Me
</ShinyButton>
```

### 11. **Stagger Grid** (`stagger-grid.tsx`)
Grid layout with staggered entrance animations for children.

```tsx
import { StaggerGrid } from "@/components/ui/stagger-grid";

<StaggerGrid columns={3} staggerDelay={0.1}>
  <Card1 />
  <Card2 />
  <Card3 />
</StaggerGrid>
```

### 12. **Text Scramble** (`text-scramble.tsx`)
Text that scrambles and reveals itself with random characters.

```tsx
import { TextScramble } from "@/components/ui/text-scramble";

<TextScramble text="DECODED MESSAGE" speed={50} />
```

## Demo Page

Visit `/components-showcase` to see all components in action with interactive examples.

## Technologies

- **Framer Motion**: For smooth, physics-based animations
- **GSAP**: For advanced timeline-based animations and ScrollTrigger
- **Tailwind CSS**: For styling
- **TypeScript**: For type safety

## Design System

All components use the project's color palette:
- Primary Yellow: `#ccff00`
- Accent Pink: `#ff0080`
- Black: `#000000`
- White: `#ffffff`

## Notes

- Components are fully responsive and mobile-friendly
- All animations are optimized for performance
- Components follow React best practices with proper TypeScript types
- ESLint compliant with no errors or warnings
