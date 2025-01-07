/**
 * Slice para inconsistências de prontuário (TPInconsistencies).
 * - fetchInconsistencias() carrega dados via GET /tp-inconsistencies
 * - addInconsistencia() chama POST /tp-inconsistencies
 * - updateInconsistencia() chama PUT /tp-inconsistencies/:id
 * - removeInconsistencia() deleta /tp-inconsistencies/:id
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // axios configurado com baseURL

// Carrega a lista de TPInconsistencies do backend
export const fetchInconsistencias = createAsyncThunk(
  'inconsistencias/fetchInconsistencias',
  async () => {
    // GET /api/tp-inconsistencies
    const response = await api.get('/tp-inconsistencies');
    // Transforma o objeto em array se necessário
    const data = Array.isArray(response.data) ? response.data : Object.values(response.data);
    return data;
  }
);

// Cria (POST) uma "inconsistência"
export const addInconsistencia = createAsyncThunk(
  'inconsistencias/addInconsistencia',
  async (novaInconsistencia) => {
    // POST /api/tp-inconsistencies
    const response = await api.post('/tp-inconsistencies', novaInconsistencia);
    return response.data;
  }
);

// Atualiza (PUT) uma "inconsistência"
export const updateInconsistencia = createAsyncThunk(
  'inconsistencias/updateInconsistencia',
  async ({ id, data }) => {
    // PUT /api/tp-inconsistencies/:id
    const response = await api.put(`/tp-inconsistencies/${id}`, data);
    return response.data;
  }
);

// Remove (DELETE) uma "inconsistência"
export const removeInconsistencia = createAsyncThunk(
  'inconsistencias/removeInconsistencia',
  async (id) => {
    // DELETE /api/tp-inconsistencies/:id
    await api.delete(`/tp-inconsistencies/${id}`);
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
      // Carregar Inconsistências
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

      // Adicionar Inconsistência
      .addCase(addInconsistencia.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Atualizar Inconsistência
      .addCase(updateInconsistencia.fulfilled, (state, action) => {
        const index = state.list.findIndex((inc) => inc.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Remover Inconsistência
      .addCase(removeInconsistencia.fulfilled, (state, action) => {
        state.list = state.list.filter((inc) => inc.id !== action.payload);
      });
  },
});

export default inconsistenciasSlice.reducer;
