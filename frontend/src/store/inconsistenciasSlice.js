/**
 * Slice para gerenciar tanto tipos de inconsistências quanto falhas reportadas.
 * - fetchInconsistencias() carrega falhas via GET /failures
 * - fetchTiposInconsistencias() carrega tipos via GET /tp-inconsistencies
 * - addInconsistencia() cria via POST /tp-inconsistencies
 * - updateInconsistencia() atualiza via PUT /tp-inconsistencies/:id
 * - removeInconsistencia() remove via DELETE /tp-inconsistencies/:id
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // axios configurado com baseURL

// Carrega a lista de falhas para exibição na página de indicadores
export const fetchInconsistencias = createAsyncThunk(
  'inconsistencias/fetchInconsistencias',
  async () => {
    const response = await api.get('/failures');
    return response.data;
  }
);

// Nova action para carregar tipos de inconsistências
export const fetchTiposInconsistencias = createAsyncThunk(
  'inconsistencias/fetchTiposInconsistencias',
  async () => {
    const response = await api.get('/tp-inconsistencies');
    return response.data;
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
    list: [], // Lista de falhas para Indicadores.jsx
    tiposInconsistencias: [], // Nova lista para tipos de inconsistências
    status: 'idle',
    tiposStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Carregar Falhas (para Indicadores.jsx)
      .addCase(fetchInconsistencias.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInconsistencias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.map(item => ({
          id: item.id,
          prontuarioCode: item.prontuarioCode,
          status: item.status,
          hospitalName: item.hospital?.name || 'N/A', // Alterado
          sectorName: item.sector?.name || 'N/A',
          createDate: item.createDate,
          updateDate: item.updateDate
        }));
      })
      .addCase(fetchInconsistencias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Carregar Tipos de Inconsistências (para ReportarFalha.jsx)
      .addCase(fetchTiposInconsistencias.pending, (state) => {
        state.tiposStatus = 'loading';
      })
      .addCase(fetchTiposInconsistencias.fulfilled, (state, action) => {
        state.tiposStatus = 'succeeded';
        state.tiposInconsistencias = action.payload;
      })
      .addCase(fetchTiposInconsistencias.rejected, (state, action) => {
        state.tiposStatus = 'failed';
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
