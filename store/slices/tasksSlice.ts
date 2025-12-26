import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TaskState, Task, CreateTaskPayload, UpdateTaskPayload } from "@/types";
import { tasksApi } from "@/lib/api";

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "all",
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (
    params: { search?: string; status?: string } = {},
    { rejectWithValue }
  ) => {
    try {
      const tasks = await tasksApi.getTasks(params);
      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch tasks");
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: string, { rejectWithValue }) => {
    try {
      const task = await tasksApi.getTaskById(id);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch task");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: CreateTaskPayload, { rejectWithValue }) => {
    try {
      const newTask = await tasksApi.createTask(task);
      return newTask;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (payload: UpdateTaskPayload, { rejectWithValue }) => {
    try {
      const updatedTask = await tasksApi.updateTask(payload);
      return updatedTask;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete task");
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{ search?: string; status?: string }>
    ) => {
      if (action.payload.search !== undefined) {
        state.filters.search = action.payload.search;
      }
      if (action.payload.status !== undefined) {
        state.filters.status = action.payload.status;
      }
      state.pagination.currentPage = 1; // Reset to first page when filters change
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Task By ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.pagination.total -= 1;
        if (state.selectedTask?.id === action.payload) {
          state.selectedTask = null;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setSelectedTask, clearError, setPage } =
  tasksSlice.actions;
export default tasksSlice.reducer;
