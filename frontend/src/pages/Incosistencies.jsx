import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFailure } from '../store/formulariosSlice';
import { fetchProfissionais } from '../store/profissionaisSlice';
import { fetchFormularios } from '../store/formulariosSlice';
import { fetchInconsistencias, fetchTiposInconsistencias } from '../store/inconsistenciasSlice';
import { fetchSectors } from '../store/setoresSlice';

function Incosistencies() {
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

  // Adicionar novo state para hospitalId
  const [hospitalId, setHospitalId] = useState(15); // ID fixo temporário

  // -------------------------------------------
  // Acessando dados do Redux
  // -------------------------------------------
  // Slices diferentes que contêm listas de dados (profissionais, formulários, etc.)
  const profissionais = useSelector((state) => state.profissionais.list);
  const formularios = useSelector((state) => state.formularios.list);
  const inconsistenciasDisponiveis = useSelector((state) => state.inconsistencias.tiposInconsistencias);
  const setores = useSelector((state) => state.setores.list);

  const formulariosStatus = useSelector((state) => state.formularios.status);
  const formulariosError = useSelector((state) => state.formularios.error);

  // -------------------------------------------
  // Efeito para carregar dados iniciais
  // -------------------------------------------
  // Assim que o componente monta, chamamos as thunks para popular Redux com dados
  useEffect(() => {
    dispatch(fetchProfissionais());
    dispatch(fetchFormularios());
    dispatch(fetchTiposInconsistencias()); // Adicionar esta chamada
    dispatch(fetchSectors());
  }, [dispatch]);

  useEffect(() => {
    console.log('Inconsistências disponíveis:', inconsistenciasDisponiveis);
    console.log('Lista de inconsistências:', listaInconsistencias);
    console.log('Formulários disponíveis:', formularios); // Adicione este log
  }, [inconsistenciasDisponiveis, listaInconsistencias, formularios]);

  useEffect(() => {
    if (formulariosStatus === 'failed' && formulariosError) {
      setError(formulariosError);
    }
  }, [formulariosStatus, formulariosError]);

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
    // Validar os dados do formulário
    if (!cdProntuario || !selectedFormulario || !selectedProfissional || !hospitalId || !selectedSetor) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);

    const failureData = {
      prontuarioCode: cdProntuario,
      formularioId: selectedFormulario,
      formularioDate: new Date(),
      professionalId: selectedProfissional,
      hospitalId: hospitalId,
      sectorId: selectedSetor,
      observacoes,
      tpInconsistenciaIds: listaInconsistencias,
      createUser: selectedProfissional
    };

    try {
      await dispatch(createFailure(failureData)).unwrap();

      // Resetar formulário após sucesso
      setCdProntuario('');
      setSelectedFormulario('');
      setSelectedProfissional('');
      setHospitalId('');
      setSelectedSetor('');
      setObservacoes('');
      setListaInconsistencias([]);

      alert('Falha reportada com sucesso!');
    } catch (error) {
      console.error('Erro ao reportar falha:', error);
      setError('Ocorreu um erro ao reportar a falha. Tente novamente.');
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Reportar Falha</h1>
        <p className="mt-2 text-secondary-600">Registre inconsistências encontradas em prontuários médicos</p>
      </div>

      <div className="form-container">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <div>
            <label htmlFor="responsavel">Responsável</label>
            <select
              id="responsavel"
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
            >
              <option value="">Selecione um responsável</option>
              {profissionais.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="prontuario">Código do Prontuário</label>
            <input
              id="prontuario"
              type="number"
              value={cdProntuario}
              onChange={(e) => setCdProntuario(e.target.value)}
              placeholder="Digite o código do prontuário"
            />
          </div>

          <div>
            <label htmlFor="formulario">Tipo de Documento</label>
            <select
              id="formulario"
              value={selectedFormulario}
              onChange={(e) => setSelectedFormulario(e.target.value)}
            >
              <option value="">Selecione o tipo de documento</option>
              {formularios.map((f) => (
                <option key={f.id} value={f.id}>{f.description}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Inconsistências</label>
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={selectedInconsistencia}
                  onChange={(e) => setSelectedInconsistencia(e.target.value)}
                  className="flex-1"
                >
                  <option value="">Selecione uma inconsistência</option>
                  {inconsistenciasDisponiveis
                    ?.filter(inc => !listaInconsistencias.includes(String(inc.id)))
                    .map((inc) => (
                      <option key={inc.id} value={inc.id}>{inc.description}</option>
                    ))}
                </select>
                <button
                  onClick={handleAddInconsistencia}
                  disabled={!selectedInconsistencia}
                  className="secondary whitespace-nowrap"
                >
                  Adicionar
                </button>
              </div>

              {listaInconsistencias.length > 0 && (
                <ul className="bg-secondary-50 rounded-lg divide-y divide-secondary-200">
                  {listaInconsistencias.map((incId) => {
                    const inconsistencia = encontrarInconsistencia(incId);
                    return (
                      <li key={incId} className="flex items-center justify-between p-3">
                        <span className="text-secondary-700">
                          {inconsistencia ? inconsistencia.description : 'Inconsistência não encontrada'}
                        </span>
                        <button
                          onClick={() => handleRemoveInconsistencia(incId)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remover
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="setor">Setor Responsável</label>
            <select
              id="setor"
              value={selectedSetor}
              onChange={(e) => setSelectedSetor(e.target.value)}
            >
              <option value="">Selecione o setor</option>
              {setores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows="4"
              placeholder="Digite suas observações adicionais"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full primary"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar Relatório'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Incosistencies;