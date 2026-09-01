'use client'

import { motion, type Variants } from 'framer-motion'
import { FaLinkedin } from 'react-icons/fa'
import { type TeamMember } from '@/lib/site-data'

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export function InitialsAvatar({ name, className = '' }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300 font-bold ${className}`}>
      {initials}
    </div>
  )
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.article
      variants={fadeUpVariants}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface border border-white/10 transition duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-black/50"
    >
      <a
        href={member.linkedinUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="aspect-[10/9] bg-slate-900 relative overflow-hidden block"
      >
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <InitialsAvatar name={member.name} className="absolute inset-0 h-full w-full text-2xl transition-transform duration-500 group-hover:scale-110" />
        )}

        <div
          className="absolute left-4 top-4 z-20 flex size-8 -translate-y-2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:bg-[#0A66C2] group-hover:translate-y-0 group-hover:opacity-100"
          aria-label={`${member.name}'s LinkedIn`}
        >
          <FaLinkedin size={14} />
        </div>
      </a>

      <div className="flex flex-col items-center p-5 text-center">
        <h3 className="font-display text-xl font-bold text-white">{member.name}</h3>
        <p className="mt-1 text-base leading-relaxed text-slate-400">
          {member.role}
        </p>
      </div>
    </motion.article>
  )
}
