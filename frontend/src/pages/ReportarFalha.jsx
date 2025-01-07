/**
 * Componente "ReportarFalha" - Página responsável por registrar falhas/inconsistências
 * em um prontuário hospitalar, vinculando-as a um formulário e a um profissional.
 * 
 * Fluxo principal:
 *  1. Carrega dados (profissionais, formulários, inconsistências, setores) via Redux Thunks.
 *  2. Exibe dropdowns e campos de texto para o usuário preencher.
 *  3. Permite adicionar/remover inconsistências em uma lista local.
 *  4. Envia (dispara ação "createFormWithFailures") os dados consolidados para backend,
 *     criando um novo registro de formulário e suas falhas associadas.
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Ações importadas de diferentes slices do Redux
import { createFormWithFailures } from '../store/formulariosSlice'; 
import { fetchProfissionais } from '../store/profissionaisSlice';
import { fetchFormularios } from '../store/formulariosSlice';
import { fetchInconsistencias } from '../store/inconsistenciasSlice';
import { fetchSectors } from '../store/setoresSlice'; 

function ReportarFalha() {
  const dispatch = useDispatch();

  // -------------------------------------------
  // Estados locais do componente
  // -------------------------------------------

  // Armazena o ID do profissional selecionado
  const [selectedProfissional, setSelectedProfissional] = useState('');

  // Campo para inserir manualmente o código do prontuário
  const [cdProntuario, setCdProntuario] = useState('');

  // Tipo de formulário (ou tipo de documento) selecionado
  const [selectedFormulario, setSelectedFormulario] = useState('');

  // "Inconsistência selecionada" - usada antes de adicionarmos ao array
  const [selectedInconsistencia, setSelectedInconsistencia] = useState('');

  // Lista de inconsistências adicionadas (array de IDs)
  const [listaInconsistencias, setListaInconsistencias] = useState([]);

  // Setor selecionado para associar à falha
  const [selectedSetor, setSelectedSetor] = useState('');

  // Observações adicionais inseridas pelo usuário
  const [observacoes, setObservacoes] = useState('');

  // Controle de estado de carregamento (para desabilitar botão/enviar spinner)
  const [loading, setLoading] = useState(false);

  // Armazenar mensagem de erro, se ocorrer
  const [error, setError] = useState(null);

  // -------------------------------------------
  // Acessando dados do Redux
  // -------------------------------------------
  // Slices diferentes que contêm listas de dados (profissionais, formulários, etc.)
  const profissionais = useSelector((state) => state.profissionais.list);
  const formularios = useSelector((state) => state.formularios.list);
  const inconsistenciasDisponiveis = useSelector((state) => state.inconsistencias.list);
  const setores = useSelector((state) => state.setores.list);

  // -------------------------------------------
  // Efeito para carregar dados iniciais
  // -------------------------------------------
  // Assim que o componente monta, chamamos as thunks para popular Redux com dados
  useEffect(() => {
    dispatch(fetchProfissionais());    // Carrega profissionais (responsáveis)
    dispatch(fetchFormularios());      // Carrega tipos de formulários
    dispatch(fetchInconsistencias());  // Carrega tipos de inconsistências
    dispatch(fetchSectors());          // Carrega setores
  }, [dispatch]);

  useEffect(() => {
    console.log('Inconsistências disponíveis:', inconsistenciasDisponiveis);
    console.log('Lista de inconsistências:', listaInconsistencias);
  }, [inconsistenciasDisponiveis, listaInconsistencias]);

  /**
   * handleAddInconsistencia
   * Adiciona a inconsistência selecionada ao array 'listaInconsistencias', 
   * desde que ela não esteja duplicada.
   */
  const handleAddInconsistencia = () => {
    if (selectedInconsistencia && !listaInconsistencias.includes(selectedInconsistencia)) {
      setListaInconsistencias([...listaInconsistencias, selectedInconsistencia]);
      setSelectedInconsistencia('');
    }
  };

  /**
   * handleRemoveInconsistencia
   * Remove uma inconsistência específica do array local.
   * @param {number} id - ID da inconsistência a remover
   */
  const handleRemoveInconsistencia = (id) => {
    setListaInconsistencias(listaInconsistencias.filter((inc) => inc !== id));
  };

  /**
   * handleSubmit
   * Principal função de envio do formulário. Faz validações mínimas,
   * compõe o objeto (formData) no formato que a API espera e 
   * chama a ação Redux que criará o Form + Falhas no backend.
   */
  const handleSubmit = async () => {
    // Verifica se todos os campos obrigatórios foram preenchidos
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

    // Monta o objeto que enviamos para o backend
    // "formData" inclui um array "failures" com 1 falha,
    // mas poderia ter várias se a lógica do sistema permitir.
    const formData = {
      description: 'Relatório de Falha', // Pode ser dinâmico, se necessário
      createUser: selectedProfissional,   // Usuário que criou este form
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
      // Dispara a action Redux que enviará POST para criar Form + Falhas
      await dispatch(createFormWithFailures(formData)).unwrap();

      // Se chegou até aqui sem erro, sinaliza sucesso ao usuário
      alert('Formulário e inconsistências reportadas com sucesso!');

      // Reseta todos os campos do formulário
      setSelectedProfissional('');
      setCdProntuario('');
      setSelectedFormulario('');
      setListaInconsistencias([]);
      setSelectedSetor('');
      setObservacoes('');

    } catch (err) {
      // Caso haja erro, logs no console e salvamos mensagem de erro no estado
      console.error('Erro ao reportar inconsistência:', err);
      setError('Erro ao reportar inconsistência.');
    } finally {
      setLoading(false);
    }
  };

  // Função para encontrar a inconsistência no array
  const encontrarInconsistencia = (id) => {
    return inconsistenciasDisponiveis.find(inc => 
      String(inc.id) === String(id)
    );
  };

  // -------------------------------------------
  // Renderização do JSX
  // -------------------------------------------
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Reportar Falha</h1>

      {/* Caso haja erro, mostra um parágrafo em vermelho */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Seção do Responsável (Profissional) */}
      <div className="mb-2">
        <label htmlFor="responsavel" className="block">Responsável:</label>
        <select
          id="responsavel"
          value={selectedProfissional}
          onChange={(e) => setSelectedProfissional(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
        >
          <option value="">Selecione</option>
          {/* Lista os profissionais vindos do Redux */}
          {profissionais.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Seção do Código do Prontuário */}
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

      {/* Seção do Tipo de Documento (Formulário) */}
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

      {/* Seção das Inconsistências: Adicionar / Remover */}
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
            {/* Filtrando as inconsistências que já foram adicionadas */}
            {inconsistenciasDisponiveis
              ?.filter(inc => !listaInconsistencias.includes(String(inc.id)))
              .map((inc) => (
                <option key={inc.id} value={inc.id}>
                  {inc.description}
                </option>
            ))}
          </select>

          {/* Botão para adicionar a inconsistência selecionada ao array local */}
          <button
            onClick={handleAddInconsistencia}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={!selectedInconsistencia}
          >
            Adicionar
          </button>
        </div>

        {/* Lista das inconsistências adicionadas */}
        <ul className="mt-2 list-disc list-inside">
          {listaInconsistencias.map((incId) => {
            const inconsistencia = encontrarInconsistencia(incId);
            
            return (
              <li key={incId} className="flex items-center justify-between">
                <span>
                  {inconsistencia ? inconsistencia.description : 'Inconsistência não encontrada'}
                </span>
                <button
                  onClick={() => handleRemoveInconsistencia(incId)}
                  className="text-red-500 hover:text-red-700"
                >
                  (Remover)
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Seção do Setor Responsável */}
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

      {/* Seção de Observações Adicionais */}
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

      {/* Botão de Envio */}
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
