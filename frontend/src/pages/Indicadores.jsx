import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData, refreshChartData } from '../store/chartsSlice';
import { resetFilters } from '../store/filtersSlice';
import FiltersPanel from '../components/FiltersPanel';
import ChartGrid from '../components/ChartGrid';
import RefreshIcon from '@mui/icons-material/Refresh';

function Indicadores() {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const error = useSelector(state => state.charts.error);
  const filters = useSelector(state => state.filters);

  // Load initial data
  useEffect(() => {
    dispatch(fetchChartData(filters));
  }, [dispatch, filters]);

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(refreshChartData(filters)).unwrap();
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header with title and refresh button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Indicadores</h1>
          <p className="text-sm text-gray-600">
            Análise de inconsistências e taxa de resolução
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          <RefreshIcon className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erro ao carregar dados
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters panel */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>
          <FiltersPanel />
        </div>
      </div>

      {/* Charts grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Gráficos</h2>
          <ChartGrid />
        </div>
      </div>
    </div>
  );
}

export default Indicadores;