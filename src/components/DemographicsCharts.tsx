import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DemographicSegment } from '../types';

interface DemographicsChartsProps {
  genderData: DemographicSegment[];
  ageData: DemographicSegment[];
  countryData: DemographicSegment[];
  cityData: DemographicSegment[];
  themeColor: string;
}

export default function DemographicsCharts({
  genderData,
  ageData,
  countryData,
  cityData,
  themeColor = '#3b82f6'
}: DemographicsChartsProps) {
  // Safe default colors to match themes
  const colors = [
    themeColor,
    '#f43f5e', // rose
    '#0ea5e9', // sky
    '#eab308', // yellow
    '#a855f7', // purple
    '#10b981', // emerald
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* 1. Gender Ratio */}
      <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider font-sans">
          Distribución por Género
        </h4>
        {genderData && genderData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Pie Chart Column (No overlapping label) */}
            <div className="h-44 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                    label={false}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-extrabold text-slate-900 font-sans">Core</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">Audience</span>
              </div>
            </div>

            {/* Premium Legend & Stat List Column (0% chance of overlapping) */}
            <div className="space-y-2 lg:space-y-3">
              {genderData.map((entry, index) => {
                const color = colors[index % colors.length];
                return (
                  <div key={entry.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-xs font-semibold text-slate-700 font-sans">{entry.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 font-mono">{entry.value}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-44 flex items-center justify-center">
            <p className="text-xs text-slate-400 font-mono">No hay datos de distribución de género definidos aun.</p>
          </div>
        )}
      </div>

      {/* 2. Age Distribution */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Distribución por Edad</h4>
        <div className="h-60">
          {ageData && ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" unit="%" />
                <Tooltip formatter={(value) => [`${value}%`, 'Audiencia']} />
                <Bar dataKey="value" fill={themeColor} radius={[4, 4, 0, 0]}>
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? themeColor : `${themeColor}cc`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs text-slate-400 font-mono">No hay datos de edades.</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Top Countries */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Países Principales</h4>
        <div className="h-60">
          {countryData && countryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={countryData}
                layout="vertical"
                margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" unit="%" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" width={75} />
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                <Bar dataKey="value" fill={themeColor} radius={[0, 4, 4, 0]}>
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[(index + 1) % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs text-slate-400 font-mono">No hay datos de países.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Top Cities */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Ciudades Principales</h4>
        <div className="h-60">
          {cityData && cityData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cityData}
                layout="vertical"
                margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" unit="%" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" width={75} />
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                <Bar dataKey="value" fill="#64748b" radius={[0, 4, 4, 0]}>
                  {cityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#64748b" fillOpacity={1 - index * 0.15} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs text-slate-400 font-mono">No hay datos de ciudades.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
