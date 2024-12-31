/**
 * Slice responsável por gerenciar a lista de profissionais (responsibles) no Redux.
 * Usa createAsyncThunk para buscar dados do backend.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk assíncrono para buscar a lista de responsáveis via GET /api/responsibles
export const fetchProfissionais = createAsyncThunk(
  'profissionais/fetchProfissionais',
  async () => {
    // Ajuste a baseURL no axios conforme seu setup (pode ser 'http://localhost:5000/api')
    const response = await axios.get('/api/responsibles');
    return response.data;
  }
);

const profissionaisSlice = createSlice({
  name: 'profissionais',
  initialState: {
    list: [],      // Armazena a lista de profissionais
    status: 'idle',// 'idle' | 'loading' | 'succeeded' | 'failed'
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
        state.list = action.payload; // Recebe a lista do backend
      })
      .addCase(fetchProfissionais.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profissionaisSlice.reducer;
