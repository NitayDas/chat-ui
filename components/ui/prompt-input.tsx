"use client"
import * as React from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface PromptInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: (value: string) => void
  actions?: React.ReactNode
}

export function PromptInput({ className, onSubmit, actions, ...props }: PromptInputProps) {
  const [value, setValue] = React.useState("")
  return (
    <div className={cn("flex items-center gap-2 rounded-xl border px-3 py-2", className)}>
      <input
        className="flex-1 bg-transparent outline-none text-sm"
        placeholder={props.placeholder || "Type a prompt..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onSubmit?.(value)
            setValue("")
          }
        }}
      />
      {actions}
      <Button size="sm" onClick={() => { onSubmit?.(value); setValue(""); }} aria-label="Send">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function PromptInputAction({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center">{children}</div>
}
