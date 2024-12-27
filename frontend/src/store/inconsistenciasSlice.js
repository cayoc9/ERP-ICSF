// src/store/inconsistenciasSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunks para operações assíncronas
export const fetchInconsistencias = createAsyncThunk(
  'inconsistencias/fetchInconsistencias',
  async () => {
    const response = await api.get('/inconsistencias'); // GET /api/inconsistencias
    return response.data;
  }
);

export const addInconsistencia = createAsyncThunk(
  'inconsistencias/addInconsistencia',
  async (novaInconsistencia) => {
    const response = await api.post('/inconsistencias', novaInconsistencia); // POST /api/inconsistencias
    return response.data;
  }
);

export const removeInconsistencia = createAsyncThunk(
  'inconsistencias/removeInconsistencia',
  async (id) => {
    await api.delete(`/inconsistencias/${id}`); // DELETE /api/inconsistencias/:id
    return id;
  }
);

const inconsistenciasSlice = createSlice({
  name: 'inconsistencias',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Inconsistencias
      .addCase(fetchInconsistencias.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInconsistencias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchInconsistencias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Inconsistencia
      .addCase(addInconsistencia.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Remove Inconsistencia
      .addCase(removeInconsistencia.fulfilled, (state, action) => {
        state.list = state.list.filter((inc) => inc.id !== action.payload);
      });
  },
});

export default inconsistenciasSlice.reducer;
