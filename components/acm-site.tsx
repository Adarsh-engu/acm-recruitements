'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Blocks, CalendarDays, ChevronRight, Circle, ExternalLink, Flag, Camera, BriefcaseBusiness, Menu, Sparkles, Trophy, Users, X } from 'lucide-react'
import { benefits, events, journeyItems, navItems, recruitmentIsReady, siteConfig, type EventItem } from '@/lib/site-data'

const iconMap = { BookOpen, Blocks, Trophy, Sparkles, Users, Flag }

export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/acm-logo-circle.png"
        alt="ACM GRIET"
        className={compact ? "size-9 object-contain" : "size-10 object-contain"}
      />

      {!compact && (
        <span className="font-display text-sm font-bold tracking-tight text-white">
          ACM <span className="text-acm">GRIET</span>
        </span>
      )}
    </div>
  )
}

export function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"><nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5"><Link href="/" onClick={() => setOpen(false)}><Mark /></Link><div className="hidden items-center gap-6 md:flex">{navItems.map(([label, href]) => <Link key={href} href={href} className={`text-xs font-medium transition-colors ${path === href ? 'text-white' : 'text-slate-400 hover:text-white'}`}>{label}</Link>)}<JoinButton /></div><button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-200 md:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>{open && <div className="absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-white/10 bg-ink p-3 shadow-2xl md:hidden">{navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white">{label}</Link>)}<div className="px-1 pt-2"><JoinButton /></div></div>}</nav></header>
}

export function JoinButton({ className = '' }: { className?: string }) {
  const [message, setMessage] = useState(false)
  const activate = () => { if (!recruitmentIsReady) { setMessage(true); window.setTimeout(() => setMessage(false), 3600) } }
  return <div className={`relative ${className}`}><a href={recruitmentIsReady ? siteConfig.recruitmentFormUrl ?? '#' : '#recruitment-placeholder'} onClick={activate} className="inline-flex items-center justify-center gap-2 rounded-full bg-acm px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-lg shadow-acm/20 transition hover:bg-acm-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"><span>JOIN ACM</span><ArrowUpRight size={15} /></a>{message && <div role="status" className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 rounded-xl border border-acm/30 bg-surface p-3 text-xs leading-5 text-slate-200 shadow-xl">RECRUITMENT FORM COMING SOON. The form link will be added here.</div>}</div>
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><Nav /><main className="min-h-screen overflow-hidden">{children}</main><Footer /></> }
export function SectionIntro({ eyebrow, title, description, align = 'left' }: { eyebrow: string; title: string; description?: string; align?: 'left' | 'center' }) { return <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}><p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[.24em] text-acm">{eyebrow}</p><h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl text-balance">{title}</h2>{description && <p className="mt-5 text-base leading-7 text-slate-400 text-pretty">{description}</p>}</div> }

export function MediaPlaceholder({ label, large = false, src, natural = false }: { label: string; large?: boolean; src?: string; natural?: boolean }) { if (src) return <div className={`media-image-frame overflow-hidden rounded-2xl border border-white/10 bg-[#101a2b] ${large ? 'min-h-80' : 'aspect-[1.35/1]'}`}><img src={src} alt={label} loading="lazy" className={`h-full w-full ${natural ? 'object-contain' : 'object-cover'}`} /></div>; return <div className={`media-placeholder relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#101a2b] ${large ? 'min-h-80' : 'aspect-[1.35/1]'}`}><div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(39,151,255,.08)_45%,transparent_70%)]" /><div className="relative flex flex-col items-center gap-3 px-6 text-center"><div className="grid size-12 place-items-center rounded-full border border-acm/30 bg-acm/10 text-acm"><Circle size={10} fill="currentColor" /></div><span className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">{label}</span><span className="text-xs text-slate-600">{label.includes('NOVA') ? 'Event photographs will be added later' : 'Authentic event media will appear here'}</span></div></div> }

