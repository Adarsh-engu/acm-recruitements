'use client'

import { FormEvent, useState } from 'react'
import { Check, ChevronRight, Loader2 } from 'lucide-react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { PageShell } from '@/components/acm-site'

const branches = [
  'CE',
  'CSB',
  'CSD',
  'CSE',
  'CSM',
  'ECE',
  'EEE',
  'ME',
]

const years = ['2nd Year', '3rd Year']

const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'Other']

const teams = [
  'Brand & Media Team',
  'Documentation Team',
  'Event Management Team',
  'Graphic Team',
  'Logistics Team',
  'PR (Public Relations) Team',
  'Sponsorship Team',
  'Technical Team',
]

const WHATSAPP_GROUP_URL =
  'https://chat.whatsapp.com/ES6M0NM2Sw6JSfbz4Def42?s=cl&p=a&ilr=1'
const WHATSAPP_QR_SRC = '/images/acm%20whatsapp%20group%20qrcode.jpeg'
const INSTAGRAM_URL = 'https://www.instagram.com/acm_griet'
const LINKEDIN_URL = 'https://www.linkedin.com/company/acm-griet'

type FormData = {
  full_name: string
  college_email: string
  roll_number: string
  phone: string
  year: string
  branch: string
  section: string
  first_priority: string
  second_priority: string
  joined_whatsapp: boolean | null
}

const initialForm: FormData = {
  full_name: '',
  college_email: '',
  roll_number: '',
  phone: '',
  year: '',
  branch: '',
  section: '',
  first_priority: '',
  second_priority: '',
  joined_whatsapp: null,
}

