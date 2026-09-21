import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/34604222268?text=Hola!%20Me%20interesa%20saber%20más%20sobre%20vuestros%20parques%20infantiles."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl text-white font-bold text-sm group transition-all duration-300 hover:scale-110 hover:pr-5"
      style={{
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        boxShadow: '0 8px 32px rgba(37,211,102,0.5)',
      }}
    >
      <MessageCircle className="w-6 h-6 flex-shrink-0" />
      <span className="hidden sm:block overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        ¡Escríbenos!
      </span>

      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ background: '#25D366' }}
      />
    </a>
  )
}
