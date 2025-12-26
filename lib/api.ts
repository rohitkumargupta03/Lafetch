import {
  LoginCredentials,
  LoginResponse,
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  User,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new ApiError(response.status, error.message || "Request failed");
  }
  return response.json();
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Mock login - check credentials against db.json users
    const users = await apiRequest<User[]>("/users");
    const user = users.find(
      (u) =>
        u.email === credentials.email &&
        (u as any).password === credentials.password
    );

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    return {
      token: `mock-token-${user.id}-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
};

// Tasks API
export const tasksApi = {
  getTasks: async (params?: {
    search?: string;
    status?: string;
  }): Promise<Task[]> => {
    let url = "/tasks";
    const searchParams = new URLSearchParams();

    if (params?.search) {
      searchParams.append("title_like", params.search);
    }
    if (params?.status && params.status !== "all") {
      searchParams.append("status", params.status);
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return apiRequest<Task[]>(url);
  },

  getTaskById: async (id: string): Promise<Task> => {
    return apiRequest<Task>(`/tasks/${id}`);
  },

  createTask: async (task: CreateTaskPayload): Promise<Task> => {
    return apiRequest<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify({
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
  },

  updateTask: async ({ id, ...updates }: UpdateTaskPayload): Promise<Task> => {
    return apiRequest<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString(),
      }),
    });
  },

  deleteTask: async (id: string): Promise<void> => {
    return apiRequest<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};

// Users API
export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    return apiRequest<User[]>("/users");
  },

  getUserById: async (id: string): Promise<User> => {
    return apiRequest<User>(`/users/${id}`);
  },
};

export { ApiError };
