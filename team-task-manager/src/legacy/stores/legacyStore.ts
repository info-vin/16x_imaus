import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { loadFromStorage, saveToStorage } from '../../utils/storage';

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

// --- Constants (self-contained for the legacy module) ---
const LEGACY_STORAGE_KEY = 'legacy-task-storage';
const LEGACY_TEAM_MEMBERS: User[] = [
  { id: 'user-1', name: 'esther' },
  { id: 'user-2', name: 'vincent' },
  { id: 'user-3', name: 'chris' },
];

export interface LegacyState {
  tasks: Task[];
  users: User[];
  currentUser: string | null;
  filters: Filters;
  isInitialized: boolean;
  init: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  setCurrentUser: (userId: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  importTasks: (tasks: Task[]) => void; // For potential testing/setup
}


// --- Zustand Store Definition ---
const useLegacyStore = create<LegacyState>((set, get) => ({
  tasks: [],
  users: LEGACY_TEAM_MEMBERS,
  currentUser: null, // Default to null until initialized
  filters: {
    status: '',
    priority: '',
    search: '',
  },
  isInitialized: false,

  init: () => {
    if (get().isInitialized) return;
    try {
      const storedState = loadFromStorage<Partial<LegacyState>>(LEGACY_STORAGE_KEY, {});
      set({
        ...storedState,
        currentUser: storedState.currentUser || LEGACY_TEAM_MEMBERS[0].id,
        isInitialized: true,
      });
    } catch (error) {
      console.error("Failed to load from legacy storage:", error);
      // Set default state if loading fails
      set({ currentUser: LEGACY_TEAM_MEMBERS[0].id, isInitialized: true });
    }
  },

  // Actions
  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    saveToStorage(LEGACY_STORAGE_KEY, get());
  },

  updateTask: (updatedTask) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    set({ tasks: updatedTasks });
    saveToStorage(LEGACY_STORAGE_KEY, get());
  },

  deleteTask: (taskId) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== taskId);
    set({ tasks: updatedTasks });
    saveToStorage(LEGACY_STORAGE_KEY, get());
  },

  setCurrentUser: (userId) => {
    set({ currentUser: userId });
    saveToStorage(LEGACY_STORAGE_KEY, get());
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    // Note: Filtering doesn't need to persist the whole state again unless required.
  },
  
  importTasks: (tasks) => {
    set({ tasks: tasks });
    saveToStorage(LEGACY_STORAGE_KEY, get());
  }
}));

// Initialize the store on first load
useLegacyStore.getState().init();

export default useLegacyStore;