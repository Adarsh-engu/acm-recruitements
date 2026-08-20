'use client'
import { useState } from 'react'
import { EventGrid, PageShell, SectionIntro } from '@/components/acm-site'
import { events } from '@/lib/site-data'

export default function Events() { const [year, setYear] = useState('ALL'); const filtered = year === 'ALL' ? events : events.filter(event => String(event.year) === year); return <PageShell><section className="mx-auto max-w-7xl px-5 pb-24 pt-40 sm:px-8"><SectionIntro eyebrow="Events" title="Ideas are better when they move." description="From chapter moments to technical challenges, explore what ACM GRIET has brought to life." /><div className="mt-12 flex flex-wrap gap-2">{['ALL', '2026', '2025'].map(item => <button key={item} type="button" onClick={() => setYear(item)} className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-[.16em] transition ${year === item ? 'bg-acm text-white' : 'border border-white/10 text-slate-400 hover:border-acm/40 hover:text-white'}`}>{item}</button>)}</div><div className="mt-8"><EventGrid items={filtered} /></div></section></PageShell> }
