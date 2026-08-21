'use client'

import { useMemo, useState } from 'react'
import { CTA, EventGalleryArchive, Lightbox, PageShell, SectionIntro } from '@/components/acm-site'
import { events, galleryFilters } from '@/lib/site-data'

export default function Gallery() {
  const [filter, setFilter] = useState<string>('ALL')
  const [selected, setSelected] = useState<{ eventId: string; index: number } | null>(null)
  const selectedEvent = selected ? events.find((event) => event.id === selected.eventId) : null
  const selectedPhotos = selectedEvent ? selectedEvent.images?.length ? selectedEvent.images.map((src, index) => ({ eventId: selectedEvent.id, label: `${selectedEvent.imageLabel} ${index + 1}`, src })) : Array.from({ length: selectedEvent.galleryCount }, (_, index) => ({ eventId: selectedEvent.id, label: `${selectedEvent.imageLabel} ${index + 1}`, src: undefined })) : []
  const selectedItem = selected && selectedEvent && selectedPhotos[selected.index] ? { label: selectedPhotos[selected.index].label, src: selectedPhotos[selected.index].src, eventTitle: selectedEvent.title, date: selectedEvent.date } : null
  const moveSelection = (direction: number) => {
    if (!selected || selectedPhotos.length === 0) return
    setSelected({ ...selected, index: (selected.index + direction + selectedPhotos.length) % selectedPhotos.length })
  }
  const visibleCount = useMemo(() => events.filter((event) => filter === 'ALL' || String(event.year) === filter).length, [filter])

  return <PageShell><section className="mx-auto max-w-7xl px-5 pb-20 pt-40 sm:px-8"><SectionIntro eyebrow="Gallery" title="Behind the code." description="The people, moments and memories that make ACM GRIET what it is. Explore the archive by event and year." /><div className="mt-10 flex flex-wrap items-center gap-2">{galleryFilters.map((item) => <button key={item} type="button" onClick={() => { setFilter(item); setSelected(null) }} className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-[.14em] transition ${filter === item ? 'bg-acm text-white' : 'border border-white/10 text-slate-400 hover:border-acm/40 hover:text-white'}`}>{item}</button>)}<span className="ml-2 font-mono text-[10px] uppercase tracking-[.14em] text-slate-600">{visibleCount} events</span></div><div className="mt-14"><EventGalleryArchive filter={filter} onSelect={(eventId, index) => setSelected({ eventId, index })} /></div></section><Lightbox item={selectedItem} onClose={() => setSelected(null)} onPrevious={() => moveSelection(-1)} onNext={() => moveSelection(1)} /><CTA /></PageShell>
}
