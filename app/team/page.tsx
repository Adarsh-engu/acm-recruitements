import { CTA, PageShell, SectionIntro } from '@/components/acm-site'
import { teamMembers } from '@/lib/site-data'
import { TeamCard } from '@/components/team-section'

export default function Team() {
  const coreTeam = teamMembers.filter(m => m.category === 'core')
  const leads = teamMembers.filter(m => m.category === 'lead')

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
        <SectionIntro
          eyebrow="Meet the Team"
          title="The people behind ACM GRIET."
          description="The students running the chapter and making things happen."
        />

        {/* Core Team */}
        <div className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white">Core Committee</h2>
            <p className="mt-2 text-sm text-slate-400">The executive board.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreTeam.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Leads */}
        <div className="mt-32">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white">Team Leads</h2>
            <p className="mt-2 text-sm text-slate-400">Driving Initiatives through various domains.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {leads.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

      </section>
      <CTA />
    </PageShell>
  )
}
