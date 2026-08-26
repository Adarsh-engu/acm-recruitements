import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CTA, EventGrid, Faculty, Hero, Journey, PageShell, SectionIntro, WhyACM } from '@/components/acm-site'
import { events } from '@/lib/site-data'

export default function Home() {
  return <PageShell><Hero /><WhyACM /><Journey /><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionIntro eyebrow="What we&apos;ve been building" title="Ideas, challenges and experiences brought to life." description="A glimpse into the events shaping the ACM GRIET community." /><Link href="/events" className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-acm">View all events <ArrowUpRight size={15} /></Link></div><div className="mt-12"><EventGrid items={events.filter(event => event.featured)} /></div></section><Faculty /><CTA /></PageShell>
}
