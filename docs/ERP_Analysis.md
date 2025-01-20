# Análise Detalhada do Sistema ERP Hospitalar

## 1. Visão Geral
O sistema é um ERP (Enterprise Resource Planning) desenvolvido para ambiente hospitalar, focado no gerenciamento de inconsistências em prontuários médicos e geração de indicadores de qualidade.

## 2. Arquitetura do Sistema

### 2.1 Frontend
- Tecnologias: React.js, Redux, Axios, Material-UI, Tailwind CSS
- Estrutura:
  - Components/: Componentes reutilizáveis (Header, Sidebar)
  - Pages/: Páginas principais da aplicação
  - Store/: Gerenciamento de estado global com Redux
  - Services/: Comunicação com API

### 2.2 Backend
- Tecnologias: Node.js, Express, Sequelize (ORM), PostgreSQL
- Estrutura:
  - Controllers/: Lógica de negócios
  - Models/: Definição das entidades
  - Routes/: Endpoints da API
  - Config/: Configurações do banco e ambiente

## 3. Funcionalidades Principais

### 3.1 Gestão de Inconsistências
- Interface dedicada para listagem e gerenciamento em `/inconsistencies`
- Sistema de seleção múltipla para resolução em lote
- Rastreamento de tempo em aberto por inconsistência
- Status de pendente/resolvido com indicador visual
- Filtragem por prontuário, status e setor

### 3.3 Indicadores e Relatórios
- Dashboard interativo em `/indicadores` com:
  - Gráfico de tendência de resoluções mensais
  - Distribuição por tipo de inconsistência
  - Análise por setor
  - Desempenho por profissional
- Painel de filtros para análise personalizada
- Sistema de atualização em tempo real dos dados
- Visualização responsiva dos gráficos

### 3.4 Recursos Técnicos
- Documentação via Swagger em `/api-docs`
- Sistema de logs para monitoramento
- Controle de CORS configurado
- Tratamento global de erros
- Paginação nas listagens
## 4. Modelos de Dados

### 4.1 Entidades Principais

#### HospitalGroup (Grupos Hospitalares)
- **Backend**: 
  - Modelo: [HospitalGroup](backend/models/HospitalGroup.js)
  - Campos: 
    - `id`: INTEGER, PK, autoincrement
    - `description`: STRING(20), not null
  - Campos de auditoria: padrão
  - Relacionamentos: 
    - Tem muitos `Hospital` (one-to-many)
- **Frontend**: 
  - Slice: [hospitalGroupsSlice](frontend/src/store/hospitalGroupsSlice.js)
  - Estado: `{ list: [], status: 'idle', error: null }`
  - Rota: `/api/hospital-groups`
  - Actions: `fetchHospitalGroups`, `addHospitalGroup`, `removeHospitalGroup`

#### Hospital (Unidades Hospitalares)
- **Backend**:
  - Modelo: [Hospital](backend/models/Hospital.js)
  - Campos: 
    - `id`: INTEGER, PK, autoincrement
    - `name`: STRING(60), not null
    - `groupId`: INTEGER, FK para HospitalGroup
    - `address`: STRING(255)
  - Relacionamentos:
    - Pertence a um `HospitalGroup` (many-to-one)
    - Tem muitos `Sector` (one-to-many)
    - Tem muitas `Failure` (one-to-many)
- **Frontend**: 
  - Gerenciado via store global
  - Rota: `/api/hospitals`
  - Actions: CRUD padrão

#### Sector (Setores)
- **Backend**:
  - Modelo: [Sector](backend/models/Sector.js)
  - Campos:
    - `id`: INTEGER, PK, autoincrement
    - `name`: STRING(100), not null
    - `hospitalId`: INTEGER, FK para Hospital
  - Relacionamentos:
    - Pertence a um `Hospital` (many-to-one)
    - Tem muitas `Failure` como reporter e responsible
- **Frontend**: 
  - Slice: [setoresSlice](frontend/src/store/setoresSlice.js)
  - Estado: `{ list: [], status: 'idle', error: null }`
  - Rota: `/api/sectors`
  - Actions: `fetchSectors` e CRUD padrão

