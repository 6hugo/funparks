import { useState, type FormEvent } from 'react'
import { Phone, Mail, Share2, MessageCircle, Send, CheckCircle } from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Teléfono / WhatsApp',
    value: '604 222 268',
    href: 'https://wa.me/34604222268',
    color: '#25D366',
    bg: 'bg-green-50 border-green-200',
    iconBg: 'bg-gradient-to-br from-[#25D366] to-[#128C7E]',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'IconicParks@Hotmail.com',
    href: 'mailto:IconicParks@Hotmail.com',
    color: '#2563EB',
    bg: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-gradient-to-br from-[#2563EB] to-[#00C4CC]',
  },
  {
    icon: Share2,
    label: 'Instagram',
    value: '@iconicparks_',
    href: 'https://instagram.com/iconicparks_',
    color: '#C026D3',
    bg: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
  },
  {
    icon: null as unknown as typeof Share2,  // custom SVG rendered below
    label: 'TikTok',
    value: '@iconicparks',
    href: 'https://www.tiktok.com/@iconicparks?_r=1&_t=ZN-99tLqSkYzos',
    color: '#010101',
    bg: 'bg-gray-50 border-gray-200',
    iconBg: 'bg-gradient-to-br from-[#010101] to-[#2d2d2d]',
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Build WhatsApp message with form data
    const msg = `Hola! Soy ${form.name} y quiero pedir presupuesto sin compromiso.%0A%0A📍 Ciudad: ${form.city}%0A📞 Teléfono: ${form.phone}%0A📧 Email: ${form.email}%0A%0A💬 ${form.message}`
    window.open(`https://wa.me/34604222268?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  return (
    <section
      id="contacto"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1d4ed8 100%)',
      }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: '#FFD600' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#E53E2A' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#FFD600] to-[#FF7B00] text-gray-900 mb-4 shadow-lg shadow-yellow-500/30">
            ¡Sin Compromiso!
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Pide tu{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFD600, #FF7B00, #E53E2A)' }}
            >
              Presupuesto
            </span>
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Cuéntanos tu proyecto y te contactamos en menos de 24 horas con una propuesta
            personalizada y sin ningún compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact cards */}
          <div className="space-y-4">
            {CONTACT_INFO.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-5 rounded-2xl border bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-200`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {c.label === 'TikTok' ? (
                      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.19a8.16 8.16 0 0 0 4.77 1.52V7.26a4.85 4.85 0 0 1-1-.57z"/>
                      </svg>
                    ) : (
                      <Icon className="w-7 h-7 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-0.5">{c.label}</p>
                    <p className="text-white text-lg font-bold">{c.value}</p>
                  </div>
                </a>
              )
            })}

            {/* WhatsApp big button */}
            <a
              href="https://wa.me/34604222268?text=Hola!%20Quiero%20información%20sobre%20vuestros%20parques%20infantiles."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl hover:scale-105 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
              }}
            >
              <MessageCircle className="w-6 h-6" />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">¡Mensaje enviado!</h3>
                <p className="text-blue-200">Abrimos WhatsApp con tu información. Te responderemos en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-white mb-2">Formulario de Presupuesto</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1.5">
                      Nombre *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1.5">
                      Teléfono *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="600 000 000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1.5">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      placeholder="Madrid, Barcelona..."
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Cuéntanos tu proyecto
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tipo de negocio, metros cuadrados disponibles, servicios que necesitas..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-gray-900 text-lg shadow-xl hover:scale-105 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #FFD600, #FF7B00)',
                    boxShadow: '0 8px 24px rgba(255,123,0,0.35)',
                  }}
                >
                  <Send className="w-5 h-5" />
                  Solicitar Presupuesto Gratis
                </button>
                <p className="text-center text-blue-300 text-xs">
                  Al enviar, abriremos WhatsApp con tu información. Sin compromiso.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative mt-20 border-t border-white/10 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-sm">
            © 2025 ICONICPARKS · Fabricación y montaje de parques infantiles en España
          </p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/34604222268" target="_blank" rel="noopener noreferrer"
              className="text-blue-300 hover:text-green-400 transition-colors text-sm font-medium">
              WhatsApp
            </a>
            <a href="https://instagram.com/iconicparks_" target="_blank" rel="noopener noreferrer"
              className="text-blue-300 hover:text-pink-400 transition-colors text-sm font-medium">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@iconicparks?_r=1&_t=ZN-99tLqSkYzos" target="_blank" rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors text-sm font-medium">
              TikTok
            </a>
            <a href="mailto:IconicParks@Hotmail.com"
              className="text-blue-300 hover:text-blue-400 transition-colors text-sm font-medium">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
