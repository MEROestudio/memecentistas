import React from 'react';
import { Award, ExternalLink, Flame, Sparkles, MessageSquare, Shirt, Tv, Compass, ArrowUpRight } from 'lucide-react';

export default function BrandLandmarks() {
  const landmarks = [
    {
      id: 'animal',
      title: 'COLABORACIÓN ANIMAL x MEMECENTISTAS®',
      badge: 'Último Hito • Éxito Rotundo',
      type: 'fashion',
      description: 'Nuestra más reciente y exitosa colaboración de co-creación estética. Fusionamos la solemnidad del Barroco y Querubines clásicos con el lifestyle urbano contemporáneo de la mano de Animal, resultando en un rotundo éxtasis digital, miles de interacciones de alta calidad y un sold-out inmediato de la cápsula de vestuario premium.',
      highlights: ['Engagement de alta tasa', 'Sold-out instantáneo', 'Diseño de Neaclasicismo editorial'],
      icon: Flame,
      color: 'border-red-500/30 bg-red-50/20 text-red-700',
      badgeColor: 'bg-red-500/10 text-red-700 border-red-500/20',
      posts: [
        { url: 'https://www.instagram.com/p/DXIPr4lj8Tt/', label: 'Fase 1: Revelación' },
        { url: 'https://www.instagram.com/p/DXQEC_Aj7UX/?img_index=1', label: 'Fase 2: Colección' },
        { url: 'https://www.instagram.com/p/DXXR2y3kgc4/', label: 'Fase 3: Éxito Rotundo' }
      ]
    },
    {
      id: 'perreo-violento',
      title: 'UN PERREO VIOLENTO I & II (Exposición-Fiesta)',
      badge: 'Exposición Híbrida Presencial',
      type: 'event',
      description: 'Hito absoluto en el país: la primera exposición-perreo celebrada en el prestigioso sector histórico de "El Candelario". Fusión perfecta de 20 obras renacentistas/barrocas reinterpretadas con líricas de reggaeton costumbrista, coctelería premium de autor y el patrocinio de gigantes como Chivas Extra y Budweiser, convocando a más de 750 líderes de opinión y personas VIP de la moda y música.',
      highlights: ['750+ Asistentes VIP', 'Auspicios de Chivas & Budweiser', 'Marketing de guerrilla'],
      icon: Award,
      color: 'border-amber-500/30 bg-amber-50/10 text-amber-700',
      badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-500/20'
    },
    {
      id: 'discovery',
      title: 'DISCOVERY CHANNEL (El Arte del Perreo)',
      badge: 'Alianza de Contenido Global',
      type: 'content',
      description: 'Campaña de gran escala comisionada por Discovery Channel para el desarrollo de la serie informativa de 5 tomos "El Arte del Perreo". Una ventana reflexiva, erudita y de altísima fineza intelectual destinada a analizar cómo las analogías de la pintura clásica intersecan de forma brillante con los hábitos contemporáneos.',
      highlights: ['5 Video-Tomos producidos', 'Validación del movimiento artístico', 'Alcance corporativo internacional'],
      icon: Tv,
      color: 'border-blue-500/30 bg-blue-50/10 text-blue-700',
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    },
    {
      id: 'lqnias',
      title: 'COLECCIONES CÁPSULA: LQNIAS & LOLAS',
      badge: 'Alta Gama & Conciencia Social',
      type: 'commerce',
      description: 'La consolidación de nuestras obras en moda tangible: "LQNIAS" (Las que no iban a salir) y la alianza con LOLAS rindiendo homenaje al Día de la Mujer inspirado en la legendaria pintora barroca Artemisia Gentileschi. Prendas de colección que visten el empoderamiento femenino clásico con frases de la cultura popular urbana, disparando saves y compartidos de forma masiva.',
      highlights: ['Lienzos de Botticelli & Da Vinci', 'Alta conversión a Ecommerce', 'Identidad textil diferenciada'],
      icon: Shirt,
      color: 'border-indigo-500/30 bg-indigo-50/10 text-indigo-700',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20'
    },
    {
      id: 'quarentena',
      title: 'QUARENTENA con CLUB PERRO NEGRO',
      badge: 'Activación Digital Masiva',
      type: 'digital',
      description: 'Durante momentos complejos, levantamos un auténtico faro de diversión digital en colaboración con el mítico club Perro Negro y Tequila Centenario. Una fiesta transmitida en vivo de forma simultánea para más de 12,500 participantes conectados activamente desde sus hogares, creando una comunidad virtual sin precedentes impulsada por el Neaclasicismo.',
      highlights: ['12,500+ Espectadores concurrentes', 'Enlace directo con marcas líderes', 'Redefinición de eventos online'],
      icon: Compass,
      color: 'border-emerald-500/30 bg-emerald-50/10 text-emerald-700',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    }
  ];

  return (
    <section className="bg-white border border-slate-100 rounded-xl p-5 md:p-8 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
              Trayectoria de Co-Creación
            </span>
          </div>
          <h3 className="text-xl font-bold font-sans text-slate-900 tracking-tight">
            Ecos Perdurables: Casos de Éxito de Neaclasicismo®
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Demostración empírica de cómo nuestro estudio artístico colabora con marcas líderes de manera comercialmente asombrosa, fusionando el misticismo del arte clásico con el reggaeton y lifestyle contemporáneo.
          </p>
        </div>
        <div className="shrink-0 text-right pb-1">
          <span className="inline-block text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded-md">
            OBJETIVO: VENDER & POSICIONAR GRANDEZA
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
        
        {/* Landmark 1: Animal (Featured full width if spans, or just taking prime spot with custom style) */}
        {landmarks.map((item) => {
          const IconComponent = item.icon;
          const isFeatured = item.id === 'animal';

          return (
            <div 
              key={item.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md duration-200 ${
                isFeatured 
                  ? 'border-red-200 bg-gradient-to-br from-red-50/20 to-transparent lg:col-span-2' 
                  : 'border-slate-100 bg-white'
              }`}
            >
              <div className="space-y-4">
                {/* Header card info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isFeatured ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 font-sans tracking-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-sans mt-1">
                  {item.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.highlights.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`text-[10px] items-center inline-flex px-2 py-0.5 rounded-md font-sans ${
                        isFeatured 
                          ? 'bg-red-500/[0.04] text-red-800 border border-red-500/10' 
                          : 'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full mr-1.5 ${isFeatured ? 'bg-red-500' : 'bg-slate-400'}`}></span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instagram links if animal post */}
              {isFeatured && item.posts && (
                <div className="mt-4 pt-4 border-t border-red-100/60 bg-red-500/[0.02] p-3 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-700 font-sans">
                      Explorar campaña real en Instagram:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.posts.map((post, pIdx) => (
                      <a
                        key={pIdx}
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 bg-white border border-red-200 hover:border-red-400 text-red-700 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:shadow-xs active:scale-95 shrink-0"
                      >
                        <span>{post.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-red-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
      </div>

      {/* Brand Manifest Frame */}
      <div className="bg-[#fcfbf9] border border-[#f4f1ea] rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-4 justify-between mt-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-slate-950 text-white rounded-lg shrink-0 mt-0.5">
            <span className="font-mono text-xs font-bold font-serif leading-none">M</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest block text-amber-800 font-bold mb-0.5">Nuestro Lema & Manifiesto Artístico</span>
            <blockquote className="text-xs font-semibold text-slate-800 italic leading-relaxed">
              "Democratizar el arte a través de la cultura popular. Lo de antes, lo de ahora: el Neaclasicismo es una sinfonía donde el pasado y el presente convergen para otorgarle inmortalidad a las marcas."
            </blockquote>
          </div>
        </div>
        <div className="text-left md:text-right text-[10px] text-slate-400 font-mono shrink-0">
          MEMECENTISTAS® ESTUDIO ARTÍSTICO • © 2026
        </div>
      </div>
    </section>
  );
}
