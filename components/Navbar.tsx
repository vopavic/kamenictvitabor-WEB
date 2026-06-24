"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation" // Correct import for App Router
import { Menu, Phone, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

// Desktop: všechny odkazy · telefon vpravo (logo vlevo nahrazuje „Domů")
const navLinks = [
  { href: "/o-nas", label: "O nás" },
  { href: "/sluzby", label: "Naše služby" },
  { href: "/vzornik", label: "Vzorník" },
  { href: "/realizace", label: "Realizace" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/konzultace", label: "Konzultace" },
]

const PHONE_RED = "bg-[#ca2020] hover:bg-[#a81a1a]"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
          <Image
            src="/icon.png"
            alt="Ikona Kamenictví Tábor"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-xl md:text-2xl font-bold tracking-tight">
              Kamenictví Tábor
            </span>
            <span className="font-body text-[10px] md:text-xs font-medium uppercase tracking-[0.25em] text-accent -mt-0.5 text-right">
              Hňupovi
            </span>
          </span>
        </Link>

        {/* Desktop Navigation — odkazy · telefon vpravo */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map((link) => (
            <DesktopLink key={link.href} link={link} pathname={pathname} />
          ))}

          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-white rounded-full font-body font-semibold text-sm transition-colors shadow-sm whitespace-nowrap",
              PHONE_RED
            )}
          >
            <Phone size={16} />
            {siteConfig.phoneFormatted}
          </a>
        </nav>

        {/* Right side: Phone CTA + Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Phone — vždy plné číslo, červený pill */}
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              "hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 text-white rounded-full font-body font-semibold text-sm transition-colors shadow-sm whitespace-nowrap",
              PHONE_RED
            )}
          >
            <Phone size={16} />
            {siteConfig.phoneFormatted}
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-background border-b border-stone-200"
          >
            <nav className="container px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium py-2 transition-colors hover:text-accent font-body border-b border-stone-100",
                    pathname === link.href ? "text-accent" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  "sm:hidden mt-2 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-full font-body font-semibold transition-colors",
                  PHONE_RED
                )}
              >
                <Phone size={18} />
                {siteConfig.phoneFormatted}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
