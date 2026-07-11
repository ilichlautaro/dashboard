import { Student } from './types';

export const CAREERS = [
  'Ingeniería en Software',
  'Administración de Empresas',
  'Diseño de Experiencia de Usuario (UX)',
  'Biotecnología',
  'Medicina y Cirugía'
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'EST-2024-001',
    name: 'Sofía Rodríguez Luna',
    email: 'sofia.rodriguez@universidad.edu',
    avatarColor: 'from-pink-500 to-rose-500',
    career: 'Ingeniería en Software',
    semester: 5,
    overallAverage: 8.9,
    status: 'Activo',
    subjects: [
      { id: 'S1-01', name: 'Programación I', grade: 9.5, semester: 1, status: 'Aprobado' },
      { id: 'S1-02', name: 'Cálculo Diferencial', grade: 8.0, semester: 1, status: 'Aprobado' },
      { id: 'S2-01', name: 'Programación II', grade: 9.0, semester: 2, status: 'Aprobado' },
      { id: 'S2-02', name: 'Estructuras de Datos', grade: 8.5, semester: 2, status: 'Aprobado' },
      { id: 'S3-01', name: 'Bases de Datos', grade: 9.2, semester: 3, status: 'Aprobado' },
      { id: 'S3-02', name: 'Cálculo Integral', grade: 7.8, semester: 3, status: 'Aprobado' },
      { id: 'S4-01', name: 'Desarrollo Web', grade: 9.8, semester: 4, status: 'Aprobado' },
      { id: 'S4-02', name: 'Redes de Computadoras', grade: 8.2, semester: 4, status: 'Aprobado' },
      { id: 'S5-01', name: 'Ingeniería de Requerimientos', grade: 9.4, semester: 5, status: 'Cursando' },
      { id: 'S5-02', name: 'Sistemas Operativos', grade: 8.0, semester: 5, status: 'Cursando' },
      { id: 'S5-03', name: 'Arquitectura de Software', grade: 9.0, semester: 5, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 8.75 },
      { semester: 2, averageGrade: 8.75 },
      { semester: 3, averageGrade: 8.5 },
      { semester: 4, averageGrade: 9.0 },
      { semester: 5, averageGrade: 8.8 }
    ],
    skills: [
      { category: 'Lógica', score: 9.5 },
      { category: 'Diseño', score: 7.2 },
      { category: 'Trabajo Equipo', score: 8.8 },
      { category: 'Teórica', score: 8.0 },
      { category: 'Investigación', score: 8.5 }
    ],
    recommendation: 'Excelente rendimiento constante. Se recomienda postulación para beca de investigación o asistencia académica.'
  },
  {
    id: 'EST-2024-002',
    name: 'Mateo Fernández Castro',
    email: 'mateo.fernandez@universidad.edu',
    avatarColor: 'from-blue-500 to-indigo-500',
    career: 'Ingeniería en Software',
    semester: 3,
    overallAverage: 5.6,
    status: 'En Riesgo',
    subjects: [
      { id: 'S1-01', name: 'Programación I', grade: 6.2, semester: 1, status: 'Aprobado' },
      { id: 'S1-02', name: 'Cálculo Diferencial', grade: 4.8, semester: 1, status: 'Reprobado' },
      { id: 'S1-03', name: 'Cálculo Diferencial (R)', grade: 6.0, semester: 2, status: 'Aprobado' },
      { id: 'S2-01', name: 'Programación II', grade: 5.5, semester: 2, status: 'Aprobado' },
      { id: 'S2-02', name: 'Estructuras de Datos', grade: 4.5, semester: 2, status: 'Reprobado' },
      { id: 'S3-01', name: 'Bases de Datos', grade: 5.2, semester: 3, status: 'Cursando' },
      { id: 'S3-02', name: 'Estructuras de Datos (R)', grade: 6.2, semester: 3, status: 'Cursando' },
      { id: 'S3-03', name: 'Álgebra Lineal', grade: 4.9, semester: 3, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 5.5 },
      { semester: 2, averageGrade: 5.3 },
      { semester: 3, averageGrade: 5.4 }
    ],
    skills: [
      { category: 'Lógica', score: 5.8 },
      { category: 'Diseño', score: 6.0 },
      { category: 'Trabajo Equipo', score: 7.5 },
      { category: 'Teórica', score: 4.8 },
      { category: 'Investigación', score: 5.0 }
    ],
    recommendation: 'Alerta académica activa por reprobación de asignaturas de ciencias básicas. Sugerimos agendar tutorías obligatorias de Cálculo y Álgebra.'
  },
  {
    id: 'EST-2024-003',
    name: 'Camila López Garrido',
    email: 'camila.lopez@universidad.edu',
    avatarColor: 'from-purple-500 to-indigo-500',
    career: 'Diseño de Experiencia de Usuario (UX)',
    semester: 7,
    overallAverage: 9.4,
    status: 'Activo',
    subjects: [
      { id: 'D1-01', name: 'Fundamentos del Diseño', grade: 9.5, semester: 1, status: 'Aprobado' },
      { id: 'D1-02', name: 'Psicología Cognitiva', grade: 9.0, semester: 1, status: 'Aprobado' },
      { id: 'D2-01', name: 'Diseño de Interfaz I', grade: 9.8, semester: 2, status: 'Aprobado' },
      { id: 'D2-02', name: 'Investigación de Usuarios', grade: 9.2, semester: 2, status: 'Aprobado' },
      { id: 'D3-01', name: 'Diseño de Interfaz II', grade: 9.6, semester: 3, status: 'Aprobado' },
      { id: 'D3-02', name: 'Arquitectura de Información', grade: 9.1, semester: 3, status: 'Aprobado' },
      { id: 'D4-01', name: 'Usabilidad y Testeo', grade: 9.5, semester: 4, status: 'Aprobado' },
      { id: 'D4-02', name: 'Prototipado Rápido', grade: 9.3, semester: 4, status: 'Aprobado' },
      { id: 'D5-01', name: 'Metodologías Ágiles', grade: 9.0, semester: 5, status: 'Aprobado' },
      { id: 'D6-01', name: 'Portafolio Profesional', grade: 9.7, semester: 6, status: 'Aprobado' },
      { id: 'D7-01', name: 'Proyecto de Título UX', grade: 9.4, semester: 7, status: 'Cursando' },
      { id: 'D7-02', name: 'Ética y Accesibilidad', grade: 9.5, semester: 7, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 9.25 },
      { semester: 2, averageGrade: 9.5 },
      { semester: 3, averageGrade: 9.35 },
      { semester: 4, averageGrade: 9.4 },
      { semester: 5, averageGrade: 9.0 },
      { semester: 6, averageGrade: 9.7 },
      { semester: 7, averageGrade: 9.45 }
    ],
    skills: [
      { category: 'Lógica', score: 7.5 },
      { category: 'Diseño', score: 9.9 },
      { category: 'Trabajo Equipo', score: 9.5 },
      { category: 'Teórica', score: 8.8 },
      { category: 'Investigación', score: 9.6 }
    ],
    recommendation: 'Estudiante destacada. Su portafolio tiene un nivel sobresaliente. Candidata ideal para mentorías a alumnos de semestres iniciales.'
  },
  {
    id: 'EST-2024-004',
    name: 'Diego Martínez Silva',
    email: 'diego.martinez@universidad.edu',
    avatarColor: 'from-emerald-500 to-teal-500',
    career: 'Biotecnología',
    semester: 4,
    overallAverage: 8.2,
    status: 'Activo',
    subjects: [
      { id: 'B1-01', name: 'Química General', grade: 8.2, semester: 1, status: 'Aprobado' },
      { id: 'B1-02', name: 'Biología Celular', grade: 8.5, semester: 1, status: 'Aprobado' },
      { id: 'B2-01', name: 'Química Orgánica', grade: 7.5, semester: 2, status: 'Aprobado' },
      { id: 'B2-02', name: 'Genética General', grade: 8.0, semester: 2, status: 'Aprobado' },
      { id: 'B3-01', name: 'Microbiología', grade: 8.3, semester: 3, status: 'Aprobado' },
      { id: 'B3-02', name: 'Bioprocesos I', grade: 7.9, semester: 3, status: 'Aprobado' },
      { id: 'B4-01', name: 'Biología Molecular', grade: 8.4, semester: 4, status: 'Cursando' },
      { id: 'B4-02', name: 'Inmunología', grade: 8.8, semester: 4, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 8.35 },
      { semester: 2, averageGrade: 7.75 },
      { semester: 3, averageGrade: 8.1 },
      { semester: 4, averageGrade: 8.6 }
    ],
    skills: [
      { category: 'Lógica', score: 8.0 },
      { category: 'Diseño', score: 5.5 },
      { category: 'Trabajo Equipo', score: 7.8 },
      { category: 'Teórica', score: 8.2 },
      { category: 'Investigación', score: 9.0 }
    ],
    recommendation: 'Excelente afinidad con el trabajo de laboratorio y la investigación científica. Mantiene un avance constante y ordenado.'
  },
  {
    id: 'EST-2024-005',
    name: 'Valentina Silva Prado',
    email: 'valentina.silva@universidad.edu',
    avatarColor: 'from-amber-500 to-orange-500',
    career: 'Administración de Empresas',
    semester: 6,
    overallAverage: 7.5,
    status: 'Condicional',
    subjects: [
      { id: 'A1-01', name: 'Fundamentos de Admin.', grade: 8.0, semester: 1, status: 'Aprobado' },
      { id: 'A1-02', name: 'Contabilidad I', grade: 6.2, semester: 1, status: 'Aprobado' },
      { id: 'A2-01', name: 'Macroeconomía', grade: 5.8, semester: 2, status: 'Aprobado' },
      { id: 'A2-02', name: 'Contabilidad II', grade: 5.5, semester: 2, status: 'Aprobado' },
      { id: 'A3-01', name: 'Finanzas Corporativas', grade: 6.0, semester: 3, status: 'Aprobado' },
      { id: 'A3-02', name: 'Microeconomía', grade: 5.0, semester: 3, status: 'Aprobado' },
      { id: 'A4-01', name: 'Marketing Digital', grade: 8.8, semester: 4, status: 'Aprobado' },
      { id: 'A4-02', name: 'Gestión de Operaciones', grade: 7.0, semester: 4, status: 'Aprobado' },
      { id: 'A5-01', name: 'Recursos Humanos', grade: 8.2, semester: 5, status: 'Aprobado' },
      { id: 'A5-02', name: 'Dirección Estratégica', grade: 7.5, semester: 5, status: 'Aprobado' },
      { id: 'A6-01', name: 'Formulación de Proyectos', grade: 7.2, semester: 6, status: 'Cursando' },
      { id: 'A6-02', name: 'Derecho Comercial', grade: 6.5, semester: 6, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 7.1 },
      { semester: 2, averageGrade: 5.65 },
      { semester: 3, averageGrade: 5.5 },
      { semester: 4, averageGrade: 7.9 },
      { semester: 5, averageGrade: 7.85 },
      { semester: 6, averageGrade: 6.85 }
    ],
    skills: [
      { category: 'Lógica', score: 6.5 },
      { category: 'Diseño', score: 7.0 },
      { category: 'Trabajo Equipo', score: 8.5 },
      { category: 'Teórica', score: 6.2 },
      { category: 'Investigación', score: 6.0 }
    ],
    recommendation: 'Se observa una gran mejoría en las asignaturas de marketing y dirección. No obstante, debe reforzar la rama de análisis contable-financiero.'
  },
  {
    id: 'EST-2024-006',
    name: 'Juan Pérez Alarcón',
    email: 'juan.perez@universidad.edu',
    avatarColor: 'from-cyan-500 to-blue-500',
    career: 'Medicina y Cirugía',
    semester: 8,
    overallAverage: 9.1,
    status: 'Activo',
    subjects: [
      { id: 'M1-01', name: 'Anatomía Humana I', grade: 8.5, semester: 1, status: 'Aprobado' },
      { id: 'M1-02', name: 'Histología Básica', grade: 9.0, semester: 1, status: 'Aprobado' },
      { id: 'M2-01', name: 'Anatomía Humana II', grade: 8.8, semester: 2, status: 'Aprobado' },
      { id: 'M2-02', name: 'Fisiología Médica I', grade: 8.4, semester: 2, status: 'Aprobado' },
      { id: 'M3-01', name: 'Fisiología Médica II', grade: 9.2, semester: 3, status: 'Aprobado' },
      { id: 'M3-02', name: 'Bioquímica Clínica', grade: 9.5, semester: 3, status: 'Aprobado' },
      { id: 'M4-01', name: 'Farmacología General', grade: 9.0, semester: 4, status: 'Aprobado' },
      { id: 'M4-02', name: 'Patología Humana', grade: 9.1, semester: 4, status: 'Aprobado' },
      { id: 'M5-01', name: 'Semiología Médica', grade: 9.3, semester: 5, status: 'Aprobado' },
      { id: 'M6-01', name: 'Medicina Interna I', grade: 9.4, semester: 6, status: 'Aprobado' },
      { id: 'M7-01', name: 'Pediatría', grade: 9.6, semester: 7, status: 'Aprobado' },
      { id: 'M8-01', name: 'Ginecología y Obstetricia', grade: 9.2, semester: 8, status: 'Cursando' },
      { id: 'M8-02', name: 'Cirugía General', grade: 9.5, semester: 8, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 8.75 },
      { semester: 2, averageGrade: 8.6 },
      { semester: 3, averageGrade: 9.35 },
      { semester: 4, averageGrade: 9.05 },
      { semester: 5, averageGrade: 9.3 },
      { semester: 6, averageGrade: 9.4 },
      { semester: 7, averageGrade: 9.6 },
      { semester: 8, averageGrade: 9.35 }
    ],
    skills: [
      { category: 'Lógica', score: 8.5 },
      { category: 'Diseño', score: 5.0 },
      { category: 'Trabajo Equipo', score: 9.2 },
      { category: 'Teórica', score: 9.7 },
      { category: 'Investigación', score: 9.4 }
    ],
    recommendation: 'Excelente desempeño académico y gran vocación clínica constatada por sus docentes de campos clínicos.'
  },
  {
    id: 'EST-2024-007',
    name: 'Lucía Torres Mendoza',
    email: 'lucia.torres@universidad.edu',
    avatarColor: 'from-violet-500 to-purple-500',
    career: 'Biotecnología',
    semester: 2,
    overallAverage: 8.8,
    status: 'Activo',
    subjects: [
      { id: 'B1-01', name: 'Química General', grade: 8.5, semester: 1, status: 'Aprobado' },
      { id: 'B1-02', name: 'Biología Celular', grade: 9.0, semester: 1, status: 'Aprobado' },
      { id: 'B2-01', name: 'Química Orgánica', grade: 8.3, semester: 2, status: 'Cursando' },
      { id: 'B2-02', name: 'Genética General', grade: 9.2, semester: 2, status: 'Cursando' },
      { id: 'B2-03', name: 'Matemática Aplicada', grade: 8.6, semester: 2, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 8.75 },
      { semester: 2, averageGrade: 8.7 }
    ],
    skills: [
      { category: 'Lógica', score: 8.8 },
      { category: 'Diseño', score: 6.0 },
      { category: 'Trabajo Equipo', score: 8.0 },
      { category: 'Teórica', score: 8.5 },
      { category: 'Investigación', score: 9.3 }
    ],
    recommendation: 'Comienzo de carrera muy prometedor con notas de primer nivel en química y biología celular.'
  },
  {
    id: 'EST-2024-008',
    name: 'Nicolás Castro Peña',
    email: 'nicolas.castro@universidad.edu',
    avatarColor: 'from-orange-500 to-red-500',
    career: 'Administración de Empresas',
    semester: 8,
    overallAverage: 9.2,
    status: 'Graduado',
    subjects: [
      { id: 'A1-01', name: 'Fundamentos de Admin.', grade: 9.0, semester: 1, status: 'Aprobado' },
      { id: 'A1-02', name: 'Contabilidad I', grade: 8.5, semester: 1, status: 'Aprobado' },
      { id: 'A2-01', name: 'Macroeconomía', grade: 9.2, semester: 2, status: 'Aprobado' },
      { id: 'A3-01', name: 'Finanzas Corporativas', grade: 9.0, semester: 3, status: 'Aprobado' },
      { id: 'A4-01', name: 'Marketing Digital', grade: 9.6, semester: 4, status: 'Aprobado' },
      { id: 'A5-01', name: 'Recursos Humanos', grade: 9.4, semester: 5, status: 'Aprobado' },
      { id: 'A6-01', name: 'Formulación de Proyectos', grade: 9.3, semester: 6, status: 'Aprobado' },
      { id: 'A7-01', name: 'Liderazgo y Negociación', grade: 9.5, semester: 7, status: 'Aprobado' },
      { id: 'A8-01', name: 'Seminario de Grado', grade: 9.7, semester: 8, status: 'Aprobado' }
    ],
    progress: [
      { semester: 1, averageGrade: 8.75 },
      { semester: 2, averageGrade: 9.2 },
      { semester: 3, averageGrade: 9.0 },
      { semester: 4, averageGrade: 9.6 },
      { semester: 5, averageGrade: 9.4 },
      { semester: 6, averageGrade: 9.3 },
      { semester: 7, averageGrade: 9.5 },
      { semester: 8, averageGrade: 9.7 }
    ],
    skills: [
      { category: 'Lógica', score: 8.9 },
      { category: 'Diseño', score: 7.8 },
      { category: 'Trabajo Equipo', score: 9.8 },
      { category: 'Teórica', score: 9.2 },
      { category: 'Investigación', score: 8.8 }
    ],
    recommendation: 'Estudiante graduado con honores. Ha finalizado satisfactoriamente su plan curricular con un promedio sobresaliente.'
  },
  {
    id: 'EST-2024-009',
    name: 'Isabella Morales Ruiz',
    email: 'isabella.morales@universidad.edu',
    avatarColor: 'from-emerald-500 to-green-500',
    career: 'Medicina y Cirugía',
    semester: 4,
    overallAverage: 6.3,
    status: 'Condicional',
    subjects: [
      { id: 'M1-01', name: 'Anatomía Humana I', grade: 6.8, semester: 1, status: 'Aprobado' },
      { id: 'M1-02', name: 'Histología Básica', grade: 6.5, semester: 1, status: 'Aprobado' },
      { id: 'M2-01', name: 'Anatomía Humana II', grade: 5.9, semester: 2, status: 'Aprobado' },
      { id: 'M2-02', name: 'Fisiología Médica I', grade: 5.5, semester: 2, status: 'Aprobado' },
      { id: 'M3-01', name: 'Fisiología Médica II', grade: 6.2, semester: 3, status: 'Aprobado' },
      { id: 'M3-02', name: 'Bioquímica Clínica', grade: 6.0, semester: 3, status: 'Aprobado' },
      { id: 'M4-01', name: 'Farmacología General', grade: 6.1, semester: 4, status: 'Cursando' },
      { id: 'M4-02', name: 'Patología Humana', grade: 6.8, semester: 4, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 6.65 },
      { semester: 2, averageGrade: 5.7 },
      { semester: 3, averageGrade: 6.1 },
      { semester: 4, averageGrade: 6.45 }
    ],
    skills: [
      { category: 'Lógica', score: 6.0 },
      { category: 'Diseño', score: 5.0 },
      { category: 'Trabajo Equipo', score: 8.2 },
      { category: 'Teórica', score: 6.8 },
      { category: 'Investigación', score: 6.2 }
    ],
    recommendation: 'Mantiene una situación académica limítrofe en áreas teóricas. Se sugiere seguimiento psicoeducativo para manejo de ansiedad ante exámenes.'
  },
  {
    id: 'EST-2024-010',
    name: 'Lucas Romero Delgado',
    email: 'lucas.romero@universidad.edu',
    avatarColor: 'from-amber-500 to-yellow-500',
    career: 'Ingeniería en Software',
    semester: 2,
    overallAverage: 8.5,
    status: 'Activo',
    subjects: [
      { id: 'S1-01', name: 'Programación I', grade: 9.0, semester: 1, status: 'Aprobado' },
      { id: 'S1-02', name: 'Cálculo Diferencial', grade: 7.2, semester: 1, status: 'Aprobado' },
      { id: 'S2-01', name: 'Programación II', grade: 8.8, semester: 2, status: 'Cursando' },
      { id: 'S2-02', name: 'Estructuras de Datos', grade: 8.2, semester: 2, status: 'Cursando' },
      { id: 'S2-03', name: 'Álgebra de Vectores', grade: 9.1, semester: 2, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 8.1 },
      { semester: 2, averageGrade: 8.7 }
    ],
    skills: [
      { category: 'Lógica', score: 9.0 },
      { category: 'Diseño', score: 6.5 },
      { category: 'Trabajo Equipo', score: 8.2 },
      { category: 'Teórica', score: 8.0 },
      { category: 'Investigación', score: 7.8 }
    ],
    recommendation: 'Excelente aptitud técnica en lógica y programación. Puede postularse como tutor para el curso inicial de Programación I.'
  },
  {
    id: 'EST-2024-011',
    name: 'Elena Ortiz Varela',
    email: 'elena.ortiz@universidad.edu',
    avatarColor: 'from-teal-500 to-emerald-500',
    career: 'Diseño de Experiencia de Usuario (UX)',
    semester: 5,
    overallAverage: 7.2,
    status: 'Activo',
    subjects: [
      { id: 'D1-01', name: 'Fundamentos del Diseño', grade: 8.0, semester: 1, status: 'Aprobado' },
      { id: 'D1-02', name: 'Psicología Cognitiva', grade: 6.8, semester: 1, status: 'Aprobado' },
      { id: 'D2-01', name: 'Diseño de Interfaz I', grade: 7.5, semester: 2, status: 'Aprobado' },
      { id: 'D2-02', name: 'Investigación de Usuarios', grade: 7.0, semester: 2, status: 'Aprobado' },
      { id: 'D3-01', name: 'Diseño de Interfaz II', grade: 6.5, semester: 3, status: 'Aprobado' },
      { id: 'D3-02', name: 'Arquitectura de Información', grade: 7.2, semester: 3, status: 'Aprobado' },
      { id: 'D4-01', name: 'Usabilidad y Testeo', grade: 7.4, semester: 4, status: 'Aprobado' },
      { id: 'D4-02', name: 'Prototipado Rápido', grade: 7.0, semester: 4, status: 'Aprobado' },
      { id: 'D5-01', name: 'Diseño para Móviles', grade: 7.5, semester: 5, status: 'Cursando' },
      { id: 'D5-02', name: 'Sistemas de Diseño', grade: 7.3, semester: 5, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 7.4 },
      { semester: 2, averageGrade: 7.25 },
      { semester: 3, averageGrade: 6.85 },
      { semester: 4, averageGrade: 7.2 },
      { semester: 5, averageGrade: 7.4 }
    ],
    skills: [
      { category: 'Lógica', score: 6.5 },
      { category: 'Diseño', score: 8.0 },
      { category: 'Trabajo Equipo', score: 7.2 },
      { category: 'Teórica', score: 7.0 },
      { category: 'Investigación', score: 7.5 }
    ],
    recommendation: 'Estudiante con desempeño estable y correcto avance. Muestra interés por el prototipado y pruebas con usuarios reales.'
  },
  {
    id: 'EST-2024-012',
    name: 'Joaquín Herrera Díaz',
    email: 'joaquin.herrera@universidad.edu',
    avatarColor: 'from-blue-600 to-cyan-500',
    career: 'Ingeniería en Software',
    semester: 4,
    overallAverage: 4.8,
    status: 'En Riesgo',
    subjects: [
      { id: 'S1-01', name: 'Programación I', grade: 5.5, semester: 1, status: 'Aprobado' },
      { id: 'S1-02', name: 'Cálculo Diferencial', grade: 4.2, semester: 1, status: 'Reprobado' },
      { id: 'S2-01', name: 'Programación II', grade: 5.0, semester: 2, status: 'Aprobado' },
      { id: 'S2-02', name: 'Cálculo Diferencial (R)', grade: 4.5, semester: 2, status: 'Reprobado' },
      { id: 'S3-01', name: 'Cálculo Diferencial (3a)', grade: 5.5, semester: 3, status: 'Aprobado' },
      { id: 'S3-02', name: 'Estructuras de Datos', grade: 4.0, semester: 3, status: 'Reprobado' },
      { id: 'S4-01', name: 'Bases de Datos I', grade: 4.8, semester: 4, status: 'Cursando' },
      { id: 'S4-02', name: 'Estructuras de Datos (R)', grade: 5.1, semester: 4, status: 'Cursando' },
      { id: 'S4-03', name: 'Cálculo Integral', grade: 4.2, semester: 4, status: 'Cursando' }
    ],
    progress: [
      { semester: 1, averageGrade: 4.85 },
      { semester: 2, averageGrade: 4.75 },
      { semester: 3, averageGrade: 4.75 },
      { semester: 4, averageGrade: 4.7 }
    ],
    skills: [
      { category: 'Lógica', score: 5.2 },
      { category: 'Diseño', score: 5.0 },
      { category: 'Trabajo Equipo', score: 6.5 },
      { category: 'Teórica', score: 4.0 },
      { category: 'Investigación', score: 4.5 }
    ],
    recommendation: 'Situación de riesgo severo por reprobación reiterada en Cálculo y Estructuras de Datos. Se requiere reunión urgente con director de carrera.'
  }
];
