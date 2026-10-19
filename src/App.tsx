import { useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, Menu, MessageCircle, X } from 'lucide-react'
import { site } from './data/site'
import Orb from './Orb'
import Form, { type Field } from './Form'

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const wrap = 'mx-auto w-full max-w-6xl px-5 md:px-8'
const h2 = 'text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl'
const muted = 'text-[#a0a0a0]'
const btn = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] transition'
const solid = `${btn} bg-white text-black hover:bg-zinc-300`
const ghost = `${btn} border border-white/25 text-white hover:border-white`

const brandFields: Field[] = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'company', label: 'Brand or Company Name' },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'whatsapp', label: 'WhatsApp Number', type: 'tel' },
  { name: 'inquiry', label: 'Inquiry Type', options: ['Brand campaign', 'Creator collaboration', 'General question'], required: true },
  { name: 'budget', label: 'Budget' },
  { name: 'requirements', label: 'Campaign Requirements', area: true, required: true },
]
const creatorFields: Field[] = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'whatsapp', label: 'WhatsApp Number', type: 'tel', required: true },
  { name: 'location', label: 'Location' },
  { name: 'niche', label: 'Creator Niche', options: site.niches, required: true },
  { name: 'audience', label: 'Audience Size' },
  { name: 'profiles', label: 'Social Media Profile Links', area: true, required: true },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-6px)`
  }
  return (
    <div onPointerMove={move} onPointerLeave={(e) => (e.currentTarget.style.transform = '')} className={`transition-transform duration-200 ${className}`}>
      {children}
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const f = () => setDark(window.scrollY > 24)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const cta = site.wa(site.msg.brand)
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${dark || open ? 'border-b border-white/10 bg-black/70 backdrop-blur-xl' : ''}`}>
      <nav aria-label="Main" className={`${wrap} flex h-16 items-center justify-between`}>
        <a href="#top" className="text-xl font-black tracking-tighter">PS MEDIA</a>
        <ul className={`hidden items-center gap-7 text-sm lg:flex ${muted}`}>
          {site.nav.map(([l, h]) => <li key={h}><a href={h} className="transition hover:text-white">{l}</a></li>)}
        </ul>
        <div className="flex items-center gap-3">
          <a {...ext} href={cta} className={`${solid} hidden sm:inline-flex`}>Let's collaborate</a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="p-1 lg:hidden">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 lg:hidden">
            {site.nav.map(([l, h]) => (
              <li key={h}><a href={h} onClick={() => setOpen(false)} className="block border-t border-white/10 py-4 text-2xl font-bold uppercase">{l}</a></li>
            ))}
            <li className="py-5"><a {...ext} href={cta} className={`${solid} w-full`}>Let's collaborate</a></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function Row({ reverse = false }: { reverse?: boolean }) {
  const group = [...site.brands, ...site.brands, ...site.brands]
  return (
    <div className="overflow-hidden" aria-hidden={reverse}>
      <div className={`marquee ${reverse ? 'marquee-rev' : ''}`}>
        {[0, 1].map((k) =>
          group.map((b, i) => (
            <span key={`${k}-${i}`} className="px-8 text-5xl font-black tracking-tight text-transparent transition [-webkit-text-stroke:1px_rgba(255,255,255,.55)] hover:text-white sm:text-7xl">{b}</span>
          )),
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20">
          <div className={`${wrap} grid items-center gap-6 lg:grid-cols-[1.35fr_1fr]`}>
            <div>
              <p className={`mb-6 text-[11px] font-medium tracking-[0.3em] ${muted}`}>PS MEDIA OFFICIAL<br />INFLUENCE. CREATE. GROW.</p>
              <h1 className="text-[clamp(2.6rem,9.5vw,7.2rem)] font-black uppercase leading-[0.9] tracking-tighter">We connect<br />brands with<br />influence.</h1>
              <p className={`mt-6 max-w-md text-lg ${muted}`}>Turning creator influence into meaningful brand growth.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className={solid}>Explore Our Work</a>
                <a href="#contact" className={ghost}>Partner With Us</a>
              </div>
            </div>
            <Orb />
          </div>
          <a href="#about" aria-label="Scroll down" className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] tracking-[0.3em] ${muted}`}>
            SCROLL<span className="mx-auto mt-2 block h-8 w-px animate-pulse bg-white/50" />
          </a>
        </section>

        <section id="about" className={`${wrap} py-28`}>
          <Reveal><h2 className={h2}>Influence is<br />our business.<br /><span className={muted}>Growth is<br />our purpose.</span></h2></Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className={`text-lg leading-relaxed ${muted}`}>PS MEDIA Official is an influencer marketing agency focused on building meaningful connections between brands and creators. From creator discovery and campaign strategy to content execution and performance-focused collaborations, we help businesses reach relevant audiences through authentic creator partnerships.</p>
            </Reveal>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {site.capabilities.map((c) => <li key={c} className="bg-[#050505] p-5 text-sm font-medium">{c}</li>)}
            </ul>
          </div>
        </section>

        <section id="work" className="border-y border-white/10 bg-[#111111] py-24">
          <Reveal><h2 className={`${wrap} ${h2} mb-14`}>Trusted by brands.<br />Powered by creators.</h2></Reveal>
          <Row />
          <Row reverse />
        </section>

        <section id="services" className={`${wrap} py-28`}>
          <Reveal><h2 className={h2}>Everything you need<br />to make an impact.</h2></Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.services.map((s, i) => (
              <Reveal key={s.title} className="h-full" delay={(i % 4) * 0.06}>
                <Tilt className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/40">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25"><i className="h-3 w-3 rotate-45 bg-white/80" /></span>
                    <span className={`text-xs tracking-widest ${muted}`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{s.text}</p>
                  <a {...ext} href={site.wa(`Hello PS MEDIA Official, I'd like to know more about ${s.title}.`)} className="mt-5 inline-flex items-center gap-1 text-sm transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    Ask about this <ArrowUpRight size={16} />
                  </a>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="founders" className="bg-[#111111] py-28">
          <div className={wrap}>
            <Reveal><h2 className={h2}>Built with vision.<br />Driven by people.</h2></Reveal>
            <p className={`mt-6 max-w-xl ${muted}`}>Behind every successful campaign is a team that understands both brands and creators. We combine strategic thinking, relationship-building, and execution to create meaningful partnerships.</p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {site.founders.map((f) => (
                <Reveal key={f.name}>
                  <figure className="group">
                    <div className="overflow-hidden rounded-2xl border border-white/10 transition group-hover:border-zinc-300">
                      <img src={f.img} alt={`${f.name}, ${f.role} of PS MEDIA Official`} loading="lazy" className="aspect-[4/5] w-full object-cover object-top grayscale transition duration-700 group-hover:scale-105" />
                    </div>
                    <figcaption className="mt-4">
                      <p className="text-2xl font-bold">{f.name}</p>
                      <p className={`text-sm ${muted}`}>{f.role} · {f.focus}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className={`${wrap} py-28`}>
          <Reveal><h2 className={h2}>How we work.</h2></Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {site.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="relative border-l border-white/15 pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-8">
                  <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rotate-45 bg-white md:-top-[5px] md:left-0" />
                  <p className={`text-sm tracking-widest ${muted}`}>0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-black uppercase">{p.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="creators" className="border-t border-white/10 bg-[#111111] py-28">
          <div className={wrap}>
            <Reveal><h2 className={h2}>Your influence.<br />Your next opportunity.</h2></Reveal>
            <p className={`mt-6 max-w-xl ${muted}`}>We connect creators with relevant brand collaborations and campaign opportunities across multiple niches.</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {site.niches.map((n) => <li key={n} className="rounded-full border border-white/20 px-4 py-2 text-sm">{n}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#creator-form" className={solid}>Join Our Creator Network</a>
              <a href="#creator-form" className={ghost}>Submit Your Profile</a>
            </div>
            <div id="creator-form" className="mt-12 rounded-2xl border border-white/10 p-6 sm:p-8">
              <h3 className="mb-6 text-2xl font-bold">Creator registration</h3>
              <Form fields={creatorFields} subject={site.subject.creator} kind="Creator registration" />
            </div>
          </div>
        </section>

        <section id="contact" className={`${wrap} py-28`}>
          <Reveal>
            <h2 className={h2}>Let's create<br />something impactful.</h2>
            <p className={`mt-6 max-w-xl ${muted}`}>Have a brand campaign in mind, or are you a creator looking for your next opportunity? Connect with PS MEDIA Official.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-7">
              <h3 className="text-2xl font-bold">For Brands</h3>
              <p className={`mt-2 ${muted}`}>Discuss influencer campaigns, creator partnerships, and marketing requirements.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a {...ext} href={site.wa(site.msg.brand)} className={solid}><MessageCircle size={16} />Contact Us on WhatsApp</a>
                <a href={site.mail(site.subject.brand, site.msg.brand)} className={ghost}><Mail size={16} />Send Us an Email</a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 p-7">
              <h3 className="text-2xl font-bold">For Creators</h3>
              <p className={`mt-2 ${muted}`}>Join our creator network and explore suitable brand collaborations.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#creator-form" className={solid}>Join Our Network</a>
                <a {...ext} href={site.wa(site.msg.creator)} className={ghost}><MessageCircle size={16} />Message Us on WhatsApp</a>
              </div>
            </div>
          </div>
          <p className={`mt-8 text-sm ${muted}`}>
            <a href={`mailto:${site.email}`} className="text-white underline-offset-4 hover:underline">{site.email}</a> · WhatsApp {site.phone}
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 p-6 sm:p-8">
            <h3 className="mb-6 text-2xl font-bold">Tell us about your campaign</h3>
            <Form fields={brandFields} subject={site.subject.brand} kind="Brand inquiry" />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className={`${wrap} grid gap-8 md:grid-cols-3`}>
          <div>
            <p className="text-xl font-black tracking-tighter">PS MEDIA OFFICIAL</p>
            <p className={`mt-1 text-sm ${muted}`}>Influence. Create. Grow.</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {site.nav.filter(([l]) => l !== 'Our Work').map(([l, h]) => <li key={h}><a href={h} className={`transition hover:text-white ${muted}`}>{l}</a></li>)}
          </ul>
          <div className="text-sm">
            <a href={`mailto:${site.email}`} className="transition hover:text-white">{site.email}</a>
            <ul className="mt-2 flex gap-4">
              {site.socials.map((s) => <li key={s.url}><a {...ext} href={s.url} className={muted}>{s.label}</a></li>)}
            </ul>
          </div>
        </div>
        <p className={`${wrap} mt-10 border-t border-white/20 pt-6 text-xs ${muted}`}>© 2026 PS MEDIA Official. All rights reserved.</p>
      </footer>

      <a {...ext} href={site.wa(site.msg.brand)} aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-xl transition hover:scale-105">
        <MessageCircle />
      </a>
    </>
  )
}
