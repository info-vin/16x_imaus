import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// --- Types (self-contained for the legacy module) ---
export type Status = 'Todo' | 'InProgress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignee?: string; // User ID
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Filters {
  status: Status | '';
  priority: Priority | '';
  search: string;
}

export interface LegacyState {
  tasks: Task[];
  users: User[];
  currentUser: string | null;
  filters: Filters;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  setCurrentUser: (userId: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  importTasks: (tasks: Task[]) => void; // For potential testing/setup
}

// --- Constants (self-contained for the legacy module) ---
const LEGACY_TEAM_MEMBERS: User[] = [
  { id: 'user-1', name: 'esther' },
  { id: 'user-2', name: 'vincent' },
  { id: 'user-3', name: 'chris' },
];

// --- Zustand Store Definition ---
const useLegacyStore = create<LegacyState>()(
  persist(
    (set, get) => ({
      tasks: [],
      users: LEGACY_TEAM_MEMBERS,
      currentUser: LEGACY_TEAM_MEMBERS[0].id, // Default to the first user
      filters: {
        status: '',
        priority: '',
        search: '',
      },

      // Actions
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      setCurrentUser: (userId) => {
        set({ currentUser: userId });
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },
      
      importTasks: (tasks) => {
        set({ tasks: tasks });
      }
    }),
    {
      name: 'legacy-task-storage', // Unique key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLegacyStore;
