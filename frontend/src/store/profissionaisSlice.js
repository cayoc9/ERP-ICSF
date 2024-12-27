// src/store/profissionaisSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunks
export const fetchProfissionais = createAsyncThunk(
  'profissionais/fetchProfissionais',
  async () => {
    const response = await api.get('/responsibles'); // GET /api/responsibles
    return response.data;
  }
);

const profissionaisSlice = createSlice({
  name: 'profissionais',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfissionais.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfissionais.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProfissionais.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profissionaisSlice.reducer;
