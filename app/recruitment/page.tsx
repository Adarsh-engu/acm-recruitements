'use client'

import { FormEvent, useState } from 'react'
import { Check, ChevronRight, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { PageShell } from '@/components/acm-site'

const branches = [
  'Civil',
  'CSB',
  'CSD',
  'CSE',
  'CSM',
  'ECE',
  'EEE',
  'Mechanical',
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
  roll_number: string
  year: string
  branch: string
  section: string
  phone: string
  interested_roles: string[]
}

const initialForm: FormData = {
  full_name: '',
  roll_number: '',
  year: '',
  branch: '',
  section: '',
  phone: '',
  interested_roles: [],
}

export default function RecruitmentPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
    setError('')
  }

  const toggleTeam = (team: string) => {
    setForm((current) => {
      const alreadySelected = current.interested_roles.includes(team)

      if (alreadySelected) {
        return {
          ...current,
          interested_roles: current.interested_roles.filter(
            (item) => item !== team,
          ),
        }
      }

      if (current.interested_roles.length >= 2) {
        return current
      }

      return {
        ...current,
        interested_roles: [...current.interested_roles, team],
      }
    })

    setError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (
      !form.full_name.trim() ||
      !form.roll_number.trim() ||
      !form.year ||
      !form.branch ||
      !form.section ||
      !form.phone.trim()
    ) {
      setError('Please fill in all required fields.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (form.interested_roles.length === 0) {
      setError('Please select at least one team.')
      return
    }

    const supabase = createClient()

    setSubmitting(true)

    const { error: insertError } = await supabase
      .from('recruitments')
      .insert({
        full_name: form.full_name.trim(),
        roll_number: form.roll_number.trim().toUpperCase(),
        year: form.year,
        branch: form.branch,
        section: form.section,
        phone: form.phone.trim(),
        interested_roles: form.interested_roles,
      })

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
                    updateField('roll_number', event.target.value)
                  }
                  placeholder="e.g. 24XX1A05XX"
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
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[.12em] text-slate-300">
                    Interested Teams *
                  </label>

                  <p className="mt-2 text-xs text-slate-500">
                    Select up to 2 teams.
                  </p>
                </div>

                <span className="font-mono text-xs text-acm">
                  {form.interested_roles.length}/2
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {teams.map((team) => {
                  const selected = form.interested_roles.includes(team)
                  const disabled =
                    !selected && form.interested_roles.length >= 2

                  return (
                    <button
                      key={team}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleTeam(team)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm transition ${
                        selected
                          ? 'border-acm/60 bg-acm/10 text-white'
                          : disabled
                            ? 'cursor-not-allowed border-white/5 bg-white/[.02] text-slate-600'
                            : 'border-white/10 bg-background text-slate-400 hover:border-acm/40 hover:text-white'
                      }`}
                    >
                      <span>{team}</span>

                      {selected && (
                        <span className="grid size-6 place-items-center rounded-full bg-acm text-white">
                          <Check size={14} />
                        </span>
                      )}
                    </button>
                  )
                })}
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