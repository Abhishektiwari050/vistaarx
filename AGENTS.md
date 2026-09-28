<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual & Browser Automation Guidelines

- **Web Browsing Automation Preference:**
  For all web browsing, research, visual audits, or scraping related work in this repository, **always prioritize using agentic browser libraries/services like `browser-use`, `stagehand`, or `browserbase`** instead of raw, low-level `playwright` scripts. Document and maintain these integrations inside the workspace scripts library.

# Anti-Vibe-Code Design Engineering & Component Integration Protocol

When designing, building, or integrating React components into this codebase, follow the Master Prompt in `SYSTEM_PROMPT.md` and `.cursorrules`:

1. **Anti-"Vibe-Coded" Countermeasures**:
   - Zero facade syndrome (no fixed heights on text containers, no clipping overflows).
   - Zero staggered Framer Motion spring abuse on every element.
   - Zero arbitrary purple/cyan unanchored neon blur blobs.
   - Strict bespoke monochrome: Celestial Obsidian (`#060709`, `#0D0E15`), Liquid Platinum (`#ECEEF5`), Aerospace Titanium (`#959CB3`).
   - High-density functional UI over empty 3x2 bento grid fillers.
   - Mandatory `:focus-visible` accessibility, semantic HTML, and `prefers-reduced-motion` compliance.

2. **UI Skills MCP Protocol**:
   - Endpoint: `https://www.ui-skills.com/mcp`
   - Server Card: `https://www.ui-skills.com/.well-known/mcp/server-card.json`
   - Tools: `list_skills`, `get_skill`.

3. **Component Integration Protocol**:
   - Verify shadcn structure, Tailwind CSS, TypeScript.
   - Copy component to `/components/ui/` (`src/components/ui/`).
   - Identify dependencies, verify props/data contracts, map color tokens to monochrome palette, and verify compile integrity via `npx tsc --noEmit`.


