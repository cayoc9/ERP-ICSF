// src/pages/Indicadores.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInconsistencias, removeInconsistencia } from '../store/inconsistenciasSlice';

function Indicadores() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.inconsistencias);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInconsistencias());
    }
  }, [status, dispatch]);

  const handleRemove = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta inconsistência?')) {
      dispatch(removeInconsistencia(id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Inconsistências do Prontuário</h1>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'failed' && <p className="text-red-500">Erro: {error}</p>}
      {status === 'succeeded' && (
        list.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Prontuário</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Grupo Hospitalar</th>
                <th className="border px-2 py-1">Setor Responsável</th>
                <th className="border px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((inc) => (
                <tr key={inc.id}>
                  <td className="border px-2 py-1">{inc.CD_PRONTUARIO}</td>
                  <td className="border px-2 py-1">{inc.STATUS}</td>
                  <td className="border px-2 py-1">{inc.DS_GRUPO_HOSPITAL || 'N/A'}</td>
                  <td className="border px-2 py-1">{inc.DS_SETOR || 'N/A'}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(inc.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma inconsistência encontrada.</p>
        )
      )}
    </div>
  );
}

export default Indicadores;
