export type StudentStatus = 'Activo' | 'En Riesgo' | 'Graduado' | 'Condicional';
export type SubjectStatus = 'Aprobado' | 'Cursando' | 'Reprobado';

export interface Subject {
  id: string;
  name: string;
  grade: number; // Scale of 1.0 - 10.0
  semester: number;
  status: SubjectStatus;
}

export interface SemesterProgress {
  semester: number;
  averageGrade: number;
}

export interface StudentSkill {
  category: string;
  score: number; // 1 - 10
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatarColor: string; // CSS color class or hex
  career: string;
  semester: number;
  overallAverage: number;
  status: StudentStatus;
  subjects: Subject[];
  progress: SemesterProgress[];
  skills: StudentSkill[];
  recommendation: string;
}

export interface DashboardStats {
  totalStudents: number;
  averageGrade: number;
  approvalRate: number;
  atRiskCount: number;
}
