# Desenvolvimento de Sistema ERP Hospitalar

---

### **Plano de Projeto (Project Plan)**

## Status Atual do Projeto

### Estrutura Implementada

#### Frontend
- ✅ Setup inicial com React + Vite
- ✅ Configuração do Redux para gerenciamento de estado
- ✅ Implementação do Material-UI e Tailwind CSS
- ✅ Estrutura de rotas básica
- ✅ Componentes base (Header, Sidebar)
- ✅ Páginas principais criadas (Indicadores, ReportarFalha, HospitalGroups)

#### Backend
- ✅ API REST com Express.js
- ✅ Conexão com PostgreSQL via Sequelize
- ✅ Modelos e migrations definidos
- ✅ Rotas implementadas para:
  - Responsáveis
  - Formulários
  - Tipos de Inconsistências
  - Setores
  - Falhas
  - Indicadores
  - Hospitais
  - Grupos Hospitalares
- ✅ Documentação Swagger

#### DevOps
- ✅ Containerização com Docker
- ✅ Docker Compose configurado
- ✅ Ambiente de desenvolvimento configurado

### Próximos Passos

1. **Frontend**
   - Implementar autenticação
   - Finalizar formulários de cadastro
   - Desenvolver dashboards de indicadores
   - Implementar testes unitários

2. **Backend**
   - Implementar validações
   - Adicionar camada de autenticação
   - Criar seeds para dados iniciais
   - Implementar logs detalhados

3. **Infraestrutura**
   - Configurar ambiente de produção no Saveincloud
   - Implementar CI/CD
   - Configurar backups automatizados
   - Estabelecer monitoramento

### Cronograma Atualizado

1. **MVP (Em andamento - Semana 2/3)**
   - ✅ Setup inicial
   - ✅ Estrutura básica
   - 🔄 Implementação de funcionalidades core

2. **Banco de Dados (Próximo - Semanas 3-6)**
   - ✅ Modelagem inicial
   - 🔄 Ajustes de relações
   - ⏳ População de dados

3. **Testes e Refinamentos (Semanas 7-8)**
   - ⏳ Testes unitários
   - ⏳ Testes de integração
   - ⏳ Ajustes de performance

4. **Deploy (Semana 9)**
   - ⏳ Configuração do ambiente
   - ⏳ Deploy inicial
   - ⏳ Monitoramento

### Riscos Atualizados

1. **Técnicos**
   - Complexidade das relações no banco
   - Performance com grande volume de dados
   - Integração entre módulos

2. **Gestão**
   - Prazo do MVP
   - Escopo crescente
   - Recursos limitados

### Mitigações Implementadas

1. **Código**
   - ESLint configurado
   - Prettier implementado
   - Documentação Swagger

2. **Processos**
   - Code reviews estabelecidos
   - Padrões de commit definidos
   - Branches protegidas

### Próxima Revisão
- Data: [Definir data]
- Foco: Avaliação do MVP
- Métricas: Funcionalidades implementadas vs. planejadas

---

### **1. Introdução**

#### **1.1. Justificativa**
- O ERP Hospitalar será uma solução para gerenciar inconsistências em prontuários médicos, oferecendo indicadores claros para a administração hospitalar.
- Tecnologias principais:
  - **Frontend**: React.js, Redux, Axios, MUI, Tailwind CSS.
  - **Backend**: Node.js (Express), PostgreSQL, Sequelize.
  - **Infraestrutura**: Hospedagem em ambiente **saveincloud**.

#### **1.2. Objetivo Geral**
- Construir um sistema modular que facilite o cadastro, consulta e análise de inconsistências em prontuários.
- Gerar relatórios de indicadores e permitir uma gestão mais eficiente de dados hospitalares.

---

### **2. Escopo do Projeto**

#### **2.1. Funcionalidades Principais**

