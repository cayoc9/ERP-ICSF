// src/pages/HospitalGroups.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHospitalGroups, addHospitalGroup, removeHospitalGroup } from '../store/hospitalGroupsSlice';

function HospitalGroups() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.hospitalGroups);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHospitalGroups());
    }
  }, [status, dispatch]);

  const handleAdd = () => {
    const nome = prompt('Digite o nome do novo Grupo Hospitalar:');
    if (nome) {
      dispatch(addHospitalGroup({ DS_GRUPO_HOSPITAL: nome }));
    }
  };

  const handleRemove = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este grupo hospitalar?')) {
      dispatch(removeHospitalGroup(id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Grupos Hospitalares</h1>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'failed' && <p className="text-red-500">Erro: {error}</p>}
      {status === 'succeeded' && (
        <>
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
            Adicionar Grupo
          </button>
          {list.length > 0 ? (
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">ID</th>
                  <th className="border px-2 py-1">Grupo Hospitalar</th>
                  <th className="border px-2 py-1">Ações</th>
                </tr>
              </thead>
              <tbody>
                {list.map((grupo) => (
                  <tr key={grupo.id}>
                    <td className="border px-2 py-1">{grupo.id}</td>
                    <td className="border px-2 py-1">{grupo.DS_GRUPO_HOSPITAL}</td>
                    <td className="border px-2 py-1">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemove(grupo.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum grupo hospitalar encontrado.</p>
          )}
        </>
      )}
    </div>
  );
}

export default HospitalGroups;
