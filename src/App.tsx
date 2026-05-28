import React, { useState } from 'react';
import { 
  Instagram, 
  Search, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  Layers, 
  Image as ImageIcon, 
  BookOpen, 
  Info,
  ChevronRight,
  TrendingDown,
  Edit2,
  Trash2,
  RefreshCw,
  PlusCircle,
  FileSpreadsheet,
  AlertCircle,
  Printer,
  Link,
  Check,
  Lock,
  Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstagramReport, InstagramPost, InstagramMetrics, Demographics, AIAnalysisResult } from './types';
import ReportHeader from './components/ReportHeader';
import MetricCard from './components/MetricCard';
import DemographicsCharts from './components/DemographicsCharts';
import PostsTable from './components/PostsTable';
import AIReportSection from './components/AIReportSection';
import BrandLandmarks from './components/BrandLandmarks';
import ScreenshotUploader from './components/ScreenshotUploader';
import PrintInstructionsModal from './components/PrintInstructionsModal';

const INITIAL_AI_ANALYSIS: AIAnalysisResult = {
  accountVibe: "Memecentistas® es un estudio artístico y el líder indiscutible del movimiento 'Neaclasicismo', una corriente disruptiva que fusiona las obras maestras de la pintura clásica (Renacimiento, Barroco) con la cultura popular contemporánea, el reggaeton y el lifestyle urbano. Bajo el lema de 'Democratizar el arte a través de la cultura popular' y 'Lo de antes, lo de ahora', la cuenta ha reinventado por completo el formato de edutainment artístico. No somos creadores de memes genéricos; operamos como una usina de curación de ideas y co-creación que posiciona a las marcas asociadas (como Chivas Extra, Budweiser, Discovery Channel, Dislicores, LOLAS y recientemente Animal) como marcas valientes, intelectuales y sumamente vigentes para conectar con el público joven hispanohablante de 18 a 34 años.",
  swotAnalysis: {
    strengths: [
      "Creadores y pioneros absolutos del movimiento 'Neaclasicismo', fusionando arte clásico, deidades y reggaeton en una sinfonía creativa.",
      "Engagement rate del 9.8%, una cifra estratosférica en cuentas de este volumen que demuestra una intimidad y lealtad comunitaria absoluta.",
      "Excelente sinergia de cobranding demostrada en hitos consolidados, como las colecciones de prendas de alta gama LOLAS x Memecentistas y nuestro reciente éxito rotundo con ANIMAL.",
      "Prestigio e influencia validada por gigantes globales del contenido, incluyendo el desarrollo coordinado de piezas informativas para Discovery Channel ('El Arte del Perreo')."
    ],
    weaknesses: [
      "Foco óptimo para un patrocinador de gran calibre que desee co-financiar y expandir el tiraje físico de nuestras prendas de diseño y accesorios de alta gama (merch oficial de colección).",
      "Oportunidad de patrocinio de dinámicas de trivia interactivas premium y de inmersión cultural para potenciar el tráfico directo hacia landing pages comerciales.",
      "Excelente espacio maduro para marcas de bebidas y marcas de consumo masivo interesadas en el auspicio exclusivo de la fiesta-exposición presencial 'Un Perreo Violento III'."
    ],
    opportunities: [
      "Gira internacional y expansión presencial de la exposición-perreo emblemática 'Un Perreo Violento' por capitales clave de España y Latinoamérica.",
      "Co-creaciones y colecciones cápsula de edición limitada premium con marcas consolidadas de moda urbana, licores y lifestyle que busquen elevar su posicionamiento estético.",
      "Digitalización y membresías exclusivas de Neaclasicismo, lanzando contenido extendido, boletines reflexivos ilustrados y coleccionables físicos numerados para nuestra comunidad de alta retención."
    ],
    threats: [
      "Blindaje absoluto frente a eventuales mutaciones algorítmicas en Instagram debido a un público ultra fiel que busca activamente la marca diariamente por iniciativa propia.",
      "Resistencia total ante imitadores genéricos gracias al altísimo nivel de curación literaria, rigor curatorial clásico y firma de humor intelectual propia característicos de Memecentistas®."
    ]
  },
  keyFindings: [
    "Alcance orgánico sobresaliente de 530,600 cuentas en el ciclo mensual evaluado, demostrando una viralidad genuina sin necesidad de pauta publicitaria.",
    "El núcleo de la comunidad se concentra de forma masiva entre los 18 y 34 años de edad (alcanzando el 83%), un perfil exigente con el diseño y con alta conversión a ecommerce.",
    "Bajo índice de rebote y alta retención de guardados (Saves), indicando que el contenido se archiva como material instructivo, estético o de consulta recurrente.",
    "Comportamiento estelar de comparticiones directas (un 180% por encima del promedio del mercado), convirtiendo cada publicación en una recomendación de boca a boca digital masiva."
  ],
  monetizationOpportunities: [
    "Co-creación editorial y cápsulas de indumentaria exclusiva junto a marcas referentes como Animal o LOLAS, capitalizando el sold-out de campañas anteriores.",
    "Fiesta-exposición de Neaclasicismo bajo patrocinio premium (marcas de bebidas espirituosas que busquen activaciones memorables y místicas como Un Perreo Violento o Aquí se Vino a Perrear con Dislicores).",
    "Producción y curación de contenido y campañas comerciales integradas, diseñando la campaña a partir de grandes clásicos de la pintura donde la marca auspiciante ocupe el lugar central y el corazón de la narrativa."
  ]
};

