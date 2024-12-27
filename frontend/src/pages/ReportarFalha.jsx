// src/pages/ReportarFalha.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFormWithFailures } from '../store/formulariosSlice'; // Importar a ação correta
import { fetchProfissionais } from '../store/profissionaisSlice';
import { fetchFormularios } from '../store/formulariosSlice';
import { fetchInconsistencias } from '../store/inconsistenciasSlice';
import { fetchSectors } from '../store/setoresSlice'; // Supondo que há um slice para setores

function ReportarFalha() {
  const dispatch = useDispatch();

  // Estados locais
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [cdProntuario, setCdProntuario] = useState('');
  const [selectedFormulario, setSelectedFormulario] = useState('');
  const [selectedInconsistencia, setSelectedInconsistencia] = useState('');
  const [listaInconsistencias, setListaInconsistencias] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dados do Redux
  const profissionais = useSelector((state) => state.profissionais.list);
  const formularios = useSelector((state) => state.formularios.list);
  const inconsistenciasDisponiveis = useSelector((state) => state.inconsistencias.list);
  const setores = useSelector((state) => state.setores.list);

  // Fetch dados ao montar o componente
  useEffect(() => {
    dispatch(fetchProfissionais());
    dispatch(fetchFormularios());
    dispatch(fetchInconsistencias());
    dispatch(fetchSectors());
  }, [dispatch]);

  const handleAddInconsistencia = () => {
    if (selectedInconsistencia && !listaInconsistencias.includes(selectedInconsistencia)) {
      setListaInconsistencias([...listaInconsistencias, selectedInconsistencia]);
      setSelectedInconsistencia('');
    }
  };

  const handleRemoveInconsistencia = (id) => {
    setListaInconsistencias(listaInconsistencias.filter((inc) => inc !== id));
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (
      !selectedProfissional ||
      !cdProntuario ||
      !selectedFormulario ||
      listaInconsistencias.length === 0 ||
      !selectedSetor
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);

    // Estrutura de dados conforme a API espera
    const formData = {
      description: 'Relatório de Falha', // Pode ser dinâmico conforme necessário
      createUser: selectedProfissional,
      failures: [
        {
          prontuarioCode: cdProntuario,
          formularioDate: new Date(),
          professionalId: selectedProfissional,
          hospitalId: setores.find(s => s.id === selectedSetor)?.hospitalId || null,
          sectorId: selectedSetor,
          status: 'Aberto',
          observacoes,
          tpInconsistenciaIds: listaInconsistencias,
        },
      ],
    };

    try {
      await dispatch(createFormWithFailures(formData)).unwrap();
      alert('Formulário e inconsistências reportadas com sucesso!');
      // Resetar o formulário
      setSelectedProfissional('');
      setCdProntuario('');
      setSelectedFormulario('');
      setListaInconsistencias([]);
      setSelectedSetor('');
      setObservacoes('');
    } catch (err) {
      console.error('Erro ao reportar inconsistência:', err);
      setError('Erro ao reportar inconsistência.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Reportar Falha</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-2">
        <label htmlFor="responsavel" className="block">Responsável:</label>
        <select
          id="responsavel"
          value={selectedProfissional}
          onChange={(e) => setSelectedProfissional(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
        >
          <option value="">Selecione</option>
          {profissionais.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="prontuario" className="block">Código do Prontuário:</label>
        <input
          id="prontuario"
          type="number"
          value={cdProntuario}
          onChange={(e) => setCdProntuario(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
          placeholder="Digite o código do prontuário"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="formulario" className="block">Tipo de Documento:</label>
        <select
          id="formulario"
          value={selectedFormulario}
          onChange={(e) => setSelectedFormulario(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
        >
          <option value="">Selecione</option>
          {formularios.map((f) => (
            <option key={f.id} value={f.id}>
              {f.description}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="inconsistencia" className="block">Inconsistências:</label>
        <div className="flex items-center gap-2">
          <select
            id="inconsistencia"
            value={selectedInconsistencia}
            onChange={(e) => setSelectedInconsistencia(e.target.value)}
            className="p-1 border rounded w-full"
          >
            <option value="">Selecione</option>
            {inconsistenciasDisponiveis.map((i) => (
              <option key={i.id} value={i.id}>
                {i.description}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddInconsistencia}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={!selectedInconsistencia}
          >
            Adicionar
          </button>
        </div>
        <ul className="mt-2 list-disc list-inside">
          {listaInconsistencias.map((inc, idx) => {
            const inconsistencia = inconsistenciasDisponiveis.find((i) => i.id === inc);
            return (
              <li key={idx} className="flex items-center justify-between">
                <span>{inconsistencia ? inconsistencia.description : 'Inconsistência não encontrada'}</span>
                <button
                  onClick={() => handleRemoveInconsistencia(inc)}
                  className="text-red-500 hover:text-red-700"
                >
                  (Remover)
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mb-2">
        <label htmlFor="setor" className="block">Setor Responsável:</label>
        <select
          id="setor"
          value={selectedSetor}
          onChange={(e) => setSelectedSetor(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
        >
          <option value="">Selecione</option>
          {setores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="observacoes" className="block">Observações:</label>
        <textarea
          id="observacoes"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
          rows="4"
          placeholder="Digite suas observações"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
}

export default ReportarFalha;