export default function RecruitmentPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: keyof FormData, value: any) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'first_priority' && current.second_priority === value) {
        next.second_priority = ''
      }
      return next
    })
    setError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const fullName = form.full_name.trim()
    const collegeEmail = form.college_email.trim()
    const rollNumber = form.roll_number.trim().toUpperCase()
    const phone = form.phone.trim()

    if (
      !fullName ||
      !collegeEmail ||
      !rollNumber ||
      !phone ||
      !form.year ||
      !form.branch ||
      !form.section ||
      !form.first_priority ||
      form.joined_whatsapp === null
    ) {
      setError('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@grietcollege\.com$/i
    const normalizedEmail = collegeEmail.toLowerCase()
    if (!emailRegex.test(collegeEmail)) {
      setError('Please enter a valid GRIET college email ending with @grietcollege.com.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (!/^[a-zA-Z0-9]{10}$/.test(rollNumber)) {
      setError('Please enter a valid 10-character roll number (e.g. 24241A05A0).')
      return
    }

    const emailLocalPart = normalizedEmail.split('@')[0]
    if (emailLocalPart.slice(0, 10).toUpperCase() !== rollNumber.slice(0, 10).toUpperCase()) {
      setError('Your college email and roll number do not match. The first 10 characters of both must be the same.')
      return
    }

    if (form.second_priority && form.first_priority === form.second_priority) {
      setError('First and second priority teams cannot be the same.')
      return
    }

    const supabase = createClient()
    setSubmitting(true)

    try {
      const { data: existingRecords } = await supabase
        .from('recruitments')
        .select('roll_number, college_email, phone')
        .or(`roll_number.eq.${rollNumber},college_email.eq.${normalizedEmail},phone.eq.${phone}`)
        .limit(1)

      if (existingRecords && existingRecords.length > 0) {
        const match = existingRecords[0]
        if (match.roll_number && match.roll_number.toUpperCase() === rollNumber) {
          setSubmitting(false)
          setError('This roll number has already been used. Please check your roll number and use a different one.')
          return
        }
        if (match.college_email && match.college_email.toLowerCase() === normalizedEmail) {
          setSubmitting(false)
          setError('This college email has already been used. Please use a different college email address.')
          return
        }
        if (match.phone === phone) {
          setSubmitting(false)
          setError('This mobile number is already registered.')
          return
        }
      }
    } catch {}

    const payload = {
      full_name: fullName,
      college_email: normalizedEmail,
      roll_number: rollNumber,
      phone: phone,
      year: form.year,
      branch: form.branch,
      section: form.section,
      first_priority: form.first_priority,
      second_priority: form.second_priority || null,
      joined_whatsapp: form.joined_whatsapp,
    }

    const { error: insertError } = await supabase
      .from('recruitments')
      .insert(payload)

    setSubmitting(false)

    if (insertError) {
      if (insertError.code === '23505') {
        const details = (insertError.details || insertError.message || '').toLowerCase()
        if (details.includes('roll_number') || details.includes('recruitments_roll_number_key')) {
          setError('This roll number has already been used. Please check your roll number and use a different one.')
        } else if (details.includes('college_email')) {
          setError('This college email has already been used. Please use a different college email address.')
        } else if (details.includes('phone') || details.includes('recruitments_phone_key')) {
          setError('This mobile number is already registered.')
        } else {
          setError('This roll number has already been used. Please check your roll number and use a different one.')
        }
      } else {
        setError('Something went wrong while submitting. Please try again.')
        console.error(insertError)
      }
      return
    }

    setSuccess(true)
    setForm(initialForm)
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[.24em] text-acm">
            ACM GRIET
          </p>

          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Join the Chapter.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Tell us a little about yourself and choose the team where you
            would like to contribute, learn and grow.
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-acm/30 bg-surface/70 p-8 text-center shadow-2xl sm:p-12">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-acm/10 text-acm">
              <Check size={30} />
            </div>

            <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
              Application Submitted 🎉
            </h2>

            <p className="mt-3 font-display text-lg font-medium text-acm">
              Thank you for showing your interest in ACM GRIET!
            </p>

            <div className="mx-auto mt-6 max-w-xl space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              <p>
                Your recruitment application has been successfully submitted. We&apos;re glad to see your enthusiasm for being a part of the ACM community.
              </p>
              <p>
                We&apos;re excited to connect with you and look forward to seeing what you can bring to the team. We&apos;ll get in touch with you soon regarding the next steps.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 text-center shadow-2xl shadow-black/50 backdrop-blur-md sm:p-10"
            >
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Stay Connected 💙
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Follow ACM GRIET on our social platforms to stay updated about upcoming events, announcements, recruitment updates, opportunities, and other activities.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 p-[1px] shadow-lg transition-all"
                >
                  <div className="flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#0a1120] px-6 py-3 transition-colors group-hover:bg-transparent">
                    <FaInstagram size={18} className="text-white" />
                    <span className="text-xs font-bold uppercase tracking-[.15em] text-white">Instagram</span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 p-[1px] shadow-lg transition-all"
                >
                  <div className="flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#0a1120] px-6 py-3 transition-colors group-hover:bg-transparent">
                    <FaLinkedin size={18} className="text-white" />
                    <span className="text-xs font-bold uppercase tracking-[.15em] text-white">LinkedIn</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="font-display text-lg font-bold text-white">
                Welcome to ACM GRIET 💙
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[.18em] text-slate-500">
                Explore. Experiment. Evolve.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSuccess(false)
                  setForm(initialForm)
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[.12em] text-slate-300 transition hover:border-acm/50 hover:text-white"
              >
                Submit another application
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-surface/60 p-6 shadow-2xl sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="full_name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Full Name *
                </label>

                <input
                  id="full_name"
                  type="text"
                  value={form.full_name}
                  onChange={(event) =>
                    updateField('full_name', event.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="college_email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  College Email ID *
                </label>

                <input
                  id="college_email"
                  type="email"
                  value={form.college_email}
                  onChange={(event) =>
                    updateField('college_email', event.target.value)
                  }
                  placeholder="24241a05a0@grietcollege.com"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                />
              </div>

              <div>
                <label
                  htmlFor="roll_number"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Roll Number *
                </label>

                <input
                  id="roll_number"
                  type="text"
                  value={form.roll_number}
                  onChange={(event) =>
                    updateField('roll_number', event.target.value.toUpperCase())
                  }
                  placeholder="E.G. 24241A05A0"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm uppercase text-white outline-none placeholder:text-slate-600 focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Phone Number *
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(event) =>
                    updateField(
                      'phone',
                      event.target.value.replace(/\D/g, ''),
                    )
                  }
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Year *
                </label>

                <select
                  id="year"
                  value={form.year}
                  onChange={(event) =>
                    updateField('year', event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Branch *
                </label>

                <select
                  id="branch"
                  value={form.branch}
                  onChange={(event) =>
                    updateField('branch', event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                >
                  <option value="">Select branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="section"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Section *
                </label>

                <select
                  id="section"
                  value={form.section}
                  onChange={(event) =>
                    updateField('section', event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                >
                  <option value="">Select section</option>
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="first_priority"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  First Priority *
                </label>

                <select
                  id="first_priority"
                  value={form.first_priority}
                  onChange={(event) =>
                    updateField('first_priority', event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                >
                  <option value="">Select your first priority</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="second_priority"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300"
                >
                  Second Priority
                </label>

                <select
                  id="second_priority"
                  value={form.second_priority}
                  onChange={(event) =>
                    updateField('second_priority', event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none focus:border-acm/60 focus:ring-1 focus:ring-acm/40"
                >
                  <option value="">Select your second priority (Optional)</option>
                  {teams.map((team) => (
                    <option
                      key={team}
                      value={team}
                      disabled={team === form.first_priority}
                    >
                      {team} {team === form.first_priority ? '(Selected as First Priority)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[.02] p-6 sm:p-8">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[.2em] text-acm">
                JOIN THE ACM GRIET WHATSAPP GROUP
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Join our official WhatsApp group to stay updated about recruitment announcements, further rounds, important updates, and other ACM activities.
              </p>

              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-acm px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-white shadow-lg shadow-acm/20 transition hover:bg-acm-bright"
                >
                  JOIN WHATSAPP GROUP →
                </a>

                <div className="flex flex-col items-center text-center sm:items-end sm:text-right">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white p-2 shadow-md">
                    <img
                      src={WHATSAPP_QR_SRC}
                      alt="ACM GRIET WhatsApp Group QR Code"
                      className="size-36 object-contain sm:size-40"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Or scan the QR code to join
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[.12em] text-slate-300">
                HAVE YOU JOINED THE WHATSAPP GROUP? *
              </label>

              <div className="grid max-w-xs grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('joined_whatsapp', true)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                    form.joined_whatsapp === true
                      ? 'border-acm bg-acm/15 text-white ring-1 ring-acm/40'
                      : 'border-white/10 bg-background text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {form.joined_whatsapp === true && <Check size={16} className="text-acm" />}
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => updateField('joined_whatsapp', false)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                    form.joined_whatsapp === false
                      ? 'border-acm bg-acm/15 text-white ring-1 ring-acm/40'
                      : 'border-white/10 bg-background text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {form.joined_whatsapp === false && <Check size={16} className="text-acm" />}
                  No
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-acm px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-white shadow-lg shadow-acm/20 transition hover:bg-acm-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ChevronRight size={16} />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-[11px] text-slate-600">
              * Required fields
            </p>
          </form>
        )}
      </section>
    </PageShell>
  )
}