import { motion } from 'motion/react';
import { Users, GraduationCap, Percent, AlertCircle } from 'lucide-react';
import { Student } from '../types';

interface KPICardsProps {
  filteredStudents: Student[];
  allStudents: Student[];
}

export default function KPICards({ filteredStudents, allStudents }: KPICardsProps) {
  // Calculations
  const totalCount = filteredStudents.length;
  
  const avgGrade = totalCount > 0 
    ? Number((filteredStudents.reduce((acc, curr) => acc + curr.overallAverage, 0) / totalCount).toFixed(2))
    : 0;

  // Calculate approval rate: subjects completed with grade >= 6.0 / total subjects completed
  let totalFinishedSubjects = 0;
  let approvedSubjects = 0;
  
  filteredStudents.forEach(student => {
    student.subjects.forEach(subject => {
      if (subject.status === 'Aprobado') {
        totalFinishedSubjects++;
        approvedSubjects++;
      } else if (subject.status === 'Reprobado') {
        totalFinishedSubjects++;
      }
    });
  });

  const approvalRate = totalFinishedSubjects > 0
    ? Math.round((approvedSubjects / totalFinishedSubjects) * 100)
    : 0;

  const atRiskCount = filteredStudents.filter(s => s.status === 'En Riesgo').length;

  const cards = [
    {
      title: 'Total Estudiantes',
      value: totalCount,
      subtitle: `De un total de ${allStudents.length} inscritos`,
      icon: Users,
      color: 'bg-indigo-50 border-indigo-100 text-indigo-600',
      iconBg: 'bg-indigo-100 text-indigo-700',
      gradient: 'from-indigo-500/5 to-transparent'
    },
    {
      title: 'Promedio General',
      value: `${avgGrade} / 10`,
      subtitle: avgGrade >= 8.0 ? 'Rendimiento Sobresaliente' : avgGrade >= 6.0 ? 'Rendimiento Promedio' : 'Atención Requerida',
      icon: GraduationCap,
      color: 'bg-emerald-50 border-emerald-100 text-emerald-600',
      iconBg: 'bg-emerald-100 text-emerald-700',
      gradient: 'from-emerald-500/5 to-transparent'
    },
    {
      title: 'Tasa de Aprobación',
      value: `${approvalRate}%`,
      subtitle: 'Materias finalizadas aprobadas',
      icon: Percent,
      color: 'bg-violet-50 border-violet-100 text-violet-600',
      iconBg: 'bg-violet-100 text-violet-700',
      gradient: 'from-violet-500/5 to-transparent'
    },
    {
      title: 'Estudiantes en Riesgo',
      value: atRiskCount,
      subtitle: atRiskCount > 0 ? 'Requieren intervención tutorial' : 'Ninguno en estado crítico',
      icon: AlertCircle,
      color: atRiskCount > 0 ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-500',
      iconBg: atRiskCount > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600',
      gradient: atRiskCount > 0 ? 'from-rose-500/5 to-transparent' : 'from-slate-500/5 to-transparent'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="kpi-cards-container"
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 flex flex-col justify-between"
          id={`kpi-card-${idx}`}
        >
          {/* Subtle colored side accent indicator */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-600" style={{ 
            backgroundColor: card.title.includes('Riesgo') && atRiskCount > 0 ? 'rgb(244, 63, 94)' : 
                            card.title.includes('Promedio') ? 'rgb(16, 185, 129)' : 
                            card.title.includes('Aprobación') ? 'rgb(139, 92, 246)' : 'rgb(79, 70, 229)'
          }} />

          <div className="flex items-start justify-between relative z-10 mb-4 pl-2">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-slate-400 font-display">
                {card.title}
              </p>
              <h3 className="text-2xl font-extrabold font-display tracking-tight text-slate-800 mt-1">
                {card.value}
              </h3>
            </div>
            <div className={`p-2.5 rounded-sm ${card.iconBg} flex items-center justify-center`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500 relative z-10 flex items-center gap-1.5 mt-auto border-t border-slate-100 pt-3 pl-2">
            {card.title === 'Estudiantes en Riesgo' && atRiskCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
            {card.title === 'Promedio General' && avgGrade >= 8.0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
            <span>{card.subtitle}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
