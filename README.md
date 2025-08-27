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
  chat/
     chatInterface.tsx
     chatMessage.tsx
     PromptKitIntegration.tsx
  navbar.tsx
  ui/
    button.tsx
    card.tsx
    prompt-input.tsx
    prompt-suggestion.tsx
data/
  messages.ts
lib/
  prompt-kit.ts
  utils.ts
types/
  chat.ts
tailwind.config.ts
```