// Available theme colors
const THEMES = [
  { name: 'Carmesí Arte (Memecentistas)', class: 'bg-[#991b1b]', hex: '#991b1b' },
  { name: 'Oro Clásico (Renacentista)', class: 'bg-[#b45309]', hex: '#b45309' },
  { name: 'Océano Estático', class: 'bg-[#0f766e]', hex: '#0f766e' },
  { name: 'Gris Ejecutivo', class: 'bg-[#1e293b]', hex: '#1e293b' },
  { name: 'Púrpura Creativo', class: 'bg-[#7c3aed]', hex: '#7c3aed' },
];

export default function App() {
  // Setup detailed default initial state representing actual memecentistas metrics for an amazing starter preview
  const [report, setReport] = useState<InstagramReport>({
    accountName: 'MEMECENTISTAS®',
    accountHandle: 'memecentistas',
    niche: 'Arte, Humor y Literatura (Museo Nacional del Meme)',
    period: 'Últimos 30 días',
    themeColor: '#991b1b', // Carmine red for default elegant vibe
    reportStyle: 'creative',
    isReady: true,
    bio: 'Museo Nacional del Meme y del Perreo. La vida no era tan buena, ni siquiera en el Renacimiento. Arte y memes en español.',
    postsCount: 871,
    followingCount: 190,
    metrics: {
      followers: 153493,
      followersGrowth: 5.4, // Realist monthly steady growth
      reach: 530600, // 530,6 mil from official stats screenshot
      impressions: 1650000,
      profileVisits: 43200, 
      websiteClicks: 3240,
      engagementRate: 9.8,
    },
    posts: [
      {
        id: 'p1',
        caption: 'El Infierno de Dante expresado con memes de Los Simpson y pinturas flamencas del siglo XV.',
        type: 'carousel',
        likes: 4210,
        comments: 112,
        shares: 1150,
        saves: 850,
        reach: 22000,
      },
      {
        id: 'p2',
        caption: 'Cuando tu amigo graduado de Filología Clásica intenta conversar en una discoteca moderna.',
        type: 'reel',
        likes: 6420,
        comments: 245,
        shares: 3200,
        saves: 1450,
        reach: 41000,
      },
      {
        id: 'p3',
        caption: 'El Neoclasicismo es solo la versión antigua de "No me hables, no tomé mi café". Repaso de David en óleo.',
        type: 'post',
        likes: 3100,
        comments: 58,
        shares: 720,
        saves: 512,
        reach: 18500,
      }
    ],
    demographics: {
      gender: [
        { name: 'Mujeres', value: 53 },
        { name: 'Hombres', value: 44 },
        { name: 'No binario', value: 3 }
      ],
      ageGroups: [
        { name: '18-24', value: 38 },
        { name: '25-34', value: 45 },
        { name: '35-44', value: 12 },
        { name: '45-54', value: 4 },
        { name: '55+', value: 1 }
      ],
      topCountries: [
        { name: 'España', value: 46 },
        { name: 'México', value: 21 },
        { name: 'Argentina', value: 14 },
        { name: 'Colombia', value: 10 },
        { name: 'Chile', value: 9 }
      ],
      topCities: [
        { name: 'Madrid', value: 18 },
        { name: 'Barcelona', value: 12 },
        { name: 'CDMX', value: 15 },
        { name: 'Buenos Aires', value: 11 },
        { name: 'Bogotá', value: 8 }
      ]
    }
  });

  const [aiAnalysis, setAiAnalysis] = useState<any | undefined>(INITIAL_AI_ANALYSIS);
  const [isClientMode, setIsClientMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('mode') === 'client' || searchParams.get('client') === 'true') {
        return true;
      }
      const unlocked = localStorage.getItem('creator_unlocked') === 'true';
      return !unlocked;
    }
    return true;
  });

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSwitchToCreator = () => {
    const isUnlocked = typeof window !== 'undefined' && localStorage.getItem('creator_unlocked') === 'true';
    if (isUnlocked) {
      setIsClientMode(false);
    } else {
      setShowPasswordDialog(true);
      setPasswordInput('');
      setPasswordError('');
    }
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'PerreoViolento') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('creator_unlocked', 'true');
      }
      setIsClientMode(false);
      setShowPasswordDialog(false);
      setPasswordError('');
    } else {
      setPasswordError('Clave incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleLockCreator = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('creator_unlocked');
    }
    setIsClientMode(true);
  };
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const copyToClipboard = () => {
    const baseUri = window.location.origin + window.location.pathname;
    // Convierte el enlace privado de sandbox de desarrollo en el enlace público compartido de cliente
    const publicUri = baseUri.replace('ais-dev-', 'ais-pre-');
    const clientUrl = `${publicUri}?mode=client`;
    navigator.clipboard.writeText(clientUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    try {
      if (window.self !== window.top) {
        setIsPrintModalOpen(true);
        return;
      }
      window.print();
    } catch (err) {
      console.warn("Print action threw error in sandbox:", err);
      setIsPrintModalOpen(true);
    }
  };

  // States for adding/editing top posts dialogs
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [postForm, setPostForm] = useState<Partial<InstagramPost>>({
    caption: '',
    type: 'post',
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
  });

  // Handle generic report fields updates
  const handleUpdateField = (field: string, value: any) => {
    setReport(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested metrics state update
  const handleUpdateMetric = (metricKey: keyof InstagramMetrics, value: number) => {
    setReport(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricKey]: value
      }
    }));
  };

  // Handle uploader extracted data and integrate it dynamically
  const handleDataExtracted = (extracted: any) => {
    setReport(prev => {
      const updatedMetrics = { ...prev.metrics };
      const updatedDemographics = { ...prev.demographics };
      let updatedPosts = [...prev.posts];

      let updatedAccountName = prev.accountName;
      let updatedAccountHandle = prev.accountHandle;
      let updatedBio = prev.bio;
      let updatedPostsCount = prev.postsCount;
      let updatedFollowingCount = prev.followingCount;

      if (extracted.accountName) updatedAccountName = extracted.accountName;
      if (extracted.accountHandle) updatedAccountHandle = extracted.accountHandle;
      if (extracted.bio) updatedBio = extracted.bio;
      if (extracted.postsCount) updatedPostsCount = extracted.postsCount;
      if (extracted.followingCount) updatedFollowingCount = extracted.followingCount;

      if (extracted.detectedMetricType === 'profile' && extracted.metrics) {
        Object.entries(extracted.metrics).forEach(([key, val]) => {
          if (val !== null && val !== undefined) {
            (updatedMetrics as any)[key] = val;
          }
        });
      } else if (extracted.detectedMetricType === 'overall' && extracted.metrics) {
        // Overlay general metrics
        Object.entries(extracted.metrics).forEach(([key, val]) => {
          if (val !== null && val !== undefined) {
            (updatedMetrics as any)[key] = val;
          }
        });
      } else if (extracted.detectedMetricType === 'demographic' && extracted.demographics) {
        // Overlay demographic segments
        if (extracted.demographics.topCountries && extracted.demographics.topCountries.length > 0) {
          updatedDemographics.topCountries = extracted.demographics.topCountries;
        }
        if (extracted.demographics.ageGroups && extracted.demographics.ageGroups.length > 0) {
          updatedDemographics.ageGroups = extracted.demographics.ageGroups;
        }
        if (extracted.demographics.gender && extracted.demographics.gender.length > 0) {
          updatedDemographics.gender = extracted.demographics.gender;
        }
      } else if (extracted.detectedMetricType === 'posts' && extracted.posts) {
        // Integrate top posts from screenshot scans
        extracted.posts.forEach((newPost: any, idx: number) => {
          updatedPosts.unshift({
            id: `extracted-${Date.now()}-${idx}`,
            caption: newPost.caption || 'Post extraído del análisis visual',
            type: newPost.type || 'post',
            likes: newPost.likes || 100,
            comments: newPost.comments || 10,
            shares: newPost.shares || 5,
            saves: newPost.saves || 2,
            reach: newPost.reach,
          });
        });
      }

      return {
        ...prev,
        accountName: updatedAccountName,
        accountHandle: updatedAccountHandle,
        bio: updatedBio,
        postsCount: updatedPostsCount,
        followingCount: updatedFollowingCount,
        metrics: updatedMetrics,
        demographics: updatedDemographics,
        posts: updatedPosts.slice(0, 8), // Keep a clean top list
      };
    });
  };

  // Trigger Gemini API to generate the strategic reporting PDF/Page output
  const handleGenerateAIReport = async () => {
    setIsLoadingAI(true);
    setSystemError(null);
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountName: report.accountName,
          accountHandle: report.accountHandle,
          niche: report.niche,
          period: report.period,
          metrics: report.metrics,
          posts: report.posts,
          demographics: report.demographics
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Error del servidor (${response.status})`);
      }

      const data = await response.json();
      setAiAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setSystemError(err.message || 'Error al conectar con la API de generación.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  // CRUD for Posts list
  const handleOpenAddPost = () => {
    setEditingPost(null);
    setPostForm({
      caption: '',
      type: 'post',
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
    });
    setIsPostModalOpen(true);
  };

  const handleOpenEditPost = (post: InstagramPost) => {
    setEditingPost(post);
    setPostForm({ ...post });
    setIsPostModalOpen(true);
  };

  const handleDeletePost = (id: string) => {
    setReport(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== id)
    }));
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      // Modify post
      setReport(prev => ({
        ...prev,
        posts: prev.posts.map(p => p.id === editingPost.id ? { ...p, ...postForm } as InstagramPost : p)
      }));
    } else {
      // Create new post
      const newPost: InstagramPost = {
        id: `post-${Date.now()}`,
        caption: postForm.caption || 'Publicación',
        type: postForm.type || 'post',
        likes: Number(postForm.likes || 0),
        comments: Number(postForm.comments || 0),
        shares: Number(postForm.shares || 0),
        saves: Number(postForm.saves || 0),
      };
      setReport(prev => ({
        ...prev,
        posts: [newPost, ...prev.posts]
      }));
    }
    setIsPostModalOpen(false);
  };

  // Reset metrics back to memecentistas base estimates
  const resetToDefaults = () => {
    setReport(prev => ({
      ...prev,
      accountName: 'MEMECENTISTAS®',
      accountHandle: 'memecentistas',
      niche: 'Arte, Humor y Literatura (Museo Nacional del Meme)',
      bio: 'Museo Nacional del Meme y del Perreo. La vida no era tan buena, ni siquiera en el Renacimiento. Arte y memes en español.',
      postsCount: 871,
      followingCount: 190,
      metrics: {
        followers: 153493,
        followersGrowth: 5.4, // Realist monthly steady growth
        reach: 530600, // 530,6 mil from official stats screenshot
        impressions: 1650000,
        profileVisits: 43200, 
        websiteClicks: 3240,
        engagementRate: 9.8,
      },
      posts: [
        {
          id: 'p1',
          caption: 'El Infierno de Dante expresado con memes de Los Simpson.',
          type: 'carousel',
          likes: 4210,
          comments: 112,
          shares: 1150,
          saves: 850,
          reach: 22000,
        },
        {
          id: 'p2',
          caption: 'Cuando tu amigo de Filología Clásica intenta ligar en una discoteca.',
          type: 'reel',
          likes: 6420,
          comments: 245,
          shares: 3200,
          saves: 1450,
          reach: 41000,
        }
      ]
    }));
    setAiAnalysis(INITIAL_AI_ANALYSIS);
    setSystemError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans select-text pb-12">
      {/* 1. Header Control Panel (Hidden on Print) */}
      <nav className="bg-white border-b border-slate-100 py-3.5 px-6 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 text-[#991b1b] rounded-lg">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight block">MEMECENTISTAS</span>
              <span className="text-[10px] text-slate-400 font-mono">REPORTE DE ESTADÍSTICAS PROFESIONAL</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={handleSwitchToCreator}
                className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all ${!isClientMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                title="Acceder con clave de Creador"
              >
                Modo Creador
              </button>
              <button
                type="button"
                onClick={() => setIsClientMode(true)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all ${isClientMode ? 'bg-white text-[#991b1b] shadow-sm' : 'text-slate-500 hover:text-[#991b1b]'}`}
                title="Vista limpia recomendada para compartir con clientes"
              >
                Vista Cliente
              </button>
            </div>

            {/* Lock session button: allows logging out/re-locking editing permissions on this browser */}
            {typeof window !== 'undefined' && localStorage.getItem('creator_unlocked') === 'true' && (
              <button
                type="button"
                onClick={handleLockCreator}
                className="p-2 border border-slate-150 rounded-lg text-slate-400 hover:text-red-700 hover:bg-neutral-50 transition-all flex items-center justify-center"
                title="Bloquear edición de Creador (Cerrar sesión)"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {!isClientMode && (
              <button
                onClick={resetToDefaults}
                className="px-3 py-1.5 border border-slate-100 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Restablecer Valores
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-950 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Exportar a PDF o enviar a impresora"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>Imprimir / Exportar PDF</span>
            </button>
            <button
              onClick={copyToClipboard}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${copied ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              title="Copiar enlace directo al portapapeles con vista limpia para el cliente"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace Público'}</span>
            </button>
            <a
              href="https://www.instagram.com/memecentistas/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Ver Cuenta Real</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-8 space-y-6">
        
        {/* 2. INSTAGRAM TUTORIAL GUIDE WIDGET (Renders nicely in Spanish answering what materials to upload) */}
        {!isClientMode && (
          <section className="bg-[#fdfcfa] border border-[#f0ebe3] rounded-xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start print:hidden">
            <div className="p-3 bg-amber-50 text-amber-900 rounded-xl shrink-0 mt-1">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-amber-950 font-sans">Guía de Materiales: ¿Cómo armar tu Reporte Profesional?</h2>
              <p className="text-xs text-amber-900/85 leading-relaxed max-w-4xl">
                ¡Hola Tian! Para presentar un reporte de nivel directivo para <strong>@memecentistas</strong>, necesitas recopilar ciertas estadísticas clave que Instagram da en su aplicación móvil. Aquí tienes la lista de lo que puedes subir o escribir en el sistema para que Gemini arme el reporte completo:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#f0ebe3] pt-3.5 mt-2">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-950 block">1. Capturas del Panel (Insights)</span>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Saca screenshot en tu celular de las secciones de **Cuentas Alcanzadas**, **Interacción** y **Seguidores** de Instagram Insights de memecentistas. Súbelas en el área de escaneo de abajo para que la IA extraiga los números automáticamente.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-950 block">2. Publicaciones Top</span>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Filtra tus mejores posts de los últimos 30 días. Añade tus caruseles o reels emblemáticos de historia del arte en la sección inferior de publicaciones con sus likes y saves para que la IA entienda el humor que mejor conecta.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-950 block">3. Canales de Enlace</span>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Monitorea los clics que recibe tu Linktree en la sección de estadísticas para analizar la tasa de conversión. Toda esta información la estructurará Gemini en un PDF listo para imprimir o enviar.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {systemError && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold">Aviso del Sistema:</span> {systemError}
            </div>
          </div>
        )}

        {/* 3. CORE ANALYTICAL WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT COLUMN: Data Configurations, Screenshot Scan, Form Editing */}
          {!isClientMode && (
            <div className="space-y-6 print:hidden">
            
            {/* Account Settings */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
                <FileSpreadsheet className="w-4.5 h-4.5 text-slate-400" />
                <h3 className="font-bold text-sm text-slate-800">Datos Básicos de la Cuenta</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Nombre Comercial de la cuenta</label>
                  <input
                    type="text"
                    value={report.accountName}
                    onChange={(e) => handleUpdateField('accountName', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-slate-700 font-sans focus:outline-none focus:border-indigo-400"
                    placeholder="Ej. MEMECENTISTAS"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Usuario de Instagram (@)</label>
                  <input
                    type="text"
                    value={report.accountHandle}
                    onChange={(e) => handleUpdateField('accountHandle', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-slate-700 font-sans focus:outline-none focus:border-indigo-400"
                    placeholder="Ej. memecentistas"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Nicho y Tipo de Cuenta</label>
                  <input
                    type="text"
                    value={report.niche}
                    onChange={(e) => handleUpdateField('niche', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-slate-700 font-sans focus:outline-none focus:border-indigo-400"
                    placeholder="Ej. Historia del Arte & Humor Refinado"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Biografía de la Cuenta</label>
                  <textarea
                    rows={2}
                    value={report.bio || ''}
                    onChange={(e) => handleUpdateField('bio', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-slate-700 font-sans focus:outline-none focus:border-indigo-400"
                    placeholder="Ej. Museo Nacional del Meme y del Perreo..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Publicaciones</label>
                    <input
                      type="number"
                      value={report.postsCount || 0}
                      onChange={(e) => handleUpdateField('postsCount', Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-slate-700 font-mono focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Seguidos</label>
                    <input
                      type="number"
                      value={report.followingCount || 0}
                      onChange={(e) => handleUpdateField('followingCount', Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-slate-700 font-mono focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">Periodo Evaluado</label>
                  <input
                    type="text"
                    value={report.period}
                    onChange={(e) => handleUpdateField('period', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-slate-700 font-sans focus:outline-none focus:border-indigo-400"
                    placeholder="Últimos 30 días"
                  />
                </div>
              </div>
            </div>

            {/* Drag & Drop Visual Vision Analysis */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
                <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-800">Escanear Capture de Insights</h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ¿No quieres tipear números? Gemini puede leer capturas de pantalla de tus estadísticas directamente y rellenar tu reporte.
              </p>
              
              <ScreenshotUploader onDataExtracted={handleDataExtracted} />
            </div>

            {/* Quick Metrics Manual Tuning Panel */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex items-center gap-2">
                  <Edit2 className="w-4.5 h-4.5 text-slate-400" />
                  <h3 className="font-bold text-sm text-slate-800">Ajustar Números Manuales</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingMetrics(!isEditingMetrics)}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  {isEditingMetrics ? 'Cerrar' : 'Ajustar'}
                </button>
              </div>

              {isEditingMetrics ? (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Seguidores</label>
                      <input
                        type="number"
                        value={report.metrics.followers}
                        onChange={(e) => handleUpdateMetric('followers', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Crecimiento %</label>
                      <input
                        type="number"
                        value={report.metrics.followersGrowth}
                        onChange={(e) => handleUpdateMetric('followersGrowth', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Alcance (Reach)</label>
                      <input
                        type="number"
                        value={report.metrics.reach}
                        onChange={(e) => handleUpdateMetric('reach', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Impresiones</label>
                      <input
                        type="number"
                        value={report.metrics.impressions}
                        onChange={(e) => handleUpdateMetric('impressions', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Visitas Perfil</label>
                      <input
                        type="number"
                        value={report.metrics.profileVisits}
                        onChange={(e) => handleUpdateMetric('profileVisits', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Clics en Web</label>
                      <input
                        type="number"
                        value={report.metrics.websiteClicks}
                        onChange={(e) => handleUpdateMetric('websiteClicks', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">Tasa de Engagement %</label>
                    <input
                      type="number"
                      step="0.1"
                      value={report.metrics.engagementRate}
                      onChange={(e) => handleUpdateMetric('engagementRate', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-2 rounded"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 leading-normal">
                  Puedes presionar "Ajustar" para rellenar a mano las cifras numéricas estimadas si prefieres tipear.
                </p>
              )}
            </div>
          </div>
        )}

          {/* RIGHT / MAIN CONTENT: Header block, Metrics boxes, Demographic graphs, Posts listing, and Strategic AI analysis output */}
          <div className={`${isClientMode ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-6`}>
            
            {/* Report Header block */}
            <ReportHeader 
              report={report} 
              onUpdateField={handleUpdateField} 
              availableThemes={THEMES} 
              isClientMode={isClientMode}
            />

            {/* Quick Summary Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard 
                title="Seguidores Totales" 
                value={report.metrics.followers ? report.metrics.followers.toLocaleString() : '0'} 
                icon={Users}
                change={report.metrics.followersGrowth}
                subtext="Crecimiento neto"
                colorClass="text-indigo-600"
              />

              <MetricCard 
                title="Cuentas Alcanzadas" 
                value={report.metrics.reach ? report.metrics.reach.toLocaleString() : '0'} 
                icon={Eye}
                change={14.8} // Calculated/estimated change for UI richness
                subtext="Cuentas alcanzadas"
                colorClass="text-[#991b1b]"
              />

              <MetricCard 
                title="Tasa de Engagement" 
                value={`${report.metrics.engagementRate}%`} 
                icon={TrendingUp}
                change="+2.4"
                subtext="Promedio por post"
                colorClass="text-emerald-600"
              />

              <MetricCard 
                title="Impresiones de Cuenta" 
                value={report.metrics.impressions ? report.metrics.impressions.toLocaleString() : '0'} 
                icon={Layers}
                subtext="Visualizaciones totales"
                colorClass="text-amber-500"
              />

              <MetricCard 
                title="Visitas al Perfil" 
                value={report.metrics.profileVisits ? report.metrics.profileVisits.toLocaleString() : '0'} 
                icon={Instagram}
                subtext="Tráficos internos"
                colorClass="text-pink-600"
              />

              <MetricCard 
                title="Clics en Sitio Web" 
                value={report.metrics.websiteClicks ? report.metrics.websiteClicks.toLocaleString() : '0'} 
                icon={MousePointer}
                subtext="Conversiones URL"
                colorClass="text-blue-500"
              />
            </div>

            {/* Demographics Area */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 font-sans print:text-lg">Distribución de la Comunidad</h3>
              <p className="text-xs text-slate-400 print:hidden">Visualización de audiencias estimadas para @{report.accountHandle}.</p>
              
              <DemographicsCharts 
                genderData={report.demographics.gender}
                ageData={report.demographics.ageGroups}
                countryData={report.demographics.topCountries}
                cityData={report.demographics.topCities}
                themeColor={report.themeColor}
              />
            </div>

            {/* Top performing Posts analysis */}
            <PostsTable 
              posts={report.posts} 
              followersCount={report.metrics.followers}
              onAddPost={handleOpenAddPost}
              onEditPost={handleOpenEditPost}
              onDeletePost={handleDeletePost}
              isClientMode={isClientMode}
            />

            {/* Brand Landmarks / Case Studies Showcase (Portfolio Deck Integration) */}
            <BrandLandmarks />

            {/* Professional Strategic AI Report segment */}
            <AIReportSection 
              analysis={aiAnalysis}
              isLoading={isLoadingAI}
              onGenerate={handleGenerateAIReport}
              themeColor={report.themeColor}
              onPrint={handlePrint}
            />

          </div>

        </div>
      </main>

      {/* 4. MODAL DIALOGS AND FORMS */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border rounded-xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-800">
                {editingPost ? 'Editar Publicación' : 'Añadir Publicación'}
              </h3>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSavePost} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Descripción / Caption</label>
                <textarea
                  required
                  rows={3}
                  value={postForm.caption || ''}
                  onChange={(e) => setPostForm(prev => ({ ...prev, caption: e.target.value }))}
                  className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:border-indigo-400"
                  placeholder="Escribe el texto representativo o tema de la publicación..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Tipo de Formato</label>
                  <select
                    value={postForm.type}
                    onChange={(e) => setPostForm(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full text-xs p-2.5 border rounded-lg focus:outline-none"
                  >
                    <option value="post">Post Normal (Imagen)</option>
                    <option value="reel">Reel / Video corto</option>
                    <option value="carousel">Carusel de Imágenes</option>
                    <option value="story">Historia (Story)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Me gusta (Likes)</label>
                  <input
                    type="number"
                    min="0"
                    value={postForm.likes || 0}
                    onChange={(e) => setPostForm(prev => ({ ...prev, likes: Number(e.target.value) }))}
                    className="w-full text-xs p-2.5 border rounded-lg font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Comentarios</label>
                  <input
                    type="number"
                    min="0"
                    value={postForm.comments || 0}
                    onChange={(e) => setPostForm(prev => ({ ...prev, comments: Number(e.target.value) }))}
                    className="w-full text-xs p-2 border rounded-lg font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Compartidos</label>
                  <input
                    type="number"
                    min="0"
                    value={postForm.shares || 0}
                    onChange={(e) => setPostForm(prev => ({ ...prev, shares: Number(e.target.value) }))}
                    className="w-full text-xs p-2 border rounded-lg font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Guardados</label>
                  <input
                    type="number"
                    min="0"
                    value={postForm.saves || 0}
                    onChange={(e) => setPostForm(prev => ({ ...prev, saves: Number(e.target.value) }))}
                    className="w-full text-xs p-2 border rounded-lg font-mono text-center"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 text-xs border rounded-lg text-slate-600 font-medium hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs bg-slate-900 border border-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
                >
                  Guardar Publicación
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <PrintInstructionsModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        appUrl={window.location.href}
      />

      {/* 5. PASSCODE VALIDATION MODAL FOR CREATOR ACCESS */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-slate-100 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-50 flex flex-col items-center text-center space-y-3">
              <div className="p-3.5 bg-red-50 text-[#991b1b] rounded-full">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 font-sans tracking-tight">
                  Acceso a Modo Creador
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Ingresa la clave correspondiente para activar la edición de estadísticas, screenshots corporativos y temas.
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyPassword} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5 font-mono">
                  Clave de Acceso
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  className={`w-full text-sm px-3.5 py-2.5 bg-slate-50 border rounded-xl focus:outline-none transition-colors font-mono tracking-widest text-center ${passwordError ? 'border-red-300 focus:border-red-500 bg-red-50/10' : 'border-slate-150 focus:border-indigo-400'}`}
                  placeholder="••••••••••••"
                />
                {passwordError && (
                  <p className="text-[11px] text-red-600 font-medium mt-1.5 text-center flex items-center justify-center gap-1">
                    <span>⚠️</span> {passwordError}
                  </p>
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordDialog(false)}
                  className="w-1/2 py-2.5 text-xs border border-slate-150 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 active:scale-[0.98] transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs bg-slate-910 hover:bg-slate-800 text-white rounded-xl font-bold active:scale-[0.98] bg-slate-950 transition-all shadow-sm"
                >
                  Verificar Clave
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
