export enum Status {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assigneeId: number;
  dueDate?: string; // Storing as ISO string for simplicity
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  createdBy: number;
}

export interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  avatar?: string;
}
