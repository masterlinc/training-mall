import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  role: 'student' | 'teacher' | 'admin';
  name: string;
  email: string;
  studentId?: string;
  teacherId?: string;
  university: string;
  faculty: string;
  avatar: string;
  phone: string;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
  trainingRecords: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
  completeCourse: (courseId: string) => void;
  addCertificate: (certId: string) => void;
  addTrainingRecord: (trainingId: string) => void;
}

const defaultUser: User = {
  id: 'user_001',
  role: 'student',
  name: '李明',
  email: 'liming@uni.edu.cn',
  studentId: '2021001234',
  university: '北京大学',
  faculty: '计算机科学与技术',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  phone: '138****5678',
  enrolledCourses: ['course_001', 'course_002'],
  completedCourses: ['course_003'],
  certificates: ['cert_001', 'cert_002'],
  trainingRecords: ['train_001']
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: defaultUser,
      isAuthenticated: true,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      enrollCourse: (courseId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                enrolledCourses: [...state.user.enrolledCourses, courseId],
              }
            : null,
        })),
      completeCourse: (courseId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                enrolledCourses: state.user.enrolledCourses.filter((id) => id !== courseId),
                completedCourses: [...state.user.completedCourses, courseId],
              }
            : null,
        })),
      addCertificate: (certId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                certificates: [...state.user.certificates, certId],
              }
            : null,
        })),
      addTrainingRecord: (trainingId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                trainingRecords: [...state.user.trainingRecords, trainingId],
              }
            : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface AppState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedUniversity: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedUniversity: (university: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  selectedUniversity: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedUniversity: (university) => set({ selectedUniversity: university }),
}));