1. **Gerenciamento de Inconsistências**:
   - Cadastro de inconsistências vinculadas a prontuários.
   - Controle por responsável, setor e tipo de documento.
   - Associação de múltiplas inconsistências a um único prontuário.

2. **Indicadores e Relatórios**:
   - Exibição de status das inconsistências (abertas, resolvidas, etc.).
   - Filtros por setor, hospital, e responsável.

3. **Cadastro de Documentos e Profissionais**:
   - Inclusão de novos tipos de documentos.
   - Registro de usuários profissionais responsáveis por cada falha.

4. **Gerenciamento de Hospitais e Setores**:
   - Cadastro e associação de setores a hospitais e hospitais a grupos hospitalares.

---

### **3. Estrutura Técnica do Sistema**

#### **3.1. Frontend**
- **React.js + Vite**: Desenvolvimento ágil e build otimizada.
- **Redux**: Gerenciamento de estado global.
- **Axios**: Comunicação com API (dados mockados no MVP).
- **MUI + Tailwind CSS**: Estilização responsiva e componentes prontos.

#### **3.2. Backend**
- **Node.js + Express**: Criação de API RESTful.
- **Sequelize**: ORM para interagir com o banco PostgreSQL.
- **Swagger**: Documentação automática das APIs.

#### **3.3. Infraestrutura**
- **Saveincloud**:
  - Nó Linux para o backend.
  - Nó dedicado ao PostgreSQL.

---

### **4. Cronograma Macro**

1. **Fase 1 – MVP (2 a 3 semanas)**:
   - Implementar páginas iniciais de registro e consulta de inconsistências.
   - Simular dados com um serviço mockado.

2. **Fase 2 – Integração com Banco de Dados Real (2 a 4 semanas)**:
   - Ajustar nomenclaturas e relações no banco.
   - Criar seeds iniciais para populações coerentes.

3. **Fase 3 – Testes e Refinamentos (2 semanas)**:
   - Implementar testes unitários e de integração.
   - Refatorar inconsistências de nomenclatura.

4. **Fase 4 – Deploy e Produção (1 semana)**:
   - Deploy do sistema em ambiente saveincloud.
   - Configuração de monitoramento e logging.

---

### **5. Estratégias de Qualidade e Riscos**

#### **5.1. Garantia de Qualidade**
- Revisões de código e uso de ESLint/Prettier.
- Testes automatizados com Jest e React Testing Library.

#### **5.2. Principais Riscos e Mitigações**
- **Incongruências de Nomenclatura**: Revisar migrations e models centralizados.
- **Dependência de Equipe**: Documentar rotas e processos.
- **Falta de Testes**: Incluir testes a partir da Fase 3.

---

### **6. Documentos Secundários**

1. **Especificação de Requisitos (SRS)**: Descreve fluxos e casos de uso.
2. **Documento de Arquitetura**: Padrões e diagramas de design.
3. **Plano de Qualidade**: Procedimentos e métricas de testes.
4. **Plano de Deploy**: Estratégias de publicação e rollback.
5. **Documentação de API**: Swagger para endpoints.

---

### **7. Lista de Tarefas Prioritárias**

#### **7.1. Ajustes de Banco e Backend**
- Revisar migrations e seeds para unificação de nomenclatura.
- Criar rota para cadastro de documentos.
- Atualizar endpoints para suportar novos relacionamentos.

#### **7.2. Desenvolvimento do Frontend**
- Finalizar páginas de registro de falhas e indicadores.
- Integrar Redux com dados reais da API.

#### **7.3. Testes e Produção**
- Implementar testes de backend e frontend.
- Configurar deploy no ambiente saveincloud com variáveis de ambiente e CI/CD.

---

### **8. Conclusão**

Este plano consolidado visa nortear o desenvolvimento do ERP Hospitalar, garantindo um sistema estruturado, escalável e funcional. O foco em documentação, integração e testes assegura que o produto final atenda às expectativas de qualidade e usabilidade.

