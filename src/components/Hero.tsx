import React, { useEffect, useState } from 'react'
import Button from './ui/Button'
import Badge from './ui/Badge'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useI18n } from '@/i18n'
import LightRays from './LightRays'

type Profile = {
  naam: string
  pitch: { nl: string; en: string }
  rol_doelen: string[]
  contact: { email: string; links: { github: string; linkedin: string } }
}

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const { t, lang } = useI18n()

  useEffect(() => {
    fetch('/data/profile.json').then(r => r.json()).then(setProfile)
  }, [])

  if (!profile) return null

  return (
    <section className="relative overflow-hidden min-h-[90svh] sm:min-h-screen flex items-center justify-center text-center dark bg-neutral-950">
      {/* Background rays (warm wit) */}
      <LightRays
        className="custom-rays"
        raysOrigin="top-center"
        raysColor="#FFE8C3"
        raysSpeed={1.35}
        lightSpread={0.85}
        rayLength={1.15}
        followMouse={true}
        mouseInfluence={0.12}
        noiseAmount={0.08}
        distortion={0.04}
      />
      <div className="light-rays-overlay" />

      {/* Content */}
      <div className="relative z-10 container px-4 sm:px-6">
        <div className="mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-neutral-100 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
          >
            {profile.naam}
          </motion.h1>

          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            {profile.rol_doelen.map(role => <Badge key={role}>{role}</Badge>)}
          </div>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-200 max-w-prose mx-auto">
            {lang === 'nl' ? profile.pitch.nl : profile.pitch.en}
          </p>

          {/* Buttons */}
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="#contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto text-white">{t('cta_contact')}</Button>
            </a>
            <a href="/cv/arne-meirhaeghe-cv-nl.pdf" target="_blank" rel="noopener" className="w-full sm:w-auto">
              {/* ✅ Force text-white in Hero context */}
              <Button
                variant="outline"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                {t('cta_download_cv')}
              </Button>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-x-5 gap-y-3 text-[13px] sm:text-sm text-neutral-300">
            <a className="inline-flex items-center gap-1.5 hover:text-neutral-100" href={`mailto:${profile.contact.email}`}>
              <Mail size={18}/> {profile.contact.email}
            </a>
            <a className="inline-flex items-center gap-1.5 hover:text-neutral-100" href={profile.contact.links.github} target="_blank" rel="noopener">
              <Github size={18}/> GitHub
            </a>
            <a className="inline-flex items-center gap-1.5 hover:text-neutral-100" href={profile.contact.links.linkedin} target="_blank" rel="noopener">
              <Linkedin size={18}/> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
