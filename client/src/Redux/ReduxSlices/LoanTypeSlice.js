import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // You can use any HTTP library for making API calls
import { server } from '../../server';

const initialState = {
  loanTypes: [],
  loading: false,
  error: null,
};

// Async thunk for fetching items
export const fetchLoanTypes = createAsyncThunk('fetchLoanTypes', async () => {
  try {
    const response =  await axios.get(`${server}/loanType/getLoanType`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const loanTypesSlice = createSlice({
  name: 'loanTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.loanTypes = action.payload;
      })
      .addCase(fetchLoanTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loanTypesSlice.reducer;