export function EventCard({ event }: { event: EventItem }) { return <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/70 transition duration-300 hover:-translate-y-1 hover:border-acm/40 hover:bg-surface"><MediaPlaceholder
  label={event.imageLabel}
  src={event.coverImage}
/><div className="flex flex-1 flex-col p-5 sm:p-6"><div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-acm"><CalendarDays size={13} /> {event.date}</div><h3 className="font-display text-xl font-semibold leading-tight text-white">{event.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{event.description}</p><div className="mt-5 flex flex-wrap gap-2">{event.tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-400">{tag}</span>)}</div><Link href={`/events/${event.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-white transition group-hover:text-acm">View event <ChevronRight size={14} /></Link></div></article> }

export function EventGrid({ items = events }: { items?: EventItem[] }) { return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(event => <EventCard key={event.id} event={event} />)}</div> }

export function WhyACM() { return <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"><SectionIntro eyebrow="Why ACM?" title="More than a club. A space to learn, build, collaborate and grow." /><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{benefits.map(([title, description, icon]) => { const Icon = iconMap[icon as keyof typeof iconMap]; return <div key={title} className="group rounded-2xl border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-1 hover:border-acm/40 hover:bg-acm/[.05]"><Icon size={22} strokeWidth={1.5} className="text-acm transition group-hover:scale-110" /><h3 className="mt-10 font-display text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div> })}</div></section> }

export function Journey() { return <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"><SectionIntro eyebrow="What you&apos;ll actually experience" title="A community is built one step at a time." description="There is no single way to be part of ACM GRIET. Start with curiosity, find your people, and keep moving toward the work that excites you." /><div className="journey-list mt-12 grid gap-3 md:grid-cols-5">{journeyItems.map(([step, title, description]) => <article key={step} className="journey-step group relative rounded-2xl border border-white/10 bg-white/[.025] p-5 transition hover:-translate-y-1 hover:border-acm/40 hover:bg-acm/[.05]"><span className="font-mono text-xs font-bold text-acm">{step}</span><h3 className="mt-8 font-display text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></article>)}</div></section> }

export function Faculty() { return <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-surface/60 p-7 sm:flex-row sm:items-end sm:p-10"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-acm">Guided by experience. Driven by students.</p><h2 className="mt-4 font-display text-2xl font-semibold text-white">Dr. B. Sankara Babu</h2><p className="mt-2 text-sm leading-6 text-slate-400">Head, Department of Computer Science & Engineering<br />Faculty Coordinator, ACM GRIET Student Chapter</p></div><div className="font-mono text-xs text-slate-500">ACM GRIET / 2026</div></div></section> }

export function CTA() { return <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="relative overflow-hidden rounded-3xl border border-acm/30 bg-acm/[.09] p-8 sm:p-12"><div className="relative z-10 max-w-2xl"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan">Open to 2nd and 3rd year students</p><h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-5xl text-balance">Ready to explore what&apos;s next?</h2><p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">Join ACM GRIET and be part of a community that learns, builds and creates together.</p><div className="mt-7"><JoinButton /></div></div><div className="absolute -right-8 -top-20 hidden size-72 rounded-full border border-acm/20 md:block" /><div className="absolute -right-16 -top-8 hidden size-72 rounded-full border border-acm/10 md:block" /></div></section> }

export function Footer() { return <footer className="border-t border-white/10 bg-[#070d18]"><div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between"><div><Link href="/"><Mark /></Link><p className="mt-4 max-w-xs text-xs leading-5 text-slate-500">{siteConfig.institute}</p></div><div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-400">{navItems.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}<a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Camera size={14} /> Instagram</a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><BriefcaseBusiness size={14} /> LinkedIn</a></div><p className="font-mono text-[10px] text-slate-600">© 2026 ACM GRIET Student Chapter</p></div></footer> }

export function EventGalleryArchive({
  filter,
  onSelect,
}: {
  filter: string
  onSelect: (eventId: string, index: number) => void
}) {
  const shownEvents = events.filter(
    (event) => filter === 'ALL' || String(event.year) === filter
  )

  return (
    <div className="event-archive">
      {shownEvents.map((event, eventIndex) => {
        const photos = event.images?.length
          ? event.images.map((src, index) => ({
              eventId: event.id,
              label: `${event.imageLabel} ${index + 1}`,
              src,
            }))
          : []

        const hasPhotos = photos.length > 0

        return (
          <article
            key={event.id}
            className="border-t border-white/10 py-16 first:border-t-0 first:pt-0 sm:py-20"
          >
            {/* EVENT INFORMATION */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.18em] text-acm">
                <span>{String(eventIndex + 1).padStart(2, '0')}</span>
                <span className="h-px w-8 bg-acm/50" />
                <span>{event.date}</span>
              </div>

              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {event.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                {event.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[.12em] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {event.venue && (
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[.14em] text-slate-600">
                  {event.venue}
                </p>
              )}
            </div>

            {/* MAIN EVENT PHOTO */}
            <div className="mt-10">
              {hasPhotos ? (
                <button
                  type="button"
                  onClick={() => onSelect(event.id, 0)}
                  aria-label={`Open ${event.title} gallery`}
                  className="group block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101a2b]">
                    <img
                      src={photos[0].src}
                      alt={`${event.title} — main photograph`}
                      loading="lazy"
                      className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.015] sm:h-[500px]"
                    />

                    {/* subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[.18em] text-white/70">
                          {event.imageLabel}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {photos.length} photographs
                        </p>
                      </div>

                      <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-white backdrop-blur-sm transition group-hover:border-acm group-hover:bg-acm group-hover:text-white">
                        View gallery →
                      </span>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-acm/30 bg-acm/[.04] px-6 text-center">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[.18em] text-acm">
                      {event.title} / Media pending
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Event photographs will be added later.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function Lightbox({
  item,
  onClose,
  onPrevious,
  onNext,
}: {
  item: {
    label: string
    src?: string
    eventTitle: string
    date: string
    index: number
    total: number
  } | null
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
}) {
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    if (!item) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious?.()
      if (event.key === 'ArrowRight') onNext?.()
    }

    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [item, onClose, onPrevious, onNext])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Event image preview"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-7xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-3 flex shrink-0 items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-acm">
              {item.date}
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold text-white">
              {item.eventTitle}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-white hover:border-acm hover:text-acm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Image + arrows */}
        <div
          className="relative flex min-h-0 flex-1 items-center justify-center"
          onTouchStart={(event) => {
            touchStart.current =
              event.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current
            const end = event.changedTouches[0]?.clientX ?? null

            if (
              start !== null &&
              end !== null &&
              Math.abs(end - start) > 48
            ) {
              ;(end < start ? onNext : onPrevious)?.()
            }

            touchStart.current = null
          }}
        >
          {/* Previous */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={onPrevious}
            className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur hover:border-acm hover:text-acm sm:left-4"
          >
            ←
          </button>

          {/* Image */}
          <div className="flex h-full w-full items-center justify-center">
            {item.src ? (
              <img
                src={item.src}
                alt={item.label}
                className="max-h-full max-w-full rounded-2xl border border-white/10 object-contain"
              />
            ) : (
              <MediaPlaceholder
                label={item.label}
                src={item.src}
                natural
                large
              />
            )}
          </div>

          {/* Next */}
          <button
            type="button"
            aria-label="Next image"
            onClick={onNext}
            className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur hover:border-acm hover:text-acm sm:right-4"
          >
            →
          </button>
        </div>

        {/* Counter */}
        <div className="mt-3 shrink-0 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">
            {item.index + 1} / {item.total}
            {' · '}
            Use arrow keys to navigate
          </span>
        </div>
      </div>
    </div>
  )
} 

export function SocialLinks() { return <div className="flex gap-3"><a aria-label="Instagram" href={siteConfig.instagram} target="_blank" rel="noreferrer" className="grid size-11 place-items-center rounded-full border border-white/10 text-slate-300 hover:border-acm hover:text-acm"><Camera size={18} /></a><a aria-label="LinkedIn" href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="grid size-11 place-items-center rounded-full border border-white/10 text-slate-300 hover:border-acm hover:text-acm"><BriefcaseBusiness size={18} /></a></div> }

export function Hero() { return <section className="hero-grid relative flex min-h-[780px] items-center px-5 pb-20 pt-40 sm:px-8"><div className="mx-auto w-full max-w-7xl"><div className="max-w-4xl"><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-acm/30 bg-acm/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.2em] text-cyan"><span className="size-1.5 rounded-full bg-cyan shadow-[0_0_12px_currentColor]" /> Student-led computing community</p><h1 className="font-display text-[clamp(3.5rem,10vw,8.8rem)] font-bold leading-[.9] tracking-[-.07em] text-white">Explore.<br /><span className="text-acm">Experiment.</span><br />Evolve.</h1><p className="mt-8 font-display text-lg font-medium text-slate-200 sm:text-2xl">ACM GRIET Student Chapter</p><p className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">Where technology meets curiosity, ideas turn into action, and students come together to build what&apos;s next.</p><div className="mt-8 flex flex-wrap items-center gap-4"><JoinButton /><Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold tracking-wide text-slate-200 transition hover:border-acm/50 hover:text-white">EXPLORE ACM <ChevronRight size={15} /></Link></div></div><div className="mt-24 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[.18em] text-slate-500"><span>GRIET / Hyderabad</span><span className="h-px w-16 bg-white/20" /><span>2026 recruitment</span></div></div></section> }

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-white hover:text-acm">{children}<ArrowUpRight size={15} /></Link> }

export function DetailMeta({ event }: { event: EventItem }) { return <div className="grid gap-5 border-y border-white/10 py-6 sm:grid-cols-3"><div><span className="label">Date</span><p className="mt-2 text-sm text-white">{event.date}</p></div>{event.time && <div><span className="label">Time</span><p className="mt-2 text-sm text-white">{event.time}</p></div>}<div><span className="label">Venue</span><p className="mt-2 text-sm text-white">{event.venue || 'GRIET'}</p></div></div> }
