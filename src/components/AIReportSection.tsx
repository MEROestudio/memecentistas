import React from 'react';
import { Sparkles, Eye, TrendingUp, DollarSign, Award, Download, Printer, ShieldAlert, Target, Heart, CheckCircle } from 'lucide-react';
import { AIAnalysisResult } from '../types';
import { motion } from 'motion/react';

interface AIReportSectionProps {
  analysis: AIAnalysisResult | undefined;
  isLoading: boolean;
  onGenerate: () => void;
  themeColor: string;
  onPrint?: () => void;
}

export default function AIReportSection({
  analysis,
  isLoading,
  onGenerate,
  themeColor,
  onPrint
}: AIReportSectionProps) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }
    
    try {
      if (window.self !== window.top) {
        console.warn("Iframe detected, prompt client view.");
        return;
      }
      window.print();
    } catch (err) {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center">
        <Sparkles className="w-10 h-10 text-blue-500 animate-pulse mb-4" />
        <h4 className="text-base font-semibold text-slate-800">Generando Reporte Estratégico AI...</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Gemini está analizando los números de tu cuenta, cruzando datos de alcance y desglosando un plan táctico de crecimiento para tu marca.
        </p>
        <div className="w-1/2 bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
          <div className="bg-blue-600 h-full animate-bar-loading" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-slate-900 text-white rounded-xl p-8 shadow-md text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="p-3 bg-white/10 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-amber-300 animate-spin-slow" />
        </div>
        <h4 className="text-lg font-bold font-sans">¿Listo para un Reporte Estratégico Profesional?</h4>
        <p className="text-xs text-slate-400 max-w-md mt-1 mb-6">
          Utilizaremos Gemini para redactar un análisis estratégico DAFO detallado, encontrar hallazgos estadísticos clave sobre tus mejores publicaciones y darte ideas de monetización específicas para tu audiencia.
        </p>
        <button
          onClick={onGenerate}
          style={{ backgroundColor: themeColor }}
          className="font-semibold text-xs text-white px-6 py-3 rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all uppercase tracking-wider"
        >
          Generar Reporte con Inteligencia Artificial
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 md:p-8 space-y-8 print:p-0 print:border-none print:shadow-none"
    >
      {/* Report Header Control */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-5 print:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">Reporte AI Vigente</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onGenerate}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-600 font-medium px-3.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Re-generar
          </button>
          <button
            onClick={handlePrint}
            className="text-xs bg-slate-900 border border-slate-900 text-white font-semibold px-4 py-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir / Exportar PDF
          </button>
        </div>
      </div>

      {/* 1. Brand Identity & Vibes */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900">
          <Award className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-lg font-sans">Identidad de Marca y Conexión</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl">
          {analysis.accountVibe}
        </p>
      </section>

      {/* 2. Success-oriented Brand Synergies & Competitive Advantages */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Target className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-lg font-sans">Ventajas Competitivas y Propuesta de Co-Creación</h3>
        </div>
        
        <p className="text-xs text-slate-500 max-w-2xl">
          Análisis de valor y resiliencia estratégica diseñado para patrocinadores, colaboradores y marcas comerciales de alto nivel interesadas en conectar con nuestra comunidad digital.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-xl space-y-2.5">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block font-mono bg-emerald-100/60 px-2 py-0.5 rounded w-fit">
              1. Fortalezas y Ventajas de Marca
            </span>
            <ul className="space-y-2">
              {analysis.swotAnalysis.strengths.map((s, i) => (
                <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                  <span className="text-emerald-500 font-semibold select-none mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities / Co-marketing */}
          <div className="bg-blue-50/40 border border-blue-100 p-5 rounded-xl space-y-2.5">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest block font-mono bg-blue-100/60 px-2 py-0.5 rounded w-fit">
              2. Oportunidades de Co-Marketing y Campañas
            </span>
            <ul className="space-y-2">
              {analysis.swotAnalysis.opportunities.map((o, i) => (
                <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                  <span className="text-blue-500 font-semibold select-none mt-0.5">•</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic development areas (Formerly Weaknesses) */}
          <div className="bg-indigo-50/40 border border-indigo-100 p-5 rounded-xl space-y-2.5">
            <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest block font-mono bg-indigo-100/60 px-2 py-0.5 rounded w-fit">
              3. Sinergias y Canales Listos para Patrocinio
            </span>
            <ul className="space-y-2">
              {analysis.swotAnalysis.weaknesses.map((w, i) => {
                // Remove alarmist / internal vocabulary, presenting it as "Oportunidad de patrocinio en..."
                let refined = w.replace(/Debilidad:|Dependencia|Debilidades|Complejidad/g, 'Foco de expansión de marca');
                return (
                  <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                    <span className="text-indigo-500 font-semibold select-none mt-0.5">•</span>
                    <span>{refined}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Algorithmic & Brand resilience (Formerly Threats) */}
          <div className="bg-amber-50/30 border border-amber-100/80 p-5 rounded-xl space-y-2.5">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block font-mono bg-amber-100/60 px-2 py-0.5 rounded w-fit">
              4. Estabilidad y Resiliencia en el Mercado
            </span>
            <ul className="space-y-2">
              {analysis.swotAnalysis.threats.map((t, i) => {
                // Framing threats as aspects mitigated by deep audience connection
                let refined = t.replace(/Amenazas:|Amenaza de|Cambios imprevistos/g, 'Mitigación mediante comunidad leal');
                return (
                  <li key={i} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                    <span className="text-amber-600 font-semibold select-none mt-0.5">•</span>
                    <span>{refined}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Key Findings & Insights */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Eye className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-lg font-sans">Lectura de Datos e Insights Fundamentales</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.keyFindings.map((finding, index) => (
            <div key={index} className="flex gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl items-start">
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-200/50 h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 select-none">
                0{index + 1}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
export { CheckCircle };
export { DollarSign };
export { TrendingUp };
export { Eye };
export { Award };
export { Sparkles };
