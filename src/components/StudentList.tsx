import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X, User } from 'lucide-react';
import { Student, StudentStatus } from '../types';
import { CAREERS } from '../mockData';

interface StudentListProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCareer: string;
  setSelectedCareer: (career: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  sortKey: 'name' | 'overallAverage' | 'semester';
  setSortKey: (key: 'name' | 'overallAverage' | 'semester') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export default function StudentList({
  students,
  selectedStudent,
  onSelectStudent,
  searchQuery,
  setSearchQuery,
  selectedCareer,
  setSelectedCareer,
  selectedStatus,
  setSelectedStatus,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: StudentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCareer, selectedStatus, sortKey, sortOrder]);

  // Handle column sorting toggle
  const handleSort = (key: 'name' | 'overallAverage' | 'semester') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc'); // Default to descending for numbers, alphabetical can override
    }
  };

  // Status Badge styling helper
  const getStatusBadge = (status: StudentStatus) => {
    switch (status) {
      case 'Activo':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Activo
          </span>
        );
      case 'En Riesgo':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/50 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            En Riesgo
          </span>
        );
      case 'Graduado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Graduado
          </span>
        );
      case 'Condicional':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Condicional
          </span>
        );
    }
  };

  // Pagination calculation
  const totalPages = Math.max(Math.ceil(students.length / itemsPerPage), 1);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return students.slice(startIndex, startIndex + itemsPerPage);
  }, [students, currentPage]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full" id="student-list-card">
      {/* Search and Filters Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="w-4.5 h-4.5 text-slate-500" />
            Directorio Académico
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Mostrando {students.length} de {students.length} estudiantes filtrados
          </span>
        </div>

        {/* Filters Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-md border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-150"
              id="student-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Career Filter */}
          <select
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-150"
            id="career-select"
          >
            <option value="">Todas las carreras</option>
            {CAREERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-150"
            id="status-select"
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Condicional">Condicional</option>
            <option value="En Riesgo">En Riesgo</option>
            <option value="Graduado">Graduado</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1 min-h-[360px]" id="student-table-container">
        {paginatedStudents.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-50/20">
                <th className="py-3 px-4">Estudiante</th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-50 hover:text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Carrera
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('semester')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-50 hover:text-slate-700 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1">
                    Semestre
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('overallAverage')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-50 hover:text-slate-700 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-1">
                    Promedio
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedStudents.map((student) => {
                const isSelected = selectedStudent?.id === student.id;
                // Simple first letters for avatar
                const initials = student.name.split(' ').slice(0, 2).map(n => n[0]).join('');

                return (
                  <tr
                    key={student.id}
                    onClick={() => onSelectStudent(student)}
                    className={`group cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-indigo-50/50 hover:bg-indigo-50 border-l-4 border-l-indigo-600'
                        : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Student Identity Cell */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-sm bg-gradient-to-br ${student.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-100`}>
                          {initials}
                        </div>
                        <div>
                          <p className={`font-semibold group-hover:text-indigo-600 transition-colors ${
                            isSelected ? 'text-indigo-900 font-bold' : 'text-slate-800'
                          }`}>
                            {student.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{student.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Career Cell */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium max-w-[180px] truncate">
                      {student.career}
                    </td>

                    {/* Semester Cell */}
                    <td className="py-3.5 px-4 text-center text-slate-500 font-semibold font-mono">
                      {student.semester}°
                    </td>

                    {/* Grade Average Cell */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className={`px-2 py-1 rounded-sm font-bold ${
                        student.overallAverage >= 8.5
                          ? 'bg-emerald-50 text-emerald-700'
                          : student.overallAverage >= 7.0
                          ? 'bg-indigo-50/55 text-indigo-700'
                          : student.overallAverage >= 6.0
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {student.overallAverage.toFixed(1)}
                      </span>
                    </td>

                    {/* Status Badge Cell */}
                    <td className="py-3.5 px-4 text-right">
                      {getStatusBadge(student.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center" id="empty-results-state">
            <div className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-100 text-slate-400">
              <User className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">Sin resultados académicos</h4>
            <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
              No encontramos ningún estudiante que coincida con tus filtros activos de búsqueda, carrera o estado académico.
            </p>
            {(searchQuery || selectedCareer || selectedStatus) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCareer('');
                  setSelectedStatus('');
                }}
                className="mt-4 px-4 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-sm transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {students.length > 0 && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between" id="table-pagination">
          <p className="text-[10px] font-semibold text-slate-500">
            Página <span className="text-slate-800 font-bold">{currentPage}</span> de <span className="text-slate-800 font-bold">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-sm border border-slate-200 bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-sm border border-slate-200 bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
