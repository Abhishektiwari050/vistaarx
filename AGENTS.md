<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual & Browser Automation Guidelines

- **Web Browsing Automation Preference:**
  For all web browsing, research, visual audits, or scraping related work in this repository, **always prioritize using agentic browser libraries/services like `browser-use`, `stagehand`, or `browserbase`** instead of raw, low-level `playwright` scripts. Document and maintain these integrations inside the workspace scripts library.

