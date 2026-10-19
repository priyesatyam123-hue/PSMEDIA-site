import { useState, type FormEvent } from 'react'

export type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; area?: boolean }

// Set at build time from the GitHub repository variable VITE_FORM_ENDPOINT (a Formspree form URL).
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
const input = 'w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-white'

export default function Form({ fields, subject, kind }: { fields: Field[]; subject: string; kind: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [msg, setMsg] = useState('')
  const [last, setLast] = useState(0)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return // honeypot: only bots fill this
    const bad = fields.find((f) => {
      const v = String(data.get(f.name) ?? '').trim()
      if (f.required && !v) return true
      if (v && f.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) return true
      if (v && f.type === 'tel' && v.replace(/\D/g, '').length < 8) return true
      return false
    })
    if (bad) { setState('err'); setMsg(`Check the "${bad.label}" field and try again.`); return }
    if (!ENDPOINT) { setState('err'); setMsg('Form delivery is not set up yet. Please use WhatsApp or email instead.'); return }
    if (Date.now() - last < 30000) { setState('err'); setMsg('Please wait 30 seconds before sending another message.'); return }
    setState('loading')
    try {
      data.set('_subject', subject)
      data.set('form', kind)
      const r = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!r.ok) throw new Error('failed')
      setLast(Date.now()); setState('ok'); form.reset()
    } catch {
      setState('err'); setMsg('Your message was not sent. Try again, or message us on WhatsApp.')
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className={`grid gap-2 text-sm text-[#a0a0a0] ${f.area ? 'sm:col-span-2' : ''}`}>
          <span>{f.label}{f.required ? ' *' : ''}</span>
          {f.options ? (
            <select name={f.name} required={f.required} defaultValue="" className={input}>
              <option value="" disabled>Select…</option>
              {f.options.map((o) => <option key={o} className="text-black">{o}</option>)}
            </select>
          ) : f.area ? (
            <textarea name={f.name} required={f.required} rows={4} className={input} />
          ) : (
            <input name={f.name} type={f.type || 'text'} required={f.required} className={input} />
          )}
        </label>
      ))}
      <input name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button disabled={state === 'loading'} className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-300 disabled:opacity-50 sm:col-span-2">
        {state === 'loading' ? 'Sending…' : 'Send message'}
      </button>
      {state === 'ok' && <p role="status" className="sm:col-span-2">Message sent. We will reply on the email or WhatsApp number you gave us.</p>}
      {state === 'err' && <p role="alert" className="text-white/80 sm:col-span-2">{msg}</p>}
    </form>
  )
}
