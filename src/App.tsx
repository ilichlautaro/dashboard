import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, LayoutDashboard, Database, RefreshCw, BarChart3, Star, Clock } from 'lucide-react';
import { Student } from './types';
import { MOCK_STUDENTS } from './mockData';
import KPICards from './components/KPICards';
import AnalyticsCharts from './components/AnalyticsCharts';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';

export default function App() {
  // Filter and Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'overallAverage' | 'semester'>('overallAverage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Selected Student State
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter & Sort Logic
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCareer = selectedCareer === '' || student.career === selectedCareer;
      const matchesStatus = selectedStatus === '' || student.status === selectedStatus;
      
      return matchesSearch && matchesCareer && matchesStatus;
    }).sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name) * multiplier;
      }
      if (sortKey === 'overallAverage') {
        return (a.overallAverage - b.overallAverage) * multiplier;
      }
      if (sortKey === 'semester') {
        return (a.semester - b.semester) * multiplier;
      }
      return 0;
    });
  }, [searchQuery, selectedCareer, selectedStatus, sortKey, sortOrder]);

  // Set default student on initial load or list changes to keep view populated
  useEffect(() => {
    if (filteredStudents.length > 0) {
      // If previous selection is still in the filtered list, keep it
      const stillInList = filteredStudents.some(s => s.id === selectedStudent?.id);
      if (!stillInList) {
        setSelectedStudent(filteredStudents[0]);
      }
    } else {
      setSelectedStudent(null);
    }
  }, [filteredStudents, selectedStudent?.id]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCareer('');
    setSelectedStatus('');
    setSortKey('overallAverage');
    setSortOrder('desc');
    if (MOCK_STUDENTS.length > 0) {
      setSelectedStudent(MOCK_STUDENTS[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans" id="app-root">
      
      {/* Upper Brand Nav Rail */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-xs px-6 py-4" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100/50">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-widest text-indigo-600 uppercase font-display">
                  SGA PLATFORM
                </span>
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm text-[8px] font-bold font-mono">v4.0</span>
              </div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-800 font-display">
                Dashboard de Estudiantes y Rendimiento Académico
              </h1>
            </div>
          </div>

          {/* Real-time Indicators / Utility */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            {/* Academic Clock Icon and local indicator */}
            <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-sm flex items-center gap-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ciclo Académico 2026-I</span>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
              title="Restablecer todos los filtros"
              id="reset-dashboard-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6" id="app-main-content">
        
        {/* KPI Scorecard Panels */}
        <KPICards filteredStudents={filteredStudents} allStudents={MOCK_STUDENTS} />

        {/* Dashboard Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="dashboard-grid">
          
          {/* Left Column: Visual Analytics + Directory Table */}
          <div className="lg:col-span-8 space-y-6 flex flex-col h-full">
            
            {/* Custom Interactive Charts (Careers & Grade Distribution) */}
            <AnalyticsCharts
              students={MOCK_STUDENTS}
              selectedCareer={selectedCareer}
              onSelectCareer={(career) => setSelectedCareer(career)}
            />

            {/* Directory Student List with custom search, sort & paging */}
            <StudentList
              students={filteredStudents}
              selectedStudent={selectedStudent}
              onSelectStudent={(student) => setSelectedStudent(student)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCareer={selectedCareer}
              setSelectedCareer={setSelectedCareer}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              sortKey={sortKey}
              setSortKey={setSortKey}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

          </div>

          {/* Right Column: Dynamic Student Dossier Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-[88px] h-auto lg:h-[calc(100vh-120px)]" id="detail-pane">
            <StudentDetail student={selectedStudent} />
          </div>

        </div>

      </main>

      {/* Elegant Footer */}
      <footer className="w-full bg-white border-t border-slate-200/60 py-4 px-6 text-center text-[10px] font-semibold text-slate-400 mt-12" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>© 2026 Sistema de Gestión Académica (SGA). Universidad de Excelencia. Todos los derechos reservados.</p>
          <div className="flex gap-4 justify-center">
            <a href="#" className="hover:text-indigo-600 transition-colors">Reglamento Estudiantil</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-600 transition-colors">Tutorías y Soporte</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
