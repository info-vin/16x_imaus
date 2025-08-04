import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Task, User } from '../types';
import { Priority, Status } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { STORAGE_KEYS, TEAM_MEMBERS } from '../constants';

interface AppState {
  tasks: Task[];
  currentUser: User | null;
  filters: {
    search: string;
    status: Status | 'all';
    priority: Priority | 'all';
    view: 'all' | 'my';
  };
  init: () => void;
  setCurrentUser: (user: User) => void;
  addTask: (
    newTaskData: Omit<
      Partial<Task>,
      'id' | 'createdAt' | 'updatedAt' | 'createdBy'
    > & { title: string; assigneeId: number },
  ) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilter: (filterName: keyof AppState['filters'], value: string) => void;
  getTasksForExport: () => Task[];
  importData: (tasks: Task[]) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  tasks: [],
  currentUser: null,
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    view: 'my',
  },

  init: () => {
    const savedTasks = loadFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);
    const savedUserId = loadFromStorage<number | null>(
      STORAGE_KEYS.CURRENT_USER_ID,
      null,
    );
    const user = TEAM_MEMBERS.find((u) => u.id === savedUserId) || null;

    set({
      tasks: savedTasks,
      currentUser: user,
      filters: { ...get().filters, view: user ? 'my' : 'all' },
    });
  },

  setCurrentUser: (user: User) => {
    set({ currentUser: user, filters: { ...get().filters, view: 'my' } });
    saveToStorage(STORAGE_KEYS.CURRENT_USER_ID, user.id);
  },

  addTask: (newTaskData) => {
    if (!get().currentUser) return;
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskData.title,
      description: newTaskData.description || '',
      status: newTaskData.status || Status.Pending,
      priority: newTaskData.priority || Priority.Medium,
      assigneeId: newTaskData.assigneeId,
      dueDate: newTaskData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: get().currentUser!.id,
    };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  },

  updateTask: (id, updates) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task,
    );
    set({ tasks: updatedTasks });
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  },

  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  },

  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));
  },

  getTasksForExport: () => {
    return get().tasks;
  },

  importData: (tasksToImport: Task[]) => {
    set({ tasks: tasksToImport });
    saveToStorage(STORAGE_KEYS.TASKS, tasksToImport);
  },
}));
