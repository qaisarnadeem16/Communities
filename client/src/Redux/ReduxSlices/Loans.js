import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // You can use any HTTP library for making API calls
import { server } from '../../server';

const initialState = {
  loans: [],
  loading: false,
  error: null,
};

// Async thunk for fetching items
export const fetchLoans = createAsyncThunk('fetchLoans', async () => {
  try {
    const response =  await axios.get(`${server}/loan/getLoans`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loanSlice.reducer;
