import React from 'react';
import { Instagram, Award, Calendar, ChevronRight, Palette } from 'lucide-react';
import { InstagramReport } from '../types';

interface ReportHeaderProps {
  report: InstagramReport;
  onUpdateField: (field: string, value: any) => void;
  availableThemes: { name: string; class: string; hex: string }[];
}

const VerifiedBadge = () => (
  <svg 
    className="w-4 h-4 text-[#0095f6] fill-current shrink-0 inline-block align-middle ml-1" 
    viewBox="0 0 24 24"
    title="Cuenta verificada oficial"
  >
    <path d="M12 .587l3.668 3.031 4.737-.012-.012 4.737 3.031 3.668-3.031 3.668.012 4.737-4.737-.012L12 23.413l-3.668-3.031-4.737.012.012-4.737-3.031-3.668 3.031-3.668-.012-4.737 4.737.012L12 .587zm0 15.11l5.59-5.591-1.414-1.414-4.176 4.177-2.176-2.177-1.414 1.414 3.59 3.591z" />
  </svg>
);

export default function ReportHeader({
  report,
  onUpdateField,
  availableThemes
}: ReportHeaderProps) {
  const isMemecentistas = report.accountHandle?.toLowerCase() === 'memecentistas' || report.accountName?.toLowerCase().includes('memecentistas');

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-6 md:p-8 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 relative overflow-hidden">
      {/* Visual background decoration */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-indigo-500/5 rounded-full blur-2xl -z-10" />

      {/* Profile info & Instagram details */}
      <div className="flex flex-col md:flex-row items-start gap-5 w-full xl:w-auto">
        <div className="relative shrink-0 flex justify-center self-center md:self-start">
          {isMemecentistas ? (
            <div className="w-20 h-20 rounded-full bg-[#ff0000] flex items-center justify-center shadow-lg border-2 border-red-400 select-none">
              <span 
                className="font-serif text-4xl text-black font-normal select-none leading-none" 
                style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}
              >
                M
              </span>
            </div>
          ) : (
            <div 
              style={{ borderColor: report.themeColor }}
              className="w-20 h-20 rounded-full border-4 flex items-center justify-center bg-slate-800 overflow-hidden shadow-md text-2xl font-bold font-mono tracking-widest text-[#f8fafc]"
            >
              {report.accountName ? report.accountName.substring(0, 2).toUpperCase() : 'IG'}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-1.5 rounded-full text-white shadow">
            <Instagram className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-3 flex-1 w-full">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold font-sans tracking-tight flex items-center gap-1">
                <span>{report.accountName || 'Mi Cuenta de Instagram'}</span>
                {isMemecentistas && <VerifiedBadge />}
              </h1>
              <span className="text-xs bg-white/10 hover:bg-white/15 cursor-pointer text-slate-300 px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1 transition-colors">
                @{report.accountHandle || 'nombre'}
              </span>
            </div>
          </div>

          {/* Real Instagram statistic indicators */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-200 border-t border-b border-white/10 py-2">
            <span className="space-x-1">
              <strong className="text-white font-bold font-mono">{report.postsCount ?? 871}</strong>
              <span className="text-slate-300">publicaciones</span>
            </span>
            <span className="space-x-1">
              <strong className="text-white font-bold font-mono">{report.metrics.followers ? report.metrics.followers.toLocaleString() : '153,000'}</strong>
              <span className="text-slate-300">seguidores</span>
            </span>
            <span className="space-x-1">
              <strong className="text-white font-bold font-mono">{report.followingCount ?? 190}</strong>
              <span className="text-slate-300">seguidos</span>
            </span>
          </div>

          {/* Core Biography details */}
          {report.bio && (
            <p className="text-xs text-slate-200 leading-relaxed font-sans bg-white/5 border border-white/10 rounded-lg p-3 whitespace-pre-line shadow-inner max-w-2xl">
              {report.bio}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3.5 text-xs text-[#cbd5e1]">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nicho: {report.niche || 'Arte y Cultura'}</span>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Periodo: {report.period || 'Últimos 30 días'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick configuration: Theme & Style (hidden on print) */}
      <div className="flex flex-wrap gap-4 items-center print:hidden border-t xl:border-t-0 border-white/10 pt-4 xl:pt-0 w-full xl:w-auto shrink-0">
        {/* Style Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold">Estilo del Reporte</label>
          <select
            value={report.reportStyle}
            onChange={(e) => onUpdateField('reportStyle', e.target.value)}
            className="text-xs bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-400"
          >
            <option value="classic">Clásico Corporativo</option>
            <option value="modern">Moderno Minimalista</option>
            <option value="creative">Creativo "Memecentista"</option>
          </select>
        </div>

        {/* Color Theme Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold">Paleta de Color</label>
          <div className="flex gap-2">
            {availableThemes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => onUpdateField('themeColor', theme.hex)}
                style={{ backgroundColor: theme.hex }}
                className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${report.themeColor === theme.hex ? 'border-white scale-105 shadow-glow' : 'border-transparent'}`}
                title={`Tema ${theme.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export { Instagram };
export { Award };
export { Calendar };
export { Palette };
export { ChevronRight };
