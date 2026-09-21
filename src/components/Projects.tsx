import { useEffect, useState } from 'react'
import { Share2, ExternalLink } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_PROJECTS, type Project } from '../data/defaults'
import { fetchProjects } from '../lib/supabaseService'

export default function Projects() {
  const [localProjects] = useLocalStorage<Project[]>('iconicparks_projects', DEFAULT_PROJECTS)
  const [projects, setProjects] = useState<Project[]>(
    localProjects.length > 0 ? localProjects : DEFAULT_PROJECTS,
  )

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data && data.length > 0) setProjects(data)
    })
  }, [])

  return (
    <section id="proyectos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#C026D3] to-[#2563EB] text-white mb-4 shadow-lg shadow-purple-200">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Montajes{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #C026D3, #2563EB, #00C4CC)' }}
            >
              Realizados
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Cada proyecto es único. Mira algunos de nuestros parques terminados en toda España.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-6 w-full max-w-sm mx-auto">
            <a
              href="https://instagram.com/iconicparks_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                boxShadow: '0 4px 20px rgba(131,58,180,0.35)',
              }}
            >
              <Share2 className="w-5 h-5" />
              Síguenos en Instagram @iconicparks_
            </a>
            <a
              href="https://www.tiktok.com/@iconicparks?_r=1&_t=ZN-99tLqSkYzos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #010101, #2d2d2d)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
              }}
            >
              {/* TikTok icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.19a8.16 8.16 0 0 0 4.77 1.52V7.26a4.85 4.85 0 0 1-1-.57z"/>
              </svg>
              Síguenos en TikTok @iconicparks
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((proj) => {
            const isWide = proj.span === 'lg:col-span-2'
            return (
              <div
                key={proj.id}
                className={`group relative overflow-hidden rounded-3xl shadow-xl ${
                  isWide ? 'md:col-span-2' : ''
                }`}
              >
                {/* Aspect ratio: uniform 4/3 on mobile, panoramic 16/9 on desktop for wide cards */}
                <div className={`w-full ${isWide ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={proj.src}
                    alt={proj.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 sm:p-7">
                  <div className="w-full">
                    <p className="text-white text-base font-bold mb-3 truncate pr-1 drop-shadow">{proj.alt}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {/* Instagram button */}
                      <a
                        href={proj.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white hover:scale-105 transition-transform"
                        style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        <span>Ver en Instagram</span>
                      </a>
                      {/* TikTok button */}
                      <a
                        href="https://www.tiktok.com/@iconicparks?_r=1&_t=ZN-99tLqSkYzos"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white hover:scale-105 transition-transform border border-white/20 hover:border-cyan-400/60"
                        style={{ background: 'linear-gradient(135deg, #010101, #2d2d2d)' }}
                      >
                        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.19a8.16 8.16 0 0 0 4.77 1.52V7.26a4.85 4.85 0 0 1-1-.57z"/>
                        </svg>
                        <span>Ver en TikTok</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>



      </div>
    </section>
  )
}
