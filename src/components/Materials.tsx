import { useEffect, useState } from 'react'
import { MessageCircle, Package, ShieldCheck } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_MATERIALS, type Material } from '../data/defaults'
import { fetchMaterials } from '../lib/supabaseService'

const WHATSAPP_URL =
  'https://wa.me/34604222268?text=Hola!%20Me%20interesa%20pedir%20precio%20por%20el%20siguiente%20material%3A%20'

// ─── Card ──────────────────────────────────────────────────────────────────────
function MaterialCard({ m }: { m: Material }) {
  return (
    <div className="group flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-gray-900 border border-gray-800">

      {/* ── Photo / placeholder ── */}
      {m.image_url ? (
        <div className="relative overflow-hidden" style={{ height: '210px' }}>
          <img
            src={m.image_url}
            alt={m.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // If image fails, hide it so the placeholder shows
              ;(e.target as HTMLImageElement).style.display = 'none'
              const placeholder = (e.target as HTMLImageElement)
                .closest('.relative')
                ?.querySelector('.img-placeholder') as HTMLElement | null
              if (placeholder) placeholder.style.display = 'flex'
            }}
          />
          {/* Gradient overlay for subtle depth at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.7), transparent)' }}
          />
          {/* Badge pill top-right */}
          <span
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg"
            style={{ background: `${m.color}dd` }}
          >
            <ShieldCheck className="w-3 h-3" />
            {m.badge}
          </span>
        </div>
      ) : (
        /* Colour + emoji placeholder when no image */
        <div
          className="flex items-center justify-center"
          style={{
            height: '210px',
            background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)`,
            borderBottom: `3px solid ${m.color}55`,
          }}
        >
          <span className="text-7xl drop-shadow-lg select-none">{m.emoji}</span>
          <span
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg"
            style={{ background: `${m.color}dd` }}
          >
            <ShieldCheck className="w-3 h-3" />
            {m.badge}
          </span>
        </div>
      )}

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Emoji + title */}
        <div className="flex items-center gap-3">
          <span
            className="w-11 h-11 flex items-center justify-center rounded-xl text-2xl flex-shrink-0 shadow"
            style={{ background: `${m.color}22`, border: `2px solid ${m.color}44` }}
          >
            {m.emoji}
          </span>
          <h3 className="text-base font-extrabold text-white leading-tight">{m.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed flex-1">{m.desc}</p>

        {/* Tech detail chip */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold self-start"
          style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}30` }}
        >
          <Package className="w-3 h-3" />
          {m.detail}
        </span>

        {/* CTA */}
        <a
          href={`${WHATSAPP_URL}${encodeURIComponent(m.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm transition-all duration-200 hover:scale-105 shadow-lg mt-1"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
          }}
        >
          <MessageCircle className="w-4 h-4 group-hover/btn:animate-bounce" />
          Pedir precio por WhatsApp
        </a>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Materials() {
  const [localMaterials] = useLocalStorage<Material[]>('iconicparks_materials', DEFAULT_MATERIALS)
  const [materials, setMaterials] = useState<Material[]>(
    localMaterials.length > 0 ? localMaterials : DEFAULT_MATERIALS,
  )

  useEffect(() => {
    fetchMaterials().then((data) => {
      if (data && data.length > 0) setMaterials(data)
    })
  }, [])

  return (
    <section
      id="materiales"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 50%, #f0fdf4 100%)',
      }}
    >
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"
        style={{ background: '#2563EB' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"
        style={{ background: '#22C55E' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#22C55E] to-[#00C4CC] text-white mb-4 shadow-lg shadow-green-200">
            Venta y Repuestos
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Catálogo de{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #22C55E, #00C4CC, #2563EB)' }}
            >
              Materiales
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Suministramos repuestos y materiales de calidad para cualquier parque infantil.
            Fabricación española, entrega en toda la península.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {materials.map((m) => (
            <MaterialCard key={m.id} m={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
