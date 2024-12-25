import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as errorApi from '@/api/error';
import { IError, ValidationErrors } from '@/types';

interface problemState {
  error: null | string | undefined;
  isLoading: boolean;
  problemList: IError[];
}

const initialState: problemState = {
  error: null,
  isLoading: false,
  problemList: [],
};

const problemSlice = createSlice({
  initialState,
  name: 'problem',
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setProblemList(state, action) {
      state.problemList = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(createProblem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProblem.fulfilled, (state, action) => {
        state.problemList = [action.payload, ...state.problemList];
        state.isLoading = false;
      })
      .addCase(createProblem.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
        state.isLoading = false;
      })
      // fetch problems
      .addCase(getProblems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProblems.fulfilled, (state, action) => {
        state.problemList = action.payload;
        state.isLoading = false;
      })
      .addCase(getProblems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setError, setIsLoading, setProblemList } = problemSlice.actions;

// createProblem
export const createProblem = createAsyncThunk<
  IError,
  { er_title: string; er_description: string; er_tags?: string[] },
  {
    rejectValue: ValidationErrors;
  }
>(
  'error/create',
  async (
    data: { er_title: string; er_description: string; er_tags?: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await errorApi.post(data);
      return response.data;
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
export const getProblems = createAsyncThunk<IError[]>(
  'error/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await errorApi.get();
      const data = response.data;
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const problemSelector = (state: { problem: problemState }) =>
  state.problem;

export default problemSlice.reducer;
