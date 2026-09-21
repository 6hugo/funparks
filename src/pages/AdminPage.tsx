import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import {
  ArrowLeft, Plus, Pencil, Trash2, Save, X, Lock, Eye, EyeOff,
  LayoutGrid, Package, Upload, Loader2, AlertCircle, LogOut,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import {
  fetchMaterials, insertMaterial, updateMaterial, deleteMaterial,
  fetchProjects, insertProject, updateProject, deleteProject,
  uploadImage,
} from '../lib/supabaseService'
import { DEFAULT_MATERIALS, DEFAULT_PROJECTS, type Material, type Project } from '../data/defaults'

const BRAND_COLORS = [
  { label: 'Rojo',    value: '#E53E2A' },
  { label: 'Naranja', value: '#FF7B00' },
  { label: 'Amarillo',value: '#FFD600' },
  { label: 'Verde',   value: '#22C55E' },
  { label: 'Cyan',    value: '#00C4CC' },
  { label: 'Azul',    value: '#2563EB' },
  { label: 'Morado',  value: '#C026D3' },
]
const EMOJIS = ['⚽','🛡️','🔗','🟩','🕸️','🎨','🔧','⭐','🏆','🎯','📦','🎪']
const SPAN_OPTIONS = [
  { label: 'Normal (1 col)',  value: '' },
  { label: 'Ancho (2 cols)',  value: 'lg:col-span-2' },
]

// ─── Shared helpers ────────────────────────────────────────────────────────────
function StatusBadge({ loading, error }: { loading?: boolean; error?: string | null }) {
  if (loading) return (
    <span className="flex items-center gap-1.5 text-xs text-gray-400">
      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando…
    </span>
  )
  if (error) return (
    <span className="flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="w-3.5 h-3.5" /> {error}
    </span>
  )
  return null
}


// ─── Image uploader ───────────────────────────────────────────────────────────
function ImageInput({
  currentUrl,
  onUrl,
  onFile,
}: {
  currentUrl: string
  onUrl: (url: string) => void
  onFile: (f: File | null) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(currentUrl)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    onFile(f)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
      onUrl(url)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
        Imagen
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => { onUrl(e.target.value); setPreview(e.target.value); onFile(null) }}
          placeholder="/images/parque1.jpeg  o  https://..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-semibold transition whitespace-nowrap"
        >
          <Upload className="w-3.5 h-3.5" />
          Subir
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-1 h-28 w-full object-cover rounded-xl opacity-80 border border-gray-700"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
      )}
    </div>
  )
}

// ─── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password: pw })
    setLoading(false)
    if (authError) {
      setError('Credenciales incorrectas. Comprueba tu email y contraseña.')
      setPw('')
    }
    // On success, onAuthStateChange in AdminPage will update session automatically
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-white text-center mb-1">Panel de Administración</h1>
          <p className="text-gray-500 text-sm text-center mb-6">ICONICPARKS</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                placeholder="Email"
                autoComplete="email"
                required
                className={`w-full px-4 py-3 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${error ? 'border-red-500' : 'border-gray-700'}`}
              />
            </div>
            <div className="relative">
              <input
                id="admin-password"
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(null) }}
                placeholder="Contraseña"
                autoComplete="current-password"
                required
                className={`w-full px-4 py-3 pr-12 rounded-xl bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${error ? 'border-red-500' : 'border-gray-700'}`}
              />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition" tabIndex={-1}>
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-700 rounded-xl px-4 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Iniciando sesión…' : 'Acceder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Material Form ─────────────────────────────────────────────────────────────
const EMPTY_MAT: Omit<Material, 'id'> = { emoji: '⚽', name: '', desc: '', badge: 'Fabricación Española', detail: '', color: '#E53E2A', image_url: '' }

