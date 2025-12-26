export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  assignedUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    status: string;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
    total: number;
  };
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  assignedUserId: string;
  status: Task["status"];
}

export interface UpdateTaskPayload {
  id: string;
  title?: string;
  description?: string;
  assignedUserId?: string;
  status?: Task["status"];
}
