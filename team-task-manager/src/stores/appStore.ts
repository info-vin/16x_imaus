import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Task, User } from '../types';
import { Priority, Status } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

interface AppState {
  tasks: Task[];
  currentUser: User | null;
  teamMembers: User[]; // Add this
  viewMode: 'list' | 'kanban';
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
  fetchTasks: () => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  deleteTask: (id: string) => void;
  setFilter: (filterName: keyof AppState['filters'], value: string) => void;
  getTasksForExport: () => Task[];
  importData: (tasks: Task[]) => void;
  setViewMode: (mode: 'list' | 'kanban') => void;
  isTaskModalOpen: boolean;
  editingTask: Task | null;
  setTaskModalOpen: (isOpen: boolean) => void;
  setEditingTask: (task: Task | null) => void;
  fetchTeamMembers: () => Promise<void>; // Add this
  fetchTasks: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  tasks: [],
  currentUser: null,
  teamMembers: [],
  viewMode: 'kanban',
  isTaskModalOpen: false,
  editingTask: null,
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

    set({
      tasks: savedTasks,
    });

    if (savedUserId) {
      get().fetchTeamMembers().then(() => {
        const user = get().teamMembers.find((u) => u.id === savedUserId) || null;
        set({ currentUser: user });
      });
      get().fetchTasks();
    }
  },

  setCurrentUser: (user: User) => {
    set({ currentUser: user, filters: { ...get().filters, view: 'my' } });
    saveToStorage(STORAGE_KEYS.CURRENT_USER_ID, user.id);
  },

  fetchTasks: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/tasks', {
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },

  addTask: async (newTaskData) => {
    if (!get().currentUser) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      const updatedTasks = [...get().tasks, newTask];
      set({ tasks: updatedTasks });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },

  updateTask: async (id, updates) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:3001/api/tasks/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(updates),
        });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      const updatedTasks = get().tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      set({ tasks: updatedTasks });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  deleteTask: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:3001/api/tasks/${id}`,
        {
          method: 'DELETE',
          headers: {
            'x-auth-token': token,
          },
        });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      const updatedTasks = get().tasks.filter((task) => task.id !== id);
      set({ tasks: updatedTasks });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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

  setViewMode: (mode) => set({ viewMode: mode }),

  setTaskModalOpen: (isOpen) => set({ isTaskModalOpen: isOpen }),

  setEditingTask: (task) => set({ editingTask: task }),

  fetchTeamMembers: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/users', {
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const users = await response.json();
      // The backend returns user_id and user_name, we need to map to id and name
      const formattedUsers = users.map((u: any) => ({ id: u.user_id, name: u.user_name, email: u.user_email, avatar: u.avatar || `https://i.pravatar.cc/150?u=${u.user_id}` }));

      set({ teamMembers: formattedUsers });
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  },
}));
