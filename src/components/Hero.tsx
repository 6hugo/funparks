import { MessageCircle, CheckCircle, Eye } from 'lucide-react'

const heroImage = '/images/parque1.jpeg'

const BADGES = [
  { label: '🇪🇸 Cobertura en toda España', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { label: '✅ Materiales 100% Homologados', color: 'bg-green-100 text-green-700 border-green-200' },
  { label: '🔧 Servicio Técnico y Reparación', color: 'bg-orange-100 text-orange-700 border-orange-200' },
]

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1d4ed8 60%, #0891b2 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FFD600, transparent)' }}
        />
        <div
          className="absolute top-1/2 -left-24 w-72 h-72 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #E53E2A, transparent)' }}
        />
        <div
          className="absolute -bottom-20 right-1/3 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #00C4CC, transparent)' }}
        />
        {/* Floating balls */}
        {['#E53E2A', '#FF7B00', '#FFD600', '#22C55E', '#00C4CC', '#C026D3', '#2563EB'].map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60"
            style={{
              background: c,
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              top: `${10 + i * 12}%`,
              left: `${5 + i * 13}%`,
              animation: `float${i % 3} ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 sm:pt-40 grid lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left column — 6/12 cols */}
        <div className="lg:col-span-6">
          {/* Trust badge row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {BADGES.map((b) => (
              <span
                key={b.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${b.color}`}
              >
                {b.label}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Fabricación, Montaje y{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFD600, #FF7B00, #E53E2A)' }}
            >
              Mantenimiento
            </span>{' '}
            de Parques Infantiles de Interior
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl">
            Especialistas en centros de ocio, ludotecas, restaurantes y centros comerciales
            de <strong className="text-white">toda España</strong>. Calidad, seguridad y
            diversión en cada proyecto.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-gray-900 bg-gradient-to-r from-[#FFD600] to-[#FF7B00] shadow-xl shadow-yellow-500/30 hover:scale-105 hover:shadow-yellow-500/50 transition-all duration-200"
            >
              <Eye className="w-5 h-5" />
              Ver Trabajos
            </a>
            <a
              href="https://wa.me/34604222268?text=Hola!%20Me%20gustaría%20pedir%20presupuesto%20para%20un%20parque%20infantil."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white border-2 border-white/40 backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { value: '100%', label: 'Materiales Homologados' },
              { value: '24/7', label: 'Soporte Técnico' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-blue-200 mt-1 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — hero image, 6/12 cols */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-full">
            {/* Halo de luz por detrás — hermano del wrapper, sin overflow-hidden que lo recorte */}
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-3xl blur-2xl opacity-80 z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, #E53E2A, #FF7B00, #FFD600, #22C55E, #00C4CC, #2563EB, #C026D3)',
              }}
            />
            {/* Wrapper de imagen — overflow-hidden solo para redondear esquinas */}
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl shadow-black/40 min-h-[420px] md:min-h-[500px] lg:min-h-[540px]">
              <img
                src={heroImage}
                alt="Parque infantil de interior montado por ICONICPARKS"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            {/* Floating badge bottom-left */}
            <div className="absolute bottom-3 left-3 lg:-bottom-1 lg:-left-6 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs font-bold text-gray-900">Fabricado en España</p>
                <p className="text-xs text-gray-500">Materiales certificados</p>
              </div>
            </div>
            {/* Floating badge top-right */}
            <div className="absolute top-3 right-3 lg:-top-4 lg:-right-6 z-20 bg-gradient-to-br from-[#FFD600] to-[#FF7B00] rounded-2xl shadow-xl px-4 py-3">
              <p className="text-xs font-extrabold text-gray-900">🇪🇸 Nacional</p>
              <p className="text-xs text-gray-700">Toda España</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 40C1200 80 720 0 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
