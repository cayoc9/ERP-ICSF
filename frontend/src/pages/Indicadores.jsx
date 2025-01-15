import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStartDate,
  setEndDate,
  setSector,
  setProfessional,
  setStatus,
  resetFilters
} from '../store/filtersSlice';
import LineGraph from '../components/charts/LineGraph';
import PieGraph from '../components/charts/PieGraph';
import BarGraph from '../components/charts/BarGraph';

// Mock data for dropdowns
const MOCK_SECTORS = [
  'Centro Cirúrgico',
  '2º Andar Ginecologia',
  'UTI Adulto',
  'Pronto Socorro',
  'Ambulatório'
];

const MOCK_PROFESSIONALS = [
  'Dr. Silva (Médico)',
  'Enf. Santos (Enfermeiro)',
  'Dr. Oliveira (Médico)',
  'Téc. Costa (Técnico)',
  'Enf. Lima (Enfermeiro)'
];

const MOCK_STATUS = [
  'Todos',
  'Pendente',
  'Resolvido'
];

// Mock data for charts
const mockData = {
  monthlyResolved: [
    { month: 'Jan', value: 10 },
    { month: 'Fev', value: 15 },
    { month: 'Mar', value: 12 },
    { month: 'Abr', value: 18 },
    { month: 'Mai', value: 22 },
    { month: 'Jun', value: 20 },
  ],
};

function Indicadores() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Indicadores</h1>
      
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Filtros</h2>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Limpar Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => dispatch(setStartDate(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Data Final</label>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => dispatch(setEndDate(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Sector Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Setor</label>
            <select
              value={filters.sector}
              onChange={(e) => dispatch(setSector(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Todos os Setores</option>
              {MOCK_SECTORS.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>

          {/* Professional Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Profissional</label>
            <select
              value={filters.professional}
              onChange={(e) => dispatch(setProfessional(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Todos os Profissionais</option>
              {MOCK_PROFESSIONALS.map((professional) => (
                <option key={professional} value={professional}>{professional}</option>
              ))}
            </select>
          </div>
      )}

      {status === 'succeeded' && (
        <div className="table-container">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead>
                <tr className="bg-secondary-50">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Prontuário
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Setor
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {list.map((inc) => (
                  <tr key={inc.id} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {inc.prontuarioCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${inc.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 
                          inc.status === 'Resolvido' ? 'bg-green-100 text-green-800' : 
                          'bg-secondary-100 text-secondary-800'}`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {inc.hospitalName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {inc.sectorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemove(inc.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineGraph 
          data={mockData.monthlyResolved} 
          title="Evolução Mensal de Inconsistências"
        />
      </div>
    </div>
  );
}

export default Indicadores;