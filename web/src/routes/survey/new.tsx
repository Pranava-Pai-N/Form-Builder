import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { SurveyPayload } from '../../lib/types'
import { createSurvey } from '../../lib/storage';
import { requireAuth } from "@/components/authenticatedRoutes";

export const Route = createFileRoute('/survey/new')({
  beforeLoad : requireAuth,
  component: CreateSurveyPage,
})

function CreateSurveyPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')
  const [primaryColor, setPrimaryColor] = useState('#7c3aed')
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) {
      setError('A survey title is required.')
      return
    }

    const surveyPayload: SurveyPayload = {
      title: title.trim(),
      description: description.trim(),
      coverImage,
      primaryColor,
      questions: [
        { id: 'q1', text: 'What is your name?', type: 'short_text', isRequired: true, order: 0 },
        { id: 'q2', text: 'What feature would you use most?', type: 'multiple_choice', isRequired: true, order: 1, options: ['Branding', 'Questions', 'Response view'] },
        { id: 'q3', text: 'Rate this concept', type: 'rating', isRequired: true, order: 2 },
      ],
    }

    const survey = createSurvey(surveyPayload)
    navigate({ to: `/survey/${survey.id}` })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/20">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">New survey</p>
        <h1 className="text-3xl font-semibold text-white">Give your survey a name and brand it.</h1>
        <p className="text-slate-400">Start from a sleek cover, set the accent color, and then customize the question flow.</p>
      </div>

      <form className="space-y-6" onSubmit={handleCreate}>
        {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}
        <label className="block">
          <span className="text-sm text-slate-300">Survey name</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            placeholder="e.g. Customer feedback survey"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            rows={4}
            placeholder="Describe what this survey is for"
          />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Cover image URL</span>
            <input
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              placeholder="https://..."
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Primary color</span>
            <input
              type="color"
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Create survey
        </button>
      </form>
    </div>
  )
}
