# Frontend Developer Assessment – Next.js + TypeScript + TailwindCSS + shadcn/ui + prompt-kit

A single-page demo application showcasing:
- **Next.js 14 (App Router)** + **TypeScript**
- **TailwindCSS** styling
- **shadcn/ui**-style components (Button, Card)
- **prompt-kit**-style UI interactions (PromptInput, PromptSuggestion)
- Fully responsive and static (no API calls)

> Note: For simplicity, prompt-kit components are included locally under `components/ui/*` to avoid requiring the CLI during review. In a real project, you can add official prompt-kit components via the shadcn CLI, e.g.:
> 
> ```bash
> npx shadcn add "https://prompt-kit.com/c/prompt-input.json"
> npx shadcn add "https://prompt-kit.com/c/prompt-suggestion.json"
> ```

## 🔧 Getting Started

```bash
# 1) Install dependencies
npm install

# 2) Run the dev server
npm run dev

# 3) Open the app
# http://localhost:3000
```

## 🧱 Tech Stack
- Next.js 14
- TypeScript
- TailwindCSS
- shadcn/ui
- Prompt-kit (UI patterns replicated locally)

## 🗂️ Project Structure
```
app/
  layout.tsx
  globals.css
  page.tsx        # Single-page interface with chat, suggestions, and prompt input
components/
  navbar.tsx
  ui/
    button.tsx
    card.tsx
    prompt-input.tsx
    prompt-suggestion.tsx
lib/
  utils.ts
tailwind.config.ts
```

## ✅ Assessment Checklist
- Proper TypeScript usage (strict mode)
- Effective use of shadcn/ui components (Button, Card)
- Clean TailwindCSS styling and responsive layout
- Prompt-style UI interactions (input, suggestions, echo replies) using static data
- Clear README and runnable project

## 📦 Optional: Use official prompt-kit
If the reviewers want the official prompt-kit components instead of the local replicas, run:
```bash
# after installing and initializing shadcn in the repo
npx shadcn add "https://prompt-kit.com/c/prompt-input.json"
npx shadcn add "https://prompt-kit.com/c/prompt-suggestion.json"
```
Then adjust imports to use the generated components under `components/ui`.
