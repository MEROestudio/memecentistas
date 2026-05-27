import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string | number;
  subtext?: string;
  colorClass?: string;
  onClickEdit?: () => void;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  subtext,
  colorClass = 'text-primary',
  onClickEdit
}: MetricCardProps) {
  const isPositive = typeof change === 'number' ? change >= 0 : !String(change).startsWith('-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative group"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
          <h3 className="text-2xl font-bold font-sans text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg bg-slate-50 ${colorClass} group-hover:bg-slate-100 transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 border-t border-slate-50 pt-3">
        <div className="flex items-center gap-1.5">
          {change !== undefined && (
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {isPositive ? '▲' : '▼'} {typeof change === 'number' ? `${change}%` : change}
            </span>
          )}
          {subtext && <span className="text-xs text-slate-400 font-mono">{subtext}</span>}
        </div>
        
        {onClickEdit && (
          <button
            onClick={onClickEdit}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Editar
          </button>
        )}
      </div>
    </motion.div>
  );
}