#### Responsible (Profissionais)
- **Backend**:
  - Modelo: [Responsible](backend/models/Responsible.js)
  - Campos:
    - `id`: INTEGER, PK, autoincrement
    - `name`: STRING(30), not null
    - `role`: STRING(50), default 'Interno'
  - Relacionamentos:
    - Tem muitas `Failure` (one-to-many)
- **Frontend**:
  - Slice: [profissionaisSlice](frontend/src/store/profissionaisSlice.js)
  - Estado: `{ list: [], status: 'idle', error: null }`
  - Actions: `fetchProfissionais`

#### Failure (Falhas/Inconsistências)
- **Backend**:
  - Modelo: [Failure](backend/models/Failure.js)
  - Campos:
    - `id`: INTEGER, PK, autoincrement
    - `prontuarioCode`: STRING, not null
    - `formularioId`: INTEGER, FK para Form
    - `professionalId`: INTEGER, FK para Responsible
    - `hospitalId`: INTEGER, FK para Hospital
    - `sectorId`: INTEGER, FK para Sector
    - `status`: ENUM('PENDING', 'RESOLVED')
    - `observacoes`: TEXT
    - `resolvedAt`: DATE
    - `sectorReporterId`: INTEGER, FK para Sector
    - `sectorResponsibleId`: INTEGER, FK para Sector
  - Relacionamentos:
    - Muitos-para-muitos com `TPInconsistencies`
    - FK para `Hospital`, `Sector`, `Form`, `Responsible`
- **Frontend**:
  - Slice: [inconsistenciasSlice](frontend/src/store/inconsistenciasSlice.js)
  - Estado: 
    ```typescript
    {
      list: [],
      tiposInconsistencias: [],
      selectedIds: [],
      status: 'idle',
      error: null,
      page: 1,
      perPage: 10,
      totalItems: 0
    }
    ```
  - Actions: `fetchInconsistencias`, `addInconsistencia`, `updateInconsistencia`, `removeInconsistencia`, `resolveInconsistencias`

#### Form (Formulários)
- **Backend**:
  - Modelo: [Form](backend/models/Form.js)
  - Campos:
    - `id`: INTEGER, PK, autoincrement
    - `description`: STRING(30), not null
  - Relacionamentos:
    - Tem muitas `Failure` (one-to-many)
- **Frontend**:
  - Slice: [formulariosSlice](frontend/src/store/formulariosSlice.js)
  - Estado: `{ list: [], status: 'idle', error: null }`
  - Actions: `fetchFormularios`, `createFormWithFailures`

#### TPInconsistencies (Tipos de Inconsistências)
- **Backend**:
  - Modelo: [TPInconsistencies](backend/models/TP_Inconsistencies.js)
  - Campos:
    - `id`: INTEGER, PK, autoincrement
    - `description`: STRING(225), not null
    - `status`: BOOLEAN, not null
  - Relacionamentos:
    - Muitos-para-muitos com `Failure` via `FailureTPInconsistencies`
- **Frontend**:
  - Gerenciado via `inconsistenciasSlice.tiposInconsistencias`
  - Rota: `/api/tp-inconsistencies`
  - Actions: CRUD padrão

#### Indicator (Indicadores)
- **Backend**:
  - Modelo: [Indicator](backend/models/Indicator.js)
  - Campos:
    - `id`: UUID, PK
    - `name`: STRING(30), not null
    - `value`: DOUBLE, not null
    - `description`: TEXT
    - `status`: BOOLEAN, not null
- **Frontend**:
  - Processado via `chartsSlice`
  - Estado: Integrado com dados estatísticos
  - Transformações: Via `ChartFormatter`

### 4.2 Campos de Auditoria Comuns
```typescript
{
  createDate: DATE;
  createUser: INTEGER;
  updateDate: DATE;
  updateUser: INTEGER;
}
```

