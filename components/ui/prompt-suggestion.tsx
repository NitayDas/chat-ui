"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface PromptSuggestionProps {
  suggestions: string[]
  onChoose?: (value: string) => void
}

export function PromptSuggestion({ suggestions, onChoose }: PromptSuggestionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          className={cn("rounded-full border px-3 py-1 text-sm hover:bg-accent")}
          onClick={() => onChoose?.(s)}
          type="button"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
