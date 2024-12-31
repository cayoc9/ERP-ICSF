**Desenvolvimento de Sistema ERP Hospitalar**

---

### **Plano de Projeto (Project Plan)**

Este documento consolida o plano de desenvolvimento do sistema ERP Hospitalar, alinhando equipes e corrigindo incongruências de nomenclatura, além de organizar tarefas e definir estratégias de desenvolvimento. A proposta busca garantir um ciclo de desenvolvimento eficiente, com entrega de um MVP funcional.

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