### 4.3 Integrações
- **API REST**:
  - Interceptors para debug (desenvolvimento)
  - Timeout configurável
  - Tratamento de erros centralizado
- **Redux**:
  - Store configurada com middleware serializável
  - Slices específicos por entidade
  - Thunks para operações assíncronas
- **Charts**:
  - Transformadores de dados dedicados
  - Cache de dados estatísticos
  - Atualizações reativas


## Fluxos de Trabalho

### 5.1 Registro de Falha

```mermaid
frontend -> backend -> database

1. Frontend (NewInconsistency.jsx):
- Interface de formulário com campos:
  - Prontuário (cdProntuario)
  - Formulário (selectedFormulario) 
  - Setor (selectedSetor)
  - Tipos de Inconsistência (listaInconsistencias)
  - Observações (observacoes)

2. Backend (FailureController.js):
POST /api/failures
- Valida dados recebidos
- Inicia transação
- Cria registro na tabela failures
- Associa com tp_inconsistencies
- Commita transação

3. Banco de Dados:
- failures (registro principal)
- failure_tp_inconsistencies (associações)
```

### 5.2 Acompanhamento via Dashboard

```mermaid
frontend -> backend -> database -> cache

1. Frontend (Indicadores.jsx):
- Charts/visualizações:
  - ResolutionRateChart 
  - ResolutionTrendChart
  - SectorChart
  - ProfessionalChart
  - InconsistencyTypeChart
  - DocumentTypeChart

2. Backend (StatisticsController.js):
GET /api/statistics
- Processa filtros
- Consulta cache
- Agrega dados
- Formata resposta

3. Cache (Redis):
- Armazena dados agregados
- TTL configurável
- Invalidação por padrão

4. Banco de Dados:
- JOIN entre tabelas:
  - failures
  - sectors  
  - responsibles
  - forms
  - tp_inconsistencies
```

### 5.3 Atualização de Status

```mermaid
frontend -> backend -> database

1. Frontend (EditInconsistency.jsx):
- Form de edição
- Seleção de novo status
- Envio de observações

2. Backend (FailureController.js):
PUT /api/failures/:id
- Valida permissões
- Inicia transação
- Atualiza registro
- Registra histórico
- Commita transação

3. Banco de Dados:
- Atualiza failures
- Registra tracking fields:
  - updateDate
  - updateUser
```

### 5.4 Histórico e Auditoria

```sql
-- Campos de auditoria presentes em todas as tabelas:
createDate: TIMESTAMP
createUser: INTEGER
updateDate: TIMESTAMP 
updateUser: INTEGER

-- Implementados via:
1. Middleware tracking.js
2. Models com timestamps
3. Controllers atualizando campos
```

Esta estrutura garante:
- Separação clara de responsabilidades
- Rastreabilidade das operações
- Cache para performance
- Transações para consistência
- Auditoria completa das mudanças


## 6. Aspectos Técnicos

### 6.1 Segurança
- Autenticação de usuários
- Controle de acesso por perfil
- Logs de atividades
- Proteção de dados sensíveis

### 6.2 Performance
- Paginação de resultados
- Otimização de consultas
- Cache de dados
- Indexação eficiente

## 7. Integração e Deploy

### 7.1 Ambiente de Desenvolvimento
- Docker para containerização
- Docker Compose para orquestração
- Variáveis de ambiente por contexto

### 7.2 CI/CD
- Testes automatizados
- Build otimizado
- Deploy automatizado
- Monitoramento em produção

## 8. Conclusão

O ERP Hospitalar é um sistema robusto e escalável, projetado para atender às necessidades específicas de gestão de prontuários e controle de qualidade em ambiente hospitalar. Sua arquitetura moderna e modular permite fácil manutenção e extensão de funcionalidades.

### Pontos Fortes
- Arquitetura bem estruturada
- Interface intuitiva
- Rastreabilidade completa
- Flexibilidade de configuração

### Oportunidades de Melhoria
- Implementação de mais relatórios
- Expansão de integrações
- Adição de análises preditivas
- Melhorias em performance
