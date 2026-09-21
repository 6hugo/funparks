export interface Material {
  id: string
  emoji: string
  name: string
  desc: string
  badge: string
  detail: string
  color: string
  image_url?: string
}

export interface Project {
  id: string
  src: string
  alt: string
  instagramUrl: string
  span: string
}

export const DEFAULT_MATERIALS: Material[] = [
  {
    id: 'm1',
    emoji: '🛡️',
    name: 'Coquillas Protectoras (OK-pack® Play)',
    desc: 'Tubo de espuma LDPE de 248 cm y 17 mm de grosor para protección tubular. Cumple EN 71-3 y resistencia al fuego UNE EN 13501-1.',
    badge: 'Certificado EN 71-3',
    detail: '248 cm longitud • 17 mm grosor • LDPE',
    color: '#FF7800',
    image_url: '/materials/coquillas.jpg',
  },
  {
    id: 'm2',
    emoji: '🔗',
    name: 'Bridas de Seguridad Serie PE',
    desc: 'Bridas de nylon Poliamida 6.6 de cabeza plana anti-enganches y dentado exterior. Resistencia a tracción de 445 N con protección UV.',
    badge: 'Resistencia 445 N',
    detail: 'Poliamida 6.6 • 445 N tracción • Protección UV',
    color: '#FFD600',
    image_url: '/materials/bridas.jpg',
  },
  {
    id: 'm3',
    emoji: '🎪',
    name: 'Lona de PVC Reforzada (610 g/m²)',
    desc: 'Tejido poliéster 1000D con PVC de 610 gsm. Alta resistencia mecánica, lavable e ignífuga según ISO 3795 y EN 1176.',
    badge: 'Certificado EN 1176',
    detail: 'Poliéster 1000D • 610 gsm • ISO 3795',
    color: '#00C4CC',
    image_url: '/materials/lona.jpg',
  },
  {
    id: 'm4',
    emoji: '⚽',
    name: 'Bolas de Piscina Homologadas',
    desc: 'Bolas de 85 mm (20 g) en polietileno alimentario soplado. Sin rebabas, reciclables y aptas para desinfección continua.',
    badge: 'PE Alimentario',
    detail: 'Ø 85 mm • 20 g • Polietileno soplado',
    color: '#E53E2A',
    image_url: '/materials/bolas.jpg',
  },
  {
    id: 'm5',
    emoji: '🧩',
    name: 'Tatami Puzle Suelo EVA',
    desc: 'Pavimento modular amortiguador de 100x100 cm. Homologado bajo normativas UNE-EN 1177 y EN 71.',
    badge: 'Certificado UNE-EN 1177',
    detail: '100×100 cm • Amortiguación UNE-EN 1177',
    color: '#22C55E',
    image_url: '/materials/tatami.jpg',
  },
  {
    id: 'm6',
    emoji: '🛝',
    name: 'Toboganes Rotomoldeados HDPE',
    desc: 'Elemento de deslizamiento en polietileno de alta densidad. Certificado oficial ACCM conforme a UNE-EN 1176-1 y 1176-3.',
    badge: 'Certificado ACCM',
    detail: 'HDPE rotomoldeado • UNE-EN 1176-1/1176-3',
    color: '#2563EB',
    image_url: '/materials/tobogan.jpg',
  },
  {
    id: 'm7',
    emoji: '🏗️',
    name: 'Estructura Galvanizada y Conectores',
    desc: 'Tubos redondos de acero galvanizado (48x1.5 mm, EN 10305-3) con conectores de fundición certificados por TÜV.',
    badge: 'Certificado TÜV',
    detail: '48×1,5 mm • EN 10305-3 • Conectores TÜV',
    color: '#C026D3',
    image_url: '/materials/conectores.jpg',
  },
]


export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p1',
    src: '/images/parque1.jpeg',
    alt: 'Parque de escalada y redes colorido',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: 'lg:col-span-2',
  },
  {
    id: 'p2',
    src: '/images/parque2.jpeg',
    alt: 'Parque de bolas turquesa',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
  {
    id: 'p3',
    src: '/images/parque1(1).jpeg',
    alt: 'Detalle de estructura parque interior',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
  {
    id: 'p4',
    src: '/images/parque2(1).jpeg',
    alt: 'Vista general parque infantil',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
  {
    id: 'p5',
    src: '/images/parque1(2).jpeg',
    alt: 'Zona de juegos con tobogán',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
  {
    id: 'p6',
    src: '/images/parque2(2).jpeg',
    alt: 'Piscina de bolas azules',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: 'lg:col-span-2',
  },
  {
    id: 'p7',
    src: '/images/parque2(3).jpeg',
    alt: 'Parque bolas multicolor',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
  {
    id: 'p8',
    src: '/images/parque3.jpeg',
    alt: 'Parque completo terminado',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
  {
    id: 'p9',
    src: '/images/parque3(1).jpeg',
    alt: 'Interior parque infantil acabado',
    instagramUrl: 'https://instagram.com/iconicparks_',
    span: '',
  },
]
