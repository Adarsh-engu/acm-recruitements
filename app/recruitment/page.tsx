'use client'

import { FormEvent, useState } from 'react'
import { Check, ChevronRight, Loader2 } from 'lucide-react'
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
  'Documentation Team',
  'Event Management Team',
  'Graphics Team',
  'Logistics Team',
  'Publicity Team',
  'Social Media Team',
  'Sponsorship Team',
  'Technical Team',
]

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
}

export default function RecruitmentPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
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
      !form.first_priority
    ) {
      setError('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const normalizedEmail = collegeEmail.toLowerCase()
    if (!emailRegex.test(normalizedEmail) || !normalizedEmail.endsWith('@grietcollege.com')) {
      setError('Please enter a valid GRIET college email ending with @grietcollege.com.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (form.second_priority && form.first_priority === form.second_priority) {
      setError('First and second priority teams cannot be the same.')
      return
    }

    const supabase = createClient()

    setSubmitting(true)

    const roles = [form.first_priority, form.second_priority].filter(Boolean)

    const updatedPayload = {
      full_name: fullName,
      college_email: normalizedEmail,
      roll_number: rollNumber,
      phone_number: phone,
      phone: phone,
      year: form.year,
      branch: form.branch,
      section: form.section,
      first_priority: form.first_priority,
      second_priority: form.second_priority || null,
      interested_roles: roles,
      interested_teams: roles,
    }

    let { error: insertError } = await supabase
      .from('recruitments')
      .insert(updatedPayload)

    if (insertError && insertError.code === 'PGRST204') {
      const fallbackPayload = {
        full_name: fullName,
        roll_number: rollNumber,
        year: form.year,
        branch: form.branch,
        section: form.section,
        phone: phone,
        interested_roles: roles,
      }

      const fallbackRes = await supabase
        .from('recruitments')
        .insert(fallbackPayload)

      insertError = fallbackRes.error
    }

    setSubmitting(false)

    if (insertError) {
      if (insertError.code === '23505') {
        setError('An application with this roll number has already been submitted.')
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
          <div className="rounded-3xl border border-acm/30 bg-surface/70 p-10 text-center shadow-2xl">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-acm/10 text-acm">
              <Check size={30} />
            </div>

            <h2 className="mt-6 font-display text-2xl font-semibold text-white">
              Application submitted!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              Thank you for your interest in ACM GRIET. Your recruitment
              application has been recorded successfully.
            </p>

            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-acm px-6 py-3 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:bg-acm-bright"
            >
              Submit another application
              <ChevronRight size={15} />
            </button>
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