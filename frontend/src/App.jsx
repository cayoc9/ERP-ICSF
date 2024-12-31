/**
 * Componente principal que define a estrutura básica:
 * Header fixo, Sidebar e conteúdo das rotas.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Indicadores from './pages/Indicadores';
import ReportarFalha from './pages/ReportarFalha';
import HospitalGroups from './pages/HospitalGroups'; // Nova página

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Indicadores />} />
            <Route path="/reportar" element={<ReportarFalha />} />
            <Route path="/hospital-groups" element={<HospitalGroups />} /> {/* Nova rota */}
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
