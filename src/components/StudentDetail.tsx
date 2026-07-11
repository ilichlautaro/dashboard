import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, GraduationCap, Calendar, BookOpen, UserCheck, Star, LineChart, Award, AlertCircle } from 'lucide-react';
import { Student, Subject } from '../types';

interface StudentDetailProps {
  student: Student | null;
}

export default function StudentDetail({ student }: StudentDetailProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  if (!student) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center p-12 text-center text-slate-500" id="detail-placeholder">
        <div className="w-16 h-16 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 mb-4 animate-bounce">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold font-display text-slate-800">Ficha Académica Detallada</h3>
        <p className="text-xs text-slate-400 max-w-xs mt-1.5 leading-relaxed">
          Selecciona un estudiante del directorio académico para visualizar su progreso curricular, histórico de calificaciones por semestre y habilidades destacadas.
        </p>
      </div>
    );
  }

  // Calculate some sub-stats
  const totalSubjects = student.subjects.length;
  const approvedCount = student.subjects.filter((s) => s.status === 'Aprobado').length;
  const inProgressCount = student.subjects.filter((s) => s.status === 'Cursando').length;

  const initials = student.name.split(' ').slice(0, 2).map(n => n[0]).join('');

  // --- SVG PROGRESS CHART SETUP ---
  const chartHeight = 120;
  const chartWidth = 360;
  const paddingX = 40;
  const paddingY = 15;

  const progressPoints = student.progress;
  const maxSemester = Math.max(...progressPoints.map(p => p.semester), 1);
  const minSemester = 1;

  // Map progress coordinates:
  // X maps semester (minSemester to maxSemester)
  // Y maps grade (scale 4.0 to 10.0 to show detail variation)
  const getCoords = (p: { semester: number; averageGrade: number }) => {
    const xRange = maxSemester - minSemester === 0 ? 1 : maxSemester - minSemester;
    const xRatio = (p.semester - minSemester) / xRange;
    const x = paddingX + xRatio * (chartWidth - 2 * paddingX);

    const yMin = 4.0;
    const yMax = 10.0;
    const yRatio = (p.averageGrade - yMin) / (yMax - yMin);
    // SVG coordinates are inverted (0,0 is top left)
    const y = chartHeight - paddingY - yRatio * (chartHeight - 2 * paddingY);

    return { x, y };
  };

  const lineCoords = progressPoints.map(getCoords);

  // Generate SVG Path (d) attribute for line and area fill
  const linePath = lineCoords.reduce((acc, c, i) => {
    return i === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`;
  }, '');

  const areaPath = lineCoords.length > 0
    ? `${linePath} L ${lineCoords[lineCoords.length - 1].x} ${chartHeight - paddingY} L ${lineCoords[0].x} ${chartHeight - paddingY} Z`
    : '';

  return (
    <motion.div
      key={student.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full"
      id="student-detail-card"
    >
      {/* Detail Header / Profile Hero */}
      <div className="relative p-6 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
          {/* Main Avatar */}
          <div className={`w-14 h-14 rounded-sm bg-gradient-to-br ${student.avatarColor} text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-indigo-100 ring-4 ring-white shrink-0`}>
            {initials}
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold font-display text-slate-800 tracking-tight leading-snug">
                {student.name}
              </h2>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-150 px-2 py-0.5 rounded-sm font-bold">
                {student.id}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              {student.career}
            </p>

            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-300" />
                {student.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-300" />
                Semestre {student.semester}°
              </span>
            </div>
          </div>

          {/* Quick Average Badge */}
          <div className="bg-slate-900 text-white rounded-sm px-3 py-2 text-center shrink-0 self-start sm:self-center shadow-md">
            <span className="block text-[8px] font-bold text-indigo-400 uppercase tracking-widest font-display">Promedio</span>
            <span className="text-lg font-extrabold font-mono leading-none mt-0.5">{student.overallAverage.toFixed(1)}</span>
          </div>
        </div>

        {/* Personalized Recommender Panel */}
        <div className={`mt-5 p-3 rounded-lg border flex items-start gap-2.5 ${
          student.status === 'En Riesgo'
            ? 'bg-rose-50/70 border-rose-100 text-rose-800'
            : student.status === 'Condicional'
            ? 'bg-amber-50/70 border-amber-100 text-amber-800'
            : 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
        }`}>
          {student.status === 'En Riesgo' ? (
            <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
          ) : (
            <Award className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
          )}
          <div className="text-[11px] leading-relaxed">
            <strong className="font-bold block mb-0.5">Diagnóstico del Tutor:</strong>
            {student.recommendation}
          </div>
        </div>
      </div>

      {/* Main Stats and Graphs Area */}
      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        {/* Interactive SVGs Semester Progress Line Chart */}
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display mb-3 flex items-center gap-1.5">
            <LineChart className="w-4 h-4 text-slate-400" />
            Progreso Académico por Semestre
          </h4>

          <div className="relative bg-slate-50/50 rounded-lg border border-slate-100 p-3 h-[160px] flex items-center justify-center">
            {progressPoints.length > 1 ? (
              <div className="relative w-full h-full">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                  {/* Grid / Guide lines */}
                  {[4, 6, 8, 10].map((gValue) => {
                    const ratio = (gValue - 4) / 6;
                    const yPos = chartHeight - paddingY - ratio * (chartHeight - 2 * paddingY);
                    return (
                      <g key={gValue}>
                        <line
                          x1={paddingX}
                          y1={yPos}
                          x2={chartWidth - paddingX}
                          y2={yPos}
                          stroke="#e2e8f0"
                          strokeWidth="0.5"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={paddingX - 8}
                          y={yPos + 3}
                          fill="#94a3b8"
                          fontSize="7"
                          textAnchor="end"
                          className="font-mono"
                        >
                          {gValue.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Shaded area under the line */}
                  {areaPath && (
                    <path
                      d={areaPath}
                      fill="url(#indigo-gradient)"
                      opacity="0.15"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* Defining Gradient */}
                  <defs>
                    <linearGradient id="indigo-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Main plot line */}
                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Interaction circles */}
                  {lineCoords.map((c, i) => {
                    const pt = progressPoints[i];
                    const isHovered = hoveredPoint === i;

                    return (
                      <g
                        key={i}
                        onMouseEnter={() => setHoveredPoint(i)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer"
                      >
                        {/* Hidden larger hover area */}
                        <circle cx={c.x} cy={c.y} r="12" fill="transparent" />

                        {/* Interactive circle */}
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={isHovered ? '6' : '3.5'}
                          fill={isHovered ? '#4f46e5' : '#ffffff'}
                          stroke="#4f46e5"
                          strokeWidth="2"
                          className="transition-all duration-150 shadow-sm"
                        />

                        {/* X-axis labels */}
                        <text
                          x={c.x}
                          y={chartHeight - 2}
                          fill="#64748b"
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          Sem {pt.semester}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Tooltip inside SVG parent div */}
                <AnimatePresence>
                  {hoveredPoint !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bg-slate-900 text-white font-mono text-[10px] px-2.5 py-1.5 rounded-sm shadow-xl border border-slate-800 z-40 pointer-events-none"
                      style={{
                        left: `${Math.min(
                          Math.max(lineCoords[hoveredPoint].x - 50, 0),
                          chartWidth - 100
                        )}px`,
                        top: `${Math.max(lineCoords[hoveredPoint].y - 45, 0)}px`,
                      }}
                    >
                      <span className="font-bold text-indigo-300">Sem {progressPoints[hoveredPoint].semester}°</span>: {progressPoints[hoveredPoint].averageGrade.toFixed(2)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <p className="text-[10px] text-slate-400 italic">No hay suficiente trayecto histórico (Semestre 1°)</p>
            )}
          </div>
        </div>

        {/* Skill Profile */}
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display mb-3 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-slate-400" />
            Perfil de Competencias (Escala 1-10)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 bg-slate-50/55 rounded-lg border border-slate-100 p-4">
            {student.skills.map((s) => (
              <div key={s.category} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-600">{s.category}</span>
                  <span className="font-mono text-slate-800">{s.score.toFixed(1)}</span>
                </div>
                {/* Horizontal bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${s.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Subject Record (Kardex) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase font-display flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-400" />
              Asignaturas Registradas ({totalSubjects})
            </h4>
            <div className="flex gap-2 text-[9px] text-slate-400 font-semibold font-mono">
              <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100">{approvedCount} Aprobadas</span>
              <span className="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">{inProgressCount} Cursando</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {student.subjects.map((subj) => (
              <div
                key={subj.id}
                className="p-3 bg-white border border-slate-100 hover:border-slate-200 rounded-lg flex items-center justify-between transition-colors shadow-sm"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800">{subj.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Semestre {subj.semester}° • ID: {subj.id}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status badges */}
                  {subj.status === 'Aprobado' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      Aprobado
                    </span>
                  ) : subj.status === 'Cursando' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      Cursando
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700">
                      Reprobado
                    </span>
                  )}

                  {/* Grade */}
                  <span className={`w-8 text-center font-bold font-mono text-xs rounded py-0.5 px-1.5 ${
                    subj.status === 'Cursando'
                      ? 'bg-slate-100 text-slate-400'
                      : subj.grade >= 8.0
                      ? 'bg-emerald-100/50 text-emerald-700 font-extrabold'
                      : subj.grade >= 6.0
                      ? 'bg-indigo-100/50 text-indigo-700'
                      : 'bg-rose-100/50 text-rose-700 font-extrabold'
                  }`}>
                    {subj.status === 'Cursando' ? '-' : subj.grade.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
