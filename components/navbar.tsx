import Link from "next/link"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-base font-semibold">PromptKit Demo</Link>
        <nav className="text-sm text-muted-foreground">
          <a className="hover:underline" href="https://github.com/your-username/nextjs-ts-shadcn-promptkit-starter" target="_blank">GitHub</a>
        </nav>
      </div>
    </header>
  )
}
