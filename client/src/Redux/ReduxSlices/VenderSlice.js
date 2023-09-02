import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // You can use any HTTP library for making API calls
import { server } from '../../server';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk for fetching items
export const fetchVendor = createAsyncThunk('fetchVendor', async () => {
  try {
    const response =  await axios.get(`${server}/vendor/getAllVendors`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vendorSlice.reducer;
