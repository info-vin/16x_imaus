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

export interface FilterState {
  search: string;
  status: 'All' | 'To Do' | 'In Progress' | 'Done';
  priority: 'All' | 'Low' | 'Medium' | 'High';
  myTasks: boolean;
}

export interface SeminarCardProps {
  category: string;
  title: string;
  imageUrl?: string;
  startDate?: string;
  format?: string;
  organizer?: string;
  description?: string;
  systemTag?: string;
  speaker?: {
    avatar?: string;
    name: string;
    title?: string;
  };
  onDetailsClick: (htmlContent: string) => void;
  htmlContent: string;
}

export interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  avatar?: string;
}
