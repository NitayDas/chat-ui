"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PromptInput, PromptInputAction } from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { Button } from "@/components/ui/button"

type Message = { id: number; role: "user" | "assistant"; content: string }

export default function Page() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, role: "assistant", content: "Welcome! This demo uses static data (no APIs)." },
  ])

  const handleSubmit = (value: string) => {
    if (!value.trim()) return
    const id = messages.length + 1
    setMessages(prev => [
      ...prev,
      { id, role: "user", content: value },
      // Static assistant echo (no backend):
      { id: id + 1, role: "assistant", content: `You said: “${value}”` },
    ])
  }

  const quickSuggestions = ["Show features", "Clear chat", "What stack is used?"]

  const onChooseSuggestion = (s: string) => {
    if (s === "Clear chat") {
      setMessages([{ id: 1, role: "assistant", content: "Chat cleared. Ready when you are." }])
    } else if (s === "Show features") {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, role: "assistant", content: "Tech: Next.js + TypeScript + Tailwind + shadcn/ui + prompt-kit-like components. Fully responsive." }
      ])
    } else if (s === "What stack is used?") {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, role: "assistant", content: "This project demonstrates TypeScript, shadcn/ui components, TailwindCSS styling, and prompt-like UI interactions." }
      ])
    } else {
      handleSubmit(s)
    }
  }

  return (
    <main className="container grid min-h-[calc(100vh-56px)] place-items-center py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Frontend Developer Assessment</CardTitle>
          <CardDescription>
            Single-page demo built with Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui, and prompt-kit-style components. Static data only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat window */}
          <div className="h-80 overflow-auto rounded-xl border p-4">
            <div className="space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt suggestions */}
          <PromptSuggestion suggestions={quickSuggestions} onChoose={onChooseSuggestion} />

          {/* Prompt input with actions */}
          <PromptInput
            placeholder="Type a message and press Enter…"
            onSubmit={handleSubmit}
            actions={(
              <PromptInputAction>
                <Button variant="secondary" size="sm" onClick={() => onChooseSuggestion("Clear chat")}>
                  Clear
                </Button>
              </PromptInputAction>
            )}
          />
        </CardContent>
      </Card>
    </main>
  )
}
