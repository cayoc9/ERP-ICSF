# GitHub Copilot - Diretrizes de Uso

## 1. Padrões de Código

### 1.1 Nomenclatura
- Use PascalCase para componentes React
- Use camelCase para funções e variáveis
- Use UPPER_SNAKE_CASE para constantes
- Prefixe interfaces com 'I' (ex: IUserData)

### 1.2 Estrutura de Arquivos
```javascript
// Componentes React
function ComponentName() {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Efeitos
  useEffect(() => {}, []);
  
  // 3. Handlers
  const handleEvent = () => {};
  
  // 4. Render
  return ();
}
```

## 2. Comentários e Documentação

### 2.1 Cabeçalho de Arquivos
```javascript
/**
 * @description Breve descrição do componente/arquivo
 * @author Copilot suggestion
 * @date YYYY-MM-DD
 */
```

### 2.2 Funções e Métodos
```javascript
/**
 * @param {type} paramName - Descrição do parâmetro
 * @returns {type} Descrição do retorno
 * @throws {ErrorType} Descrição do erro
 */
```

## 3. Padrões de Commits

### 3.1 Formato
```
<tipo>(<escopo>): <descrição>

[corpo]

[rodapé]
```

### 3.2 Tipos de Commit
- feat: Nova funcionalidade
- fix: Correção de bug
- docs: Documentação
- style: Formatação
- refactor: Refatoração
- test: Testes
- chore: Manutenção

## 4. Instruções para o Copilot

### 4.1 Prompts Efetivos
- "Crie um componente React para..."
- "Implemente uma função que..."
- "Refatore este código para..."
- "Adicione tipos TypeScript para..."

### 4.2 Contexto
- Sempre forneça contexto suficiente
- Mencione dependências relevantes
- Especifique requisitos de performance

### 4.3 Personalizações
```javascript
// #region Nome da Seção
// código aqui
// #endregion

// @copilot-ignore
// código que não deve ser sugerido

// @copilot-prefer
// código preferencial para sugestões
```

## 5. Boas Práticas

### 5.1 Validação de Entrada
```javascript
// Sempre validar parâmetros
function processData(data) {
  if (!data) throw new Error('Data is required');
  // ...
}
```

### 5.2 Tratamento de Erros
```javascript
try {
  // operações
} catch (error) {
  logger.error('Contexto:', error);
  throw new CustomError(error);
}
```

### 5.3 Performance
- Memoização quando apropriado
- Lazy loading para imports
- Otimização de renderização

## 6. Segurança

### 6.1 Validações
- Sanitizar inputs
- Validar tipos
- Verificar permissões

### 6.2 Dados Sensíveis
- Não expor informações sensíveis
- Usar variáveis de ambiente
- Implementar rate limiting

## 7. Acessibilidade

### 7.1 Componentes
```jsx
// Sempre incluir atributos de acessibilidade
<button
  aria-label="Descrição"
  role="button"
  onClick={handleClick}
>
  Conteúdo
</button>
```

## 8. Testes

### 8.1 Estrutura
```javascript
describe('ComponentName', () => {
  beforeEach(() => {
    // setup
  });

  it('should render correctly', () => {
    // test
  });
});
```

## 9. Convenções do Projeto

### 9.1 Estado Global
- Redux para estado global
- Context para estado local
- Hooks customizados para lógica reutilizável

### 9.2 Estilização
- Tailwind CSS para estilos
- CSS Modules para componentes específicos
- Tema consistente

## 10. Manutenção

### 10.1 Deprecated Code
```javascript
/**
 * @deprecated Use newFunction() instead
 * @since version X.Y.Z
 */
```

### 10.2 TODOs
```javascript
// TODO: Descrição clara da pendência
// FIXME: Descrição do que precisa ser corrigido
