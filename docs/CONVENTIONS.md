# Convenções de Nomenclatura e Padrões

## Campos de Tracking

Todas as tabelas devem incluir os seguintes campos de tracking:

```javascript
{
  createDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}
```

## Nomenclatura de Tabelas

- Usar snake_case para nomes de tabelas
- Sempre em minúsculas
- Usar plural
- Exemplos: `hospital_groups`, `tp_inconsistencies`

## Migrations

- Formato da data: YYYYMMDDHHMMSS
- Nomenclatura descritiva: `{timestamp}-{acao}-{tabela}.js`
- Exemplo: `20240102000000-standardize-fields.js`
