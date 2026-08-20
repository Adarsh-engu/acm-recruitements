'use client'
import { useState } from 'react'
import { CTA, GalleryGrid, Lightbox, PageShell, SectionIntro } from '@/components/acm-site'
import { galleryItems } from '@/lib/site-data'

export default function Gallery() { const [filter, setFilter] = useState('ALL'); const [selected, setSelected] = useState<number | null>(null); const filters = ['ALL', 'COMMUNITY', 'WORKSHOPS', 'HACKATHONS', 'COMPETITIONS']; return <PageShell><section className="mx-auto max-w-7xl px-5 pb-20 pt-40 sm:px-8"><SectionIntro eyebrow="Gallery" title="Behind the code." description="The people, moments and memories that make ACM GRIET what it is." /><div className="mt-10 flex flex-wrap gap-2">{filters.map(item => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-[.14em] ${filter === item ? 'bg-acm text-white' : 'border border-white/10 text-slate-400'}`}>{item}</button>)}</div><div className="mt-10"><GalleryGrid filter={filter} onSelect={setSelected} /></div></section><Lightbox item={selected === null ? null : galleryItems[selected]} onClose={() => setSelected(null)} /><CTA /></PageShell> }
