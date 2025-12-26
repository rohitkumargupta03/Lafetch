import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, User } from "@/types";
import { authApi } from "@/lib/api";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Load user from localStorage on initialization
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    try {
      initialState.user = JSON.parse(storedUser);
      initialState.token = storedToken;
      initialState.isAuthenticated = true;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
    }
  }
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  authApi.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
