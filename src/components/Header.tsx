import React, { useEffect, useState } from 'react'
import { Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

const links = [
  { href: '#about', key: 'nav_about' },
  { href: '#skills', key: 'nav_skills' },
  { href: '#projects', key: 'nav_projects' },
  { href: '#experience', key: 'nav_experience' },
  { href: '#contact', key: 'nav_contact' }
]

export default function Header() {
  const { dark, toggle } = useTheme()
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur bg-white/70 dark:bg-neutral-950/70">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-semibold text-lg tracking-tight">Arne Meirhaeghe</a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm hover:text-brand-600">{t(l.key)}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle language"
            className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
            title="Language"
          >
            <Globe size={18} /> <span className="uppercase">{lang}</span>
          </button>
          <button
            aria-label="Toggle dark mode"
            className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={toggle}
            title="Dark mode"
          >
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>

          <button
            className="md:hidden ml-2 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div id="mobile-nav" className={cn("md:hidden overflow-hidden transition-[max-height] duration-300", open ? "max-h-64" : "max-h-0")}>
        <div className="container py-2 flex flex-col gap-2">
          {links.map(l => (
            <a key={l.href} href={l.href} className="py-2 border-b border-neutral-200/60 dark:border-neutral-800/60">{t(l.key)}</a>
          ))}
        </div>
      </div>
    </header>
  )
}
