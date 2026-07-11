import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, TrendingUp, HelpCircle, Info } from 'lucide-react';
import { Student } from '../types';

interface AnalyticsChartsProps {
  students: Student[];
  selectedCareer: string;
  onSelectCareer: (career: string) => void;
}

export default function AnalyticsCharts({
  students,
  selectedCareer,
  onSelectCareer,
}: AnalyticsChartsProps) {
  const [activeTab, setActiveTab] = useState<'careers' | 'grades'>('careers');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [hoveredGradeRange, setHoveredGradeRange] = useState<string | null>(null);

  // --- DATA PROCESSING FOR CAREERS ---
  const careerData = (() => {
    const counts: Record<string, { count: number; totalGrade: number; color: string }> = {};
    
    // Assign consistent colors to careers for high-quality visuals
    const colors: Record<string, string> = {
      'Ingeniería en Software': 'rgb(79, 70, 229)', // Indigo
      'Administración de Empresas': 'rgb(245, 158, 11)', // Amber
      'Diseño de Experiencia de Usuario (UX)': 'rgb(139, 92, 246)', // Violet
      'Biotecnología': 'rgb(16, 185, 129)', // Emerald
      'Medicina y Cirugía': 'rgb(6, 182, 212)' // Cyan
    };

    students.forEach((student) => {
      if (!counts[student.career]) {
        counts[student.career] = {
          count: 0,
          totalGrade: 0,
          color: colors[student.career] || 'rgb(100, 116, 139)'
        };
      }
      counts[student.career].count += 1;
      counts[student.career].totalGrade += student.overallAverage;
    });

    return Object.entries(counts).map(([name, val]) => ({
      name,
      count: val.count,
      average: Number((val.totalGrade / val.count).toFixed(2)),
      color: val.color,
      percentage: Math.round((val.count / students.length) * 100),
    })).sort((a, b) => b.count - a.count);
  })();

  const maxCareerCount = Math.max(...careerData.map((d) => d.count), 1);

  // --- DATA PROCESSING FOR GRADES DISTRIBUTION ---
  const gradeDistribution = (() => {
    const ranges = [
      { key: 'insuficiente', label: 'Insuficiente (< 6.0)', range: [0, 5.99], count: 0, color: '#f43f5e', description: 'Bajo rendimiento' },
      { key: 'suficiente', label: 'Aprobado (6.0 - 7.5)', range: [6.0, 7.5], count: 0, color: '#f59e0b', description: 'Rendimiento aceptable' },
      { key: 'notable', label: 'Notable (7.6 - 8.9)', range: [7.6, 8.9], count: 0, color: '#6366f1', description: 'Rendimiento destacado' },
      { key: 'sobresaliente', label: 'Sobresaliente (9.0 - 10)', range: [9.0, 10.0], count: 0, color: '#10b981', description: 'Rendimiento sobresaliente' },
    ];

    students.forEach((student) => {
      const g = student.overallAverage;
      const range = ranges.find((r) => g >= r.range[0] && g <= r.range[1]);
      if (range) range.count += 1;
    });

    return ranges;
  })();

  const maxGradeCount = Math.max(...gradeDistribution.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-6" id="analytics-container">
      {/* Chart Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            Análisis de Progreso Académico
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Métricas interactivas de distribución y promedios generales
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1 rounded-md self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('careers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold transition-all duration-200 ${
              activeTab === 'careers'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-careers"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Carreras
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold transition-all duration-200 ${
              activeTab === 'grades'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-grades"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Calificaciones
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'careers' ? (
            <motion.div
              key="careers-chart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              id="careers-chart-section"
            >
              {/* Interactive SVG Bar Chart */}
              <div className="lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display">
                    Estudiantes por Carrera (Interactivo)
                  </h4>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Info className="w-3 h-3 text-indigo-500" />
                    Haz clic en una barra para filtrar la lista
                  </span>
                </div>

                <div className="relative w-full aspect-[16/9] min-h-[250px] bg-slate-50/50 rounded-lg border border-slate-100 p-4">
                  {/* Custom SVG Bar Chart */}
                  <svg viewBox="0 0 500 240" className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                      const yPos = 30 + ratio * 160;
                      const gridValue = Math.round(maxCareerCount * (1 - ratio));
                      return (
                        <g key={i}>
                          <line
                            x1="50"
                            y1={yPos}
                            x2="470"
                            y2={yPos}
                            stroke="#e2e8f0"
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                          />
                          <text
                            x="40"
                            y={yPos + 4}
                            fill="#94a3b8"
                            fontSize="8"
                            textAnchor="end"
                            className="font-mono"
                          >
                            {gridValue}
                          </text>
                        </g>
                      );
                    })}

                    {/* Bars rendering */}
                    {careerData.map((d, index) => {
                      const barWidth = 45;
                      const spacing = (420 - careerData.length * barWidth) / (careerData.length + 1);
                      const xPos = 50 + spacing + index * (barWidth + spacing);
                      const barHeight = (d.count / maxCareerCount) * 160;
                      const yPos = 190 - barHeight;
                      const isSelected = selectedCareer === d.name;
                      const isAnySelected = selectedCareer !== '';

                      return (
                        <g
                          key={d.name}
                          className="cursor-pointer group"
                          onClick={() => onSelectCareer(isSelected ? '' : d.name)}
                          onMouseEnter={() => setHoveredBar(d.name)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Invisible hover helper for wider mouse target */}
                          <rect
                            x={xPos - spacing / 2}
                            y="20"
                            width={barWidth + spacing}
                            height="180"
                            fill="transparent"
                          />

                          {/* Dynamic background highlights */}
                          <rect
                            x={xPos - 4}
                            y="25"
                            width={barWidth + 8}
                            height="170"
                            rx="8"
                            fill={isSelected ? `${d.color}10` : 'transparent'}
                            className="transition-all duration-300"
                          />

                          {/* The actual visual bar with nice gradients */}
                          <rect
                            x={xPos}
                            y={yPos}
                            width={barWidth}
                            height={barHeight}
                            rx="5"
                            fill={d.color}
                            opacity={isAnySelected ? (isSelected ? '1' : '0.4') : (hoveredBar === d.name ? '0.95' : '0.8')}
                            className="transition-all duration-300 transform-gpu origin-bottom group-hover:scale-y-[1.02]"
                          />

                          {/* Text abbreviation / label on bottom */}
                          <text
                            x={xPos + barWidth / 2}
                            y="205"
                            fill={isSelected ? '#4f46e5' : '#64748b'}
                            fontSize="8"
                            fontWeight={isSelected ? '600' : '500'}
                            textAnchor="middle"
                            className="transition-all duration-200"
                          >
                            {d.name.length > 18 ? `${d.name.slice(0, 15)}...` : d.name}
                          </text>

                          {/* Value label on top of bar if high enough */}
                          {barHeight > 15 && (
                            <text
                              x={xPos + barWidth / 2}
                              y={yPos + 12}
                              fill="#ffffff"
                              fontSize="9"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {d.count}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Base line */}
                    <line x1="45" y1="190" x2="475" y2="190" stroke="#94a3b8" strokeWidth="1" />
                  </svg>

                  {/* HTML Tooltip embedded inside absolute div container */}
                  <AnimatePresence>
                    {hoveredBar && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-4 right-4 bg-slate-900 text-white rounded-lg p-3 shadow-xl border border-slate-800 text-xs z-30 max-w-[200px]"
                      >
                        {(() => {
                          const item = careerData.find((d) => d.name === hoveredBar);
                          if (!item) return null;
                          return (
                            <>
                              <h5 className="font-bold font-display text-slate-100">{item.name}</h5>
                              <div className="mt-2 space-y-1 text-slate-300 font-mono text-[11px]">
                                <div className="flex justify-between">
                                  <span>Estudiantes:</span>
                                  <span className="font-semibold text-white">{item.count} ({item.percentage}%)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Promedio General:</span>
                                  <span className="font-semibold text-emerald-400">{item.average}</span>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar: Legend and detailed stats */}
              <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-5 lg:pt-0 lg:pl-6">
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display mb-3">
                    Resumen por Carrera
                  </h4>
                  <div className="space-y-3">
                    {careerData.map((d) => {
                      const isSelected = selectedCareer === d.name;
                      return (
                        <button
                          key={d.name}
                          onClick={() => onSelectCareer(isSelected ? '' : d.name)}
                          className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 border flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-50/70 border-indigo-200 shadow-sm'
                              : 'border-transparent hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden mr-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: d.color }}
                            />
                            <span className="text-xs font-semibold text-slate-700 truncate">
                              {d.name}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-slate-800">{d.count} Alum.</span>
                            <span className="block text-[10px] text-slate-400">Prom: {d.average}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-4 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed text-slate-500">
                    <strong>Interacción:</strong> Filtra dinámicamente la lista de estudiantes seleccionando su carrera en el gráfico de barras o en la lista lateral.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grades-chart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              id="grades-chart-section"
            >
              {/* Interactive Grades SVG Chart */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display">
                    Distribución de Calificaciones Académicas
                  </h4>
                </div>

                <div className="relative w-full aspect-[16/9] min-h-[250px] bg-slate-50/50 rounded-lg border border-slate-100 p-4">
                  <svg viewBox="0 0 500 240" className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                      const yPos = 30 + ratio * 160;
                      const gridValue = Math.round(maxGradeCount * (1 - ratio));
                      return (
                        <g key={i}>
                          <line
                            x1="50"
                            y1={yPos}
                            x2="470"
                            y2={yPos}
                            stroke="#e2e8f0"
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                          />
                          <text
                            x="40"
                            y={yPos + 4}
                            fill="#94a3b8"
                            fontSize="8"
                            textAnchor="end"
                            className="font-mono"
                          >
                            {gridValue}
                          </text>
                        </g>
                      );
                    })}

                    {/* Vertical Columns */}
                    {gradeDistribution.map((d, index) => {
                      const barWidth = 65;
                      const spacing = (420 - gradeDistribution.length * barWidth) / (gradeDistribution.length + 1);
                      const xPos = 50 + spacing + index * (barWidth + spacing);
                      const barHeight = (d.count / maxGradeCount) * 160;
                      const yPos = 190 - barHeight;

                      return (
                        <g
                          key={d.key}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredGradeRange(d.key)}
                          onMouseLeave={() => setHoveredGradeRange(null)}
                        >
                          {/* Hover highlight background */}
                          <rect
                            x={xPos - spacing / 2}
                            y="20"
                            width={barWidth + spacing}
                            height="180"
                            fill="transparent"
                          />

                          {/* Soft background glow */}
                          <rect
                            x={xPos - 4}
                            y={yPos - 4}
                            width={barWidth + 8}
                            height={barHeight + 4}
                            rx="2"
                            fill={`${d.color}08`}
                            className="transition-all duration-300"
                          />

                          {/* Chart column */}
                          <rect
                            x={xPos}
                            y={yPos}
                            width={barWidth}
                            height={barHeight}
                            rx="2"
                            fill={d.color}
                            opacity={hoveredGradeRange === d.key ? '1' : '0.8'}
                            className="transition-all duration-300 transform-gpu origin-bottom hover:scale-y-[1.03]"
                          />

                          {/* X labels */}
                          <text
                            x={xPos + barWidth / 2}
                            y="205"
                            fill="#64748b"
                            fontSize="7.5"
                            fontWeight="500"
                            textAnchor="middle"
                          >
                            {d.label.split(' ')[0]}
                          </text>
                          <text
                            x={xPos + barWidth / 2}
                            y="214"
                            fill="#94a3b8"
                            fontSize="6.5"
                            textAnchor="middle"
                            className="font-mono"
                          >
                            {d.label.slice(d.label.indexOf('('))}
                          </text>

                          {/* Value indicators on top of columns */}
                          {barHeight > 15 && (
                            <text
                              x={xPos + barWidth / 2}
                              y={yPos + 15}
                              fill="#ffffff"
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {d.count}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Base line */}
                    <line x1="45" y1="190" x2="475" y2="190" stroke="#94a3b8" strokeWidth="1" />
                  </svg>

                  {/* HTML Tooltip embedded inside absolute div container */}
                  <AnimatePresence>
                    {hoveredGradeRange && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-4 right-4 bg-slate-900 text-white rounded-lg p-3 shadow-xl border border-slate-800 text-xs z-30 max-w-[210px]"
                      >
                        {(() => {
                          const item = gradeDistribution.find((d) => d.key === hoveredGradeRange);
                          if (!item) return null;
                          const pct = Math.round((item.count / students.length) * 100);
                          return (
                            <>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <h5 className="font-bold font-display text-slate-100">{item.label}</h5>
                              </div>
                              <p className="text-[10px] text-slate-400 mb-2 italic">{item.description}</p>
                              <div className="space-y-1 text-slate-300 font-mono text-[11px] border-t border-slate-800 pt-1.5">
                                <div className="flex justify-between">
                                  <span>Cantidad:</span>
                                  <span className="font-semibold text-white">{item.count} alumnos</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Porcentaje:</span>
                                  <span className="font-semibold text-indigo-400">{pct}%</span>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar: Legend & Distribution details */}
              <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-5 lg:pt-0 lg:pl-6">
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display mb-3">
                    Tramos de Desempeño
                  </h4>
                  <div className="space-y-3">
                    {gradeDistribution.map((d) => {
                      const pct = Math.round((d.count / students.length) * 100);
                      return (
                        <div
                          key={d.key}
                          className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                              <span className="text-xs font-bold text-slate-700">
                                {d.label.split(' ')[0]}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-slate-500 font-bold">{d.count} ({pct}%)</span>
                          </div>
                          {/* Minimal progress bar representational style */}
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ backgroundColor: d.color, width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mt-4 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed text-slate-500">
                    El gráfico agrupa los promedios de los alumnos en cuatro rangos académicos, permitiendo diagnosticar rápidamente la salud escolar del alumnado.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
