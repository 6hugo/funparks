import { Hammer, Shield, Wrench, MoveRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Hammer,
    title: 'Fabricación y Montaje',
    description:
      'Diseñamos y montamos parques infantiles de interior desde cero: estructuras, toboganes, fosos de bolas, tirolinas y mucho más. Adaptados a tu espacio.',
    accent: '#E53E2A',
    bg: 'from-red-50 to-orange-50',
    border: 'border-red-200',
    shadow: 'hover:shadow-red-200',
    iconBg: 'bg-gradient-to-br from-[#E53E2A] to-[#FF7B00]',
  },
  {
    icon: Shield,
    title: 'Mantenimiento Preventivo',
    description:
      'Revisiones periódicas de seguridad para garantizar el cumplimiento de normativas europeas y el correcto estado de todos los elementos del parque.',
    accent: '#22C55E',
    bg: 'from-green-50 to-teal-50',
    border: 'border-green-200',
    shadow: 'hover:shadow-green-200',
    iconBg: 'bg-gradient-to-br from-[#22C55E] to-[#00C4CC]',
  },
  {
    icon: Wrench,
    title: 'Reformas y Renovación',
    description:
      'Renovamos y reparamos elementos desgastados: coquillas, redes, toboganes, suelos y estructuras. Damos nueva vida a tu parque con materiales de primera.',
    accent: '#2563EB',
    bg: 'from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    shadow: 'hover:shadow-blue-200',
    iconBg: 'bg-gradient-to-br from-[#2563EB] to-[#00C4CC]',
  },
  {
    icon: MoveRight,
    title: 'Desmontaje y Reubicación',
    description:
      'Desmontamos tu parque actual con cuidado y lo reubicamos en un nuevo espacio, conservando todos los elementos en perfecto estado.',
    accent: '#C026D3',
    bg: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    shadow: 'hover:shadow-purple-200',
    iconBg: 'bg-gradient-to-br from-[#C026D3] to-[#FF7B00]',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#E53E2A] to-[#FF7B00] text-white mb-4 shadow-lg shadow-orange-200">
            ¿Qué Hacemos?
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Nuestros{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #E53E2A, #FF7B00, #FFD600)' }}
            >
              Servicios
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Todo lo que tu parque infantil necesita: desde el diseño inicial hasta el
            mantenimiento continuo, cubrimos cada etapa con profesionalidad.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className={`group relative overflow-hidden bg-gradient-to-br ${s.bg} border ${s.border} rounded-3xl p-6 shadow-md ${s.shadow} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-extrabold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
