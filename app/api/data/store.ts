// In-memory data store for the API
// Note: This resets on each deployment. For persistent data, use a database.

import { Task, User } from "@/types";

// Extended user type with password for internal use
interface UserWithPassword extends User {
  password: string;
}

interface DataStore {
  users: UserWithPassword[];
  tasks: Task[];
}

// Initial data (same as db.json)
const initialData: DataStore = {
  users: [
    {
      id: "1",
      name: "John Admin",
      email: "admin@test.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: "2",
      name: "Jane User",
      email: "user@test.com",
      password: "user123",
      role: "user",
    },
    {
      id: "3",
      name: "Bob Smith",
      email: "bob@test.com",
      password: "bob123",
      role: "user",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Implement Authentication",
      description:
        "Create login and registration functionality with JWT tokens. Need to handle both email/password authentication and social login options.",
      status: "in-progress",
      assignedUserId: "2",
      createdAt: "2025-12-20T10:30:00Z",
      updatedAt: "2025-12-26T07:49:46.747Z",
    },
    {
      id: "2",
      title: "Design Database Schema",
      description:
        "Design and implement the database schema for the task management system including users, tasks, and project tables.",
      status: "in-progress",
      assignedUserId: "2",
      createdAt: "2025-12-18T09:00:00Z",
      updatedAt: "2025-12-27T06:07:34.700Z",
    },
    {
      id: "3",
      title: "Setup CI/CD Pipeline",
      description:
        "Configure continuous integration and deployment pipeline using GitHub Actions for automated testing and deployment.",
      status: "pending",
      assignedUserId: "3",
      createdAt: "2025-12-21T11:15:00Z",
      updatedAt: "2025-12-21T11:15:00Z",
    },
    {
      id: "4",
      title: "Write Unit Tests",
      description:
        "Write comprehensive unit tests for all components and utilities. Aim for at least 80% code coverage.",
      status: "pending",
      assignedUserId: "2",
      createdAt: "2025-12-22T13:30:00Z",
      updatedAt: "2025-12-22T13:30:00Z",
    },
    {
      id: "5",
      title: "Optimize Performance",
      description:
        "Analyze and optimize application performance. Focus on reducing bundle size and improving load times.",
      status: "completed",
      assignedUserId: "1",
      createdAt: "2025-12-23T08:00:00Z",
      updatedAt: "2025-12-26T08:59:25.827Z",
    },
    {
      id: "6",
      title: "Update Documentation",
      description:
        "Update project documentation including README, API docs, and user guides.",
      status: "pending",
      assignedUserId: "3",
      createdAt: "2025-12-24T15:20:00Z",
      updatedAt: "2025-12-24T15:20:00Z",
    },
    {
      id: "7",
      title: "Code Review",
      description:
        "Review pull requests and provide feedback on code quality, best practices, and potential improvements.",
      status: "in-progress",
      assignedUserId: "1",
      createdAt: "2025-12-25T09:00:00Z",
      updatedAt: "2025-12-25T09:00:00Z",
    },
  ],
};

// Create a copy of initial data
let dataStore: DataStore = JSON.parse(JSON.stringify(initialData));

export function getUsers(): UserWithPassword[] {
  return dataStore.users;
}

export function getUserById(id: string): UserWithPassword | undefined {
  return dataStore.users.find((user) => user.id === id);
}

export function getUserByEmail(email: string): UserWithPassword | undefined {
  return dataStore.users.find((user) => user.email === email);
}

export function getTasks(): Task[] {
  return dataStore.tasks;
}

export function getTaskById(id: string): Task | undefined {
  return dataStore.tasks.find((task) => task.id === id);
}

export function createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
  const newTask: Task = {
    ...task,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dataStore.tasks.push(newTask);
  return newTask;
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const index = dataStore.tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  dataStore.tasks[index] = {
    ...dataStore.tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return dataStore.tasks[index];
}

export function deleteTask(id: string): boolean {
  const index = dataStore.tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  dataStore.tasks.splice(index, 1);
  return true;
}

// Reset data to initial state (useful for testing)
export function resetData(): void {
  dataStore = JSON.parse(JSON.stringify(initialData));
}
