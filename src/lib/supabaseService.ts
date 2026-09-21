/**
 * supabaseService.ts
 * All Supabase data access in one place.
 *
 * DB column mapping:
 *   materiales → { id, emoji, name, desc, badge, detail, color }
 *   proyectos  → { id, image_url, alt, instagram_url, span }
 *
 * The mapper functions translate between DB rows and the local interfaces
 * (Material / Project) used by the components, so if a column name ever
 * changes you only need to update the mappers here.
 */

import { supabase } from './supabase'
import type { Material, Project } from '../data/defaults'

const STORAGE_BUCKET = 'iconicparks-images'

// ─── Mappers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbToMaterial(row: any): Material {
  return {
    id: String(row.id),
    emoji: row.icon ?? row.emoji ?? '⚽',
    name: row.title ?? row.name ?? '',
    desc: row.description ?? row.desc ?? '',
    badge: row.badge ?? 'Fabricación Española',
    detail: row.attributes ?? row.detail ?? '',
    color: row.color ?? '#E53E2A',
    image_url: row.image_url ?? undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbToProject(row: any): Project {
  return {
    id: String(row.id),
    src: row.image_url ?? '',
    // 'title' is the main display text; 'alt' is the img alt attribute
    alt: row.title ?? row.alt ?? '',
    instagramUrl: row.instagram_url ?? 'https://instagram.com/iconicparks_',
    // 'is_wide' is boolean in DB → translate back to Tailwind class
    span: row.is_wide ? 'lg:col-span-2' : '',
  }
}

// ─── Materials ────────────────────────────────────────────────────────────────

export async function fetchMaterials(): Promise<Material[] | null> {
  const { data, error } = await supabase
    .from('materiales')
    .select('*')
    .order('id', { ascending: true })
  if (error) { console.error('[Supabase] fetchMaterials:', error.message); return null }
  return data.map(dbToMaterial)
}

export async function insertMaterial(
  m: Omit<Material, 'id'>,
): Promise<Material | null> {
  const { data, error } = await supabase
    .from('materiales')
    .insert({
      icon: m.emoji,
      title: m.name,
      description: m.desc,
      badge: m.badge,
      attributes: m.detail,
      color: m.color,
      image_url: m.image_url ?? null,
    })
    .select()
    .single()
  if (error) { console.error('[Supabase] insertMaterial:', error.message); return null }
  return dbToMaterial(data)
}

export async function updateMaterial(m: Material): Promise<boolean> {
  const { error } = await supabase
    .from('materiales')
    .update({
      icon: m.emoji,
      title: m.name,
      description: m.desc,
      badge: m.badge,
      attributes: m.detail,
      color: m.color,
      image_url: m.image_url ?? null,
    })
    .eq('id', m.id)
  if (error) { console.error('[Supabase] updateMaterial:', error.message); return false }
  return true
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const { error } = await supabase.from('materiales').delete().eq('id', id)
  if (error) { console.error('[Supabase] deleteMaterial:', error.message); return false }
  return true
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[] | null> {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .order('id', { ascending: true })
  if (error) { console.error('[Supabase] fetchProjects:', error.message); return null }
  return data.map(dbToProject)
}

export async function insertProject(
  p: Omit<Project, 'id'>,
): Promise<Project | null> {
  const { data, error } = await supabase
    .from('proyectos')
    .insert({
      title: p.alt,
      image_url: p.src,
      alt: p.alt,
      instagram_url: p.instagramUrl,
      is_wide: p.span === 'lg:col-span-2',
    })
    .select()
    .single()
  if (error) { console.error('[Supabase] insertProject:', error.message); return null }
  return dbToProject(data)
}

export async function updateProject(p: Project): Promise<boolean> {
  const { error } = await supabase
    .from('proyectos')
    .update({
      title: p.alt,
      image_url: p.src,
      alt: p.alt,
      instagram_url: p.instagramUrl,
      is_wide: p.span === 'lg:col-span-2',
    })
    .eq('id', p.id)
  if (error) { console.error('[Supabase] updateProject:', error.message); return false }
  return true
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase.from('proyectos').delete().eq('id', id)
  if (error) { console.error('[Supabase] deleteProject:', error.message); return false }
  return true
}

// ─── Storage ──────────────────────────────────────────────────────────────────

/**
 * Uploads a File to the iconicparks-images bucket and returns its public URL.
 * Returns null on failure.
 */
export async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (uploadError) {
    console.error('[Supabase] uploadImage:', uploadError.message)
    return null
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// ─── Seed helpers ─────────────────────────────────────────────────────────────

import { DEFAULT_MATERIALS, DEFAULT_PROJECTS } from '../data/defaults'

/**
 * Inserts all default materials into Supabase.
 * Returns the number of rows inserted, or null on error.
 */
export async function seedMaterials(): Promise<number | null> {
  const rows = DEFAULT_MATERIALS.map(({ emoji, name, desc, badge, detail, color, image_url }) => ({
    icon: emoji,
    title: name,
    description: desc,
    badge: badge,
    attributes: detail,
    color: color,
    image_url: image_url ?? null,
  }))
  const { data, error } = await supabase.from('materiales').insert(rows).select()
  if (error) { console.error('[Supabase] seedMaterials:', error.message); return null }
  return data.length
}

/**
 * Inserts all default projects into Supabase.
 * Returns the number of rows inserted, or null on error.
 */
export async function seedProjects(): Promise<number | null> {
  const rows = DEFAULT_PROJECTS.map(({ src, alt, instagramUrl, span }) => ({
    title: alt,           // NOT NULL in DB
    image_url: src,
    alt: alt,
    instagram_url: instagramUrl,
    is_wide: span === 'lg:col-span-2',
  }))
  const { data, error } = await supabase.from('proyectos').insert(rows).select()
  if (error) { console.error('[Supabase] seedProjects:', error.message); return null }
  return data.length
}
