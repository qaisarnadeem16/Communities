import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // You can use any HTTP library for making API calls
import { server } from '../../server';

const initialState = {
  loanPlans: [],
  loading: false,
  error: null,
};

// Async thunk for fetching items
export const fetchLoanPlans = createAsyncThunk('fetchLoanPlans', async () => {
  try {
    const response =  await axios.get(`${server}/loanPlan/getLoanPlan`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const loanPlanSlice = createSlice({
  name: 'loanPlans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.loanPlans = action.payload;
      })
      .addCase(fetchLoanPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loanPlanSlice.reducer;
