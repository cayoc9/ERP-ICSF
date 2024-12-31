/**
 * Lida com formulários, permitindo fetch e criação
 * incluindo falhas relacionadas ao formulário.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunks
export const fetchFormularios = createAsyncThunk(
  'formularios/fetchFormularios',
  async () => {
    const response = await api.get('/forms'); // GET /api/forms
    return response.data;
  }
);

export const createFormWithFailures = createAsyncThunk(
  'formularios/createFormWithFailures',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/forms/with-failures', formData); // POST /api/forms/with-failures
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const formulariosSlice = createSlice({
  name: 'formularios',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormularios.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormularios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchFormularios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFormWithFailures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFormWithFailures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createFormWithFailures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default formulariosSlice.reducer;