function MaterialForm({ initial, onSave, onCancel }: {
  initial?: Material
  onSave: () => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Material,'id'>>(
    initial ? { emoji:initial.emoji, name:initial.name, desc:initial.desc, badge:initial.badge, detail:initial.detail, color:initial.color, image_url: initial.image_url ?? '' } : EMPTY_MAT
  )
  const [imgFile, setImgFile] = useState<File|null>(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string|null>(null)
  const set = (k: keyof typeof form, v: string) => setForm(f => ({...f, [k]:v}))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true); setErr(null)

    // Upload image if a new file was selected
    let finalForm = { ...form }
    if (imgFile) {
      const uploaded = await uploadImage(imgFile)
      if (!uploaded) { setSaving(false); setErr('Error al subir la imagen.'); return }
      finalForm = { ...finalForm, image_url: uploaded }
    }

    let ok = false
    if (initial) ok = await updateMaterial({ id: initial.id, ...finalForm })
    else { const r = await insertMaterial(finalForm); ok = !!r }
    setSaving(false)
    if (ok) onSave()
    else setErr('Error al guardar. Revisa la consola.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Icono (emoji)</label>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map(e => (
              <button key={e} type="button" onClick={() => set('emoji', e)}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border-2 transition ${form.emoji===e ? 'border-indigo-500 bg-indigo-900/40' : 'border-gray-700 hover:border-gray-500'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Color de acento</label>
          <div className="flex flex-wrap gap-2">
            {BRAND_COLORS.map(c => (
              <button key={c.value} type="button" title={c.label} onClick={() => set('color', c.value)}
                className={`w-8 h-8 rounded-full border-4 transition ${form.color===c.value ? 'border-white scale-110' : 'border-gray-700'}`}
                style={{ background: c.value }} />
            ))}
          </div>
          <input type="text" value={form.color} onChange={e => set('color', e.target.value)} placeholder="#E53E2A"
            className="mt-2 w-full px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Título *</label>
        <input required type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Pack de Bolas"
          className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Descripción</label>
        <textarea rows={3} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Descripción del material..."
          className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Badge superior</label>
          <input type="text" value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Fabricación Española"
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Especificaciones</label>
          <input type="text" value={form.detail} onChange={e => set('detail', e.target.value)} placeholder="Caja 400 uds • Ø 8,5 cm"
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Image upload */}
      <ImageInput
        currentUrl={form.image_url ?? ''}
        onUrl={v => set('image_url', v)}
        onFile={setImgFile}
      />

      {/* Preview */}
      <div className="rounded-xl border border-gray-700 p-3 bg-gray-800/50">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Vista previa</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{form.emoji}</span>
          <div>
            <p className="text-white font-bold text-sm">{form.name || '—'}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: form.color }}>{form.detail || '—'}</p>
          </div>
          <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${form.color}25`, color: form.color }}>
            {form.badge}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar
        </button>
        <button type="button" onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 transition">
          <X className="w-4 h-4" /> Cancelar
        </button>
        <StatusBadge loading={saving} error={err} />
      </div>
    </form>
  )
}

// ─── Project Form ──────────────────────────────────────────────────────────────
const EMPTY_PROJ: Omit<Project,'id'> = { src:'', alt:'', instagramUrl:'https://instagram.com/iconicparks_', span:'' }

function ProjectForm({ initial, onSave, onCancel }: {
  initial?: Project
  onSave: () => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Project,'id'>>(
    initial ? { src:initial.src, alt:initial.alt, instagramUrl:initial.instagramUrl, span:initial.span } : EMPTY_PROJ
  )
  const [file, setFile] = useState<File|null>(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string|null>(null)
  const set = (k: keyof typeof form, v: string) => setForm(f => ({...f, [k]:v}))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.alt.trim()) return
    setSaving(true); setErr(null)

    let imageUrl = form.src

    // Upload file to Supabase Storage if a new file was selected
    if (file) {
      const uploaded = await uploadImage(file)
      if (!uploaded) { setSaving(false); setErr('Error al subir la imagen.'); return }
      imageUrl = uploaded
    }

    const payload: Omit<Project,'id'> = { ...form, src: imageUrl }

    let ok = false
    if (initial) ok = await updateProject({ id: initial.id, ...payload })
    else { const r = await insertProject(payload); ok = !!r }

    setSaving(false)
    if (ok) onSave()
    else setErr('Error al guardar. Revisa la consola.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageInput
        currentUrl={form.src}
        onUrl={v => set('src', v)}
        onFile={setFile}
      />

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
          Título / Descripción del proyecto *
        </label>
        <input required type="text" value={form.alt} onChange={e => set('alt', e.target.value)}
          placeholder="Parque de escalada y redes colorido"
          className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Enlace Instagram</label>
        <input type="url" value={form.instagramUrl} onChange={e => set('instagramUrl', e.target.value)}
          placeholder="https://instagram.com/iconicparks_"
          className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Tamaño en rejilla</label>
        <div className="flex gap-3">
          {SPAN_OPTIONS.map(o => (
            <label key={o.value} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 cursor-pointer font-semibold text-sm transition ${form.span===o.value ? 'border-indigo-500 bg-indigo-900/30 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              <input type="radio" className="hidden" checked={form.span===o.value} onChange={() => set('span', o.value)} />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar
        </button>
        <button type="button" onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 transition">
          <X className="w-4 h-4" /> Cancelar
        </button>
        <StatusBadge loading={saving} error={err} />
      </div>
    </form>
  )
}

// ─── Materials Tab ─────────────────────────────────────────────────────────────
function MaterialsTab() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Material|null>(null)
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string|null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await fetchMaterials()
    setMaterials(data ?? DEFAULT_MATERIALS)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSaved = () => { setAdding(false); setEditing(null); load() }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar este material?')) return
    setDeletingId(id)
    await deleteMaterial(id)
    setDeletingId(null)
    load()
  }

  if (adding || editing) return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">{editing ? 'Editar material' : 'Nuevo material'}</h2>
      <MaterialForm initial={editing ?? undefined} onSave={handleSaved} onCancel={() => { setAdding(false); setEditing(null) }} />
    </div>
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-lg font-bold text-white flex-shrink-0">
          Materiales {loading ? <Loader2 className="inline w-4 h-4 animate-spin ml-1" /> : `(${materials.length})`}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white text-sm bg-indigo-600 hover:bg-indigo-500 transition">
            <Plus className="w-4 h-4" /> Añadir material
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {materials.map(m => (
          <div key={m.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 transition">
            {/* Thumbnail */}
            {m.image_url ? (
              <img
                src={m.image_url}
                alt={m.name}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-700"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ) : (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: `${m.color}25`, border: `2px solid ${m.color}40` }}
              >
                {m.emoji}
              </div>
            )}
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: m.color }} />
            <span className="text-2xl flex-shrink-0">{m.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{m.name}</p>
              <p className="text-gray-500 text-xs truncate">{m.detail}</p>
            </div>
            <span className="hidden sm:block text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
              style={{ background: `${m.color}20`, color: m.color }}>
              {m.badge}
            </span>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setEditing(m)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition" title="Editar">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(m.id)} disabled={deletingId === m.id}
                className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 disabled:opacity-50 transition" title="Eliminar">
                {deletingId === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
        {!loading && materials.length === 0 && (
          <p className="text-center text-gray-500 py-12">No hay materiales. Añade uno.</p>
        )}
      </div>
    </div>
  )
}

// ─── Projects Tab ──────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Project|null>(null)
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string|null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await fetchProjects()
    setProjects(data ?? DEFAULT_PROJECTS)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSaved = () => { setAdding(false); setEditing(null); load() }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return
    setDeletingId(id)
    await deleteProject(id)
    setDeletingId(null)
    load()
  }

  if (adding || editing) return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">{editing ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
      <ProjectForm initial={editing ?? undefined} onSave={handleSaved} onCancel={() => { setAdding(false); setEditing(null) }} />
    </div>
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-lg font-bold text-white flex-shrink-0">
          Montajes {loading ? <Loader2 className="inline w-4 h-4 animate-spin ml-1" /> : `(${projects.length})`}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white text-sm bg-indigo-600 hover:bg-indigo-500 transition">
            <Plus className="w-4 h-4" /> Añadir montaje
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map(p => (
          <div key={p.id} className="relative group rounded-2xl overflow-hidden border border-gray-700 bg-gray-800">
            <img src={p.src} alt={p.alt}
              className="w-full h-36 object-cover opacity-80 group-hover:opacity-100 transition"
              onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
            <div className="px-3 py-2">
              <p className="text-white text-sm font-semibold truncate">{p.alt}</p>
              <p className="text-gray-500 text-xs truncate">{p.src}</p>
              {p.span && (
                <span className="inline-block mt-1 text-xs bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded-full">Ancho</span>
              )}
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
              <button onClick={() => setEditing(p)}
                className="p-1.5 rounded-lg bg-gray-900/80 text-gray-300 hover:text-white transition" title="Editar">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => remove(p.id)} disabled={deletingId === p.id}
                className="p-1.5 rounded-lg bg-gray-900/80 text-gray-300 hover:text-red-400 disabled:opacity-50 transition" title="Eliminar">
                {deletingId === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-500 py-12 col-span-3">No hay montajes. Añade uno.</p>
        )}
      </div>
    </div>
  )
}

// ─── Admin Shell ───────────────────────────────────────────────────────────────
type Tab = 'materiales' | 'proyectos'

function AdminShell({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('proyectos')

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Panel Admin</p>
              <p className="text-gray-500 text-xs" title={session.user.email}>ICONICPARKS · {session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 h-9 rounded-xl text-xs sm:text-sm font-semibold text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 transition whitespace-nowrap">
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Volver a la web</span>
              <span className="sm:hidden">Web</span>
            </button>
            <button onClick={onLogout}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 h-9 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-800 transition">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1">
          {([
            { id: 'proyectos' as Tab, label: 'Montajes', icon: LayoutGrid },
            { id: 'materiales' as Tab, label: 'Materiales', icon: Package },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition ${tab===id ? 'border-indigo-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {tab === 'materiales' ? <MaterialsTab /> : <ProjectsTab />}
      </main>
    </div>
  )
}

// ─── AdminPage (exported) ──────────────────────────────────────────────────────
export default function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    // Check for an existing session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Keep session state in sync with Supabase Auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    // onAuthStateChange will set session to null automatically
  }

  // Still checking session — render nothing (avoids flash of login screen)
  if (session === undefined) return null

  if (!session) return <LoginScreen />
  return <AdminShell session={session} onLogout={logout} />
}
