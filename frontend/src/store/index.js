/**
 * Configura a store principal do Redux com vários reducers.
 */
import { configureStore } from '@reduxjs/toolkit';
import inconsistenciasReducer from './inconsistenciasSlice';
import formulariosReducer from './formulariosSlice';
import profissionaisReducer from './profissionaisSlice';
import setoresReducer from './setoresSlice'; // Importar o novos slice

// Importe outros slices conforme necessário

export const store = configureStore({
  reducer: {
    inconsistencias: inconsistenciasReducer,
    formularios: formulariosReducer,
    profissionais: profissionaisReducer,
    setores: setoresReducer, // Adicionar ao reducer
    // Adicione outros reducers aqui
  },
});
