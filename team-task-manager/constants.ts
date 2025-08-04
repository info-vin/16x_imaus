import type { User } from './types';

export const TEAM_MEMBERS: User[] = [
  {
    id: 1,
    name: '張小明',
    initials: 'ZM',
    email: 'ming@company.com',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: 2,
    name: '李小華',
    initials: 'LH',
    email: 'hua@company.com',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: 3,
    name: 'John Smith',
    initials: 'JS',
    email: 'john@company.com',
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: 4,
    name: 'Emily White',
    initials: 'EW',
    email: 'emily@company.com',
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: 5,
    name: '佐藤 健',
    initials: 'S T',
    email: 'sato@company.com',
    avatar: 'https://i.pravatar.cc/150?u=5',
  },
  {
    id: 6,
    name: 'Maria Garcia',
    initials: 'MG',
    email: 'maria@company.com',
    avatar: 'https://i.pravatar.cc/150?u=6',
  },
];

export const STORAGE_KEYS = {
  TASKS: 'projectflow_tasks_v1',
  CURRENT_USER_ID: 'projectflow_current_user_id_v1',
};
