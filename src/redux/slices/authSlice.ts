import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as authApi from '@/api/auth';
import { User, ValidationErrors } from '@/types';

interface authState {
  error: null | string | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: authState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
        state.isLoading = false;
      })
      // signup
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
        state.isLoading = false;
      })
      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearUser, setError, setIsLoading, setIsAuthenticated } =
  authSlice.actions;

// Login
export const logIn = createAsyncThunk<
  User,
  { us_email: string; us_password: string },
  {
    rejectValue: ValidationErrors;
  }
>(
  'auth/signin',
  async (
    data: { us_email: string; us_password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.logIn(data);
      const { user } = response.data;
      if (user) {
        localStorage.setItem('userId', user._id);
      }
      return user;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Signup
export const signUp = createAsyncThunk<
  boolean,
  { us_email: string; us_password: string; us_confirm_password: string },
  {
    rejectValue: ValidationErrors;
  }
>(
  'auth/signup',
  async (
    data: {
      us_email: string;
      us_password: string;
      us_confirm_password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await authApi.signUp(data);
      return true;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch profile
export const fetchProfile = createAsyncThunk<User>(
  'auth/me',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();
      const { user } = response.data;
      return user;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        dispatch(logout()); // Dispatch logout on unauthorized
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await authApi.logout();
    dispatch(clearUser());
  }
);

export const authSelector = (state: { auth: authState }) => state.auth;

export default authSlice.reducer;
