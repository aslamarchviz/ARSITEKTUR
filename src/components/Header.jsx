import { ArrowUpRight } from "lucide-react"

const navItems = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Contact", "#contact"],
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f3ef]/90 backdrop-blur-xl">
      <div className="container-wide flex h-[72px] items-center justify-between">
        <a href="#top" className="mono text-[11px] tracking-[0.18em] font-medium">
          STUDIO NORTH
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#4e4d47]">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#edit" className="hidden sm:inline-flex items-center gap-2 mono text-[10px] border border-black/15 rounded-full px-4 py-2 hover:bg-black hover:text-[#f4f3ef] transition-colors">
            Edit site
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 mono text-[10px] border border-black/15 rounded-full px-4 py-2 hover:bg-black hover:text-[#f4f3ef] transition-colors">
            Start a project
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </header>
  )
}
