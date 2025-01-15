# 1. **Visão Geral do Projeto**

O sistema é um **ERP Hospitalar** cujo objetivo principal é:

1. **Gerenciar inconsistências em prontuários** (erros de preenchimento, falta de registro, faturamento incorreto, etc.).
2. **Fornecer indicadores administrativos** (por meio de gráficos e relatórios) para aprimorar a tomada de decisão.

## 1.1 **Principais Tecnologias e Ferramentas**

- **Backend**:

  - **Node.js** + **Express**.
  - **Sequelize** (ORM) para conexão com **PostgreSQL**.
  - **Migrations**, **Seeders**, **Controllers** e **Models** (ex.: `failures`, `forms`, `tp_inconsistencies`, `responsibles`).

- **Frontend**:

  - **React.js** (com Vite).
  - **Redux** para gerenciamento de estado (filtros, dados do usuário, inconsistências, etc.).
  - **Axios** para requisições HTTP.
  - **Tailwind CSS** e **MUI** para estilização.
  - **Recharts** para gráficos (linha, pizza, barras).

- **Infra**:

  - **Servidor Linux** ou containers (Docker).
  - **Nginx** como reverse proxy (para servir frontend e redirecionar /api para o Node).
  - **PM2** para gerenciar processos Node em produção.
  - **Banco de Dados** em container **PostgreSQL**.

## 1.2 **Exemplo Prático de Uso**

- **Caso de uso**: Um enfermeiro percebe que o prontuário do paciente não tem o “tipo de alta” definido. Ele registra uma inconsistência no sistema, seleciona **quem** detectou o erro (setor reclamante), **quem** deve corrigir (setor responsável), e **qual** é a inconsistência (falta de registro).
- **Gestor**: Depois, acessa a página de indicadores para ver **quantas inconsistências** foram detectadas no período, **quantas foram resolvidas**, e **qual** setor mais erra. A partir desses dados, o gestor pode implementar ações de treinamento ou melhoria no processo.

---

# 2. **Otimização dos Requisitos**

### 2.1 **Necessidades Principais**

1. **Cadastro e Edição de Inconsistências** (Ex.: Falhas de preenchimento de prontuário).
2. **Filtragem Avançada** por datas, setores, profissionais, cargo, etc.
3. **Geração de Indicadores (Gráficos)** para acompanhar:
   - Quantidade de inconsistências.
   - Taxa de resolução (pendente vs resolvido).
   - Histórico mensal de falhas.
4. **Página de Listagem de Inconsistências** (com paginação, edição e finalização).
5. **Autenticação** (futura) para que cada usuário veja apenas as inconsistências de seu hospital.
6. **Containerização** e **Deploy** (Nginx, PM2, Docker) para ambiente de produção.

### 2.2 **Requisitos Específicos a Otimizar**

1. **Adicionar campo de “Setor de quem registra”** (no front e back).
2. **Editar ****`Failures`** para conter duas referências de `Sectors`:
   - `sectorReporterId` (quem reclamou).
   - `sectorResponsibleId` (quem corrige).
3. **Adicionar ****`role`** (Cargo) na model de `Responsible`.
4. **Criar endpoints de estatísticas** que recebam filtros (data, cargo, setor etc.).
5. **Enviar dados (payload) de forma organizada** no frontend (via Redux ou via objeto único de filtros).

---

# 3. **Escopo Geral**

O projeto abrange:

1. **Módulo de Inconsistências**

   - Tela para **criar** novas falhas.
   - Tela (ou página) para **listar** falhas, com paginação e status (pendente, resolvido).
   - Opção de **editar** e **finalizar** (mudar status para resolvido).
   - Controle de tempo em aberto (dd\:hh) entre a data de criação e a data atual.

2. **Módulo de Indicadores**

   - Filtros: período, não conformidades, profissionais, setores reclamantes, setores responsáveis, cargo, etc.
   - **Gráficos**:
     - Linha (percentual mensal de resolução).
     - Pizza (taxa pendente vs resolvido).
     - Barras (quantidade por tipo de inconsistência, setor, profissional, etc.).

3. **Autenticação** (Fase Futura)

   - Login JWT, com associação do usuário ao hospital.
   - Filtrar as inconsistências do hospital vinculado ao usuário.

4. **Infra/DevOps**

   - Deploy em containers (Nginx, Node.js, React, PostgreSQL).
   - Configurações de logs, SSL (quando necessário) e PM2.

---

# 4. **Backlog Completo de Tarefas**

### Sprint 1 — Filtros e Gráficos (Mock) no Frontend

1. **Criar Home.jsx (Tela Inicial)**

   - Criar uma página básica que seja carregada ao acessar o sistema.
   - Tecnologias: React Router, Tailwind/MUI.

2. **Implementar Filtros em Indicadores.jsx com Dados Mock**

   - Componentes para data, setor, profissional, etc.
   - Gerenciar estado com Redux.

3. **Criar Gráficos (Linha, Pizza e Barras) em Indicadores.jsx (Mock)**

   - Exibir gráficos usando dados estáticos.
   - Biblioteca: Recharts.

4. **Criar Endpoint Backend (Mock) para Estatísticas**

   - Rota `/api/statistics/mock` retornando JSON fixo.

### Sprint 2 — Página de Inconsistências e CRUD Básico

1. **Renomear ReportarFalhas.jsx para Inconsistências.jsx**.
2. **Listar Inconsistências (Com Paginação)**
   - Exibir tabela com falhas, paginar 5/10/20 itens.
3. **Adicionar Modais (Novo, Editar, Finalizar)**
   - Criar modal para cada funcionalidade.
4. **Exibir Tempo\_em\_Aberto (dd****:hh****)**
   - Calcular diferença entre criação e atual.

### Sprint 3 — Integração Real com Backend e Novas Relações

1. **Endpoints de Estatísticas (Dinâmicos)**
   - Filtros dinâmicos para queries em `/api/statistics`.
2. **Editar Models (Failures, Sectors, Responsible)**
   - Adicionar `sectorReporterId`, `sectorResponsibleId`, `role`.
3. **Filtrar Dados no Frontend (Indicadores.jsx)**
   - Enviar filtros via Axios e popular gráficos.
4. **Autenticação JWT (Básica)**
   - Middleware para validar token e restringir acesso.

### Sprint 4 — Deploy e Refinamentos

1. **Containerização (Dockerfiles e docker-compose)**
   - Criar arquivos para frontend, backend e PostgreSQL.
2. **Configurar Logs e Monitoração**
   - PM2 para backend e logs rotacionados.
3. **Implementar CI/CD (GitHub Actions ou similar)**
   - Pipeline para testes, build e deploy.
4. **Testes Automatizados**
   - Backend: Jest. Frontend: React Testing Library e Cypress.

---

# 5. **Status Atual das Tarefas**

| Tarefa                              | Status       |
| ----------------------------------- | ------------ |
| Criar Home.jsx                      | Concluído    |
| Implementar Filtros (Mock)          | Em progresso |
| Criar Gráficos (Mock)               | Não iniciado |
| Criar Endpoint Mock de Estatísticas | Não iniciado |
| Renomear ReportarFalhas.jsx         | Concluído    |
| Listar Inconsistências              | Em progresso |
| Modais de CRUD                      | Não iniciado |
| Exibir Tempo\_em\_Aberto            | Não iniciado |
| Endpoints de Estatísticas Dinâmicos | Não iniciado |
| Editar Models                       | Não iniciado |
| Deploy Inicial                      | Não iniciado |

Esta organização assegura clareza e priorização no desenvolvimento, garantindo que o projeto avance de forma consistente.

