# Plano de Migração para Mantis Template

## 1. Estrutura de Diretórios

```markdown
src/
├── pages/
│   ├── reports/
│   │   ├── inconsistencies/
│   │   │   ├── index.jsx          # Lista de inconsistências 
│   │   │   ├── create.jsx         # Criar inconsistência
│   │   │   ├── edit.jsx           # Editar inconsistência
│   │   │   └── components/        # Componentes específicos
│   │   └── indicators/
│   │       ├── index.jsx          # Dashboard de indicadores
│   │       └── components/        # Componentes de gráficos
├── sections/
│   ├── inconsistencies/          # Seções de inconsistências
│   └── indicators/               # Seções de indicadores  
└── components/                   # Componentes compartilhados
```

## 2. Configuração do Projeto

### 2.1 Configuração do Vite
```javascript
// vite.config.mjs
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
```

## 3. Implementação das Páginas

### 3.1 Página de Indicadores

```jsx
// pages/reports/indicators/index.jsx
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { InconsistencyTypeChart, ResolutionRateChart } from './components';

function Indicators() {
  return (
    <Grid container spacing={3}>
      {/* Header Card */}
      <Grid item xs={12}>
        <MainCard title="Indicadores">
          <FilterPanel />
        </MainCard>
      </Grid>

      {/* Charts Grid */}
      <Grid item xs={12} md={8}>
        <MainCard>
          <ResolutionTrendChart data={trendData} />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={4}>
        <MainCard>
          <ResolutionRateChart data={rateData} /> 
        </MainCard>
      </Grid>
    </Grid>
  );
}
```

### 3.2 Página de Inconsistências

```jsx
// pages/reports/inconsistencies/index.jsx
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';

function Inconsistencies() {
  return (
    <MainCard 
      title="Inconsistências"
      secondary={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nova Inconsistência
        </Button>
      }
    >
      <DataGrid
        rows={inconsistencias}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={handleSelection}
        components={{
          Toolbar: GridToolbar
        }}
      />
    </MainCard>
  );
}
```

## 4. Integração com Redux

### 4.1 Store Configuration
```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { inconsistenciasReducer, indicadoresReducer } from './slices';

export const store = configureStore({
  reducer: {
    inconsistencias: inconsistenciasReducer,
    indicadores: indicadoresReducer
  }
});
```

## 5. Rotas

```jsx
// routes/MainRoutes.jsx
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'reports',
      children: [
        {
          path: 'indicators',
          element: <Indicators />
        },
        {
          path: 'inconsistencies',
          children: [
            {
              path: '',
              element: <Inconsistencies />
            },
            {
              path: 'create',
              element: <InconsistencyForm />  
            },
            {
              path: 'edit/:id',
              element: <InconsistencyForm />
            }
          ]
        }
      ]
    }
  ]
};
```

## 6. Menu Configuration

```jsx
// menu-items/reports.jsx
const reports = {
  id: 'reports',
  title: <FormattedMessage id="reports" />,
  type: 'group',
  children: [
    {
      id: 'indicators',
      title: <FormattedMessage id="indicators" />,
      type: 'item',
      url: '/reports/indicators',
      icon: icons.ChartOutlined
    },
    {
      id: 'inconsistencies', 
      title: <FormattedMessage id="inconsistencies" />,
      type: 'item',
      url: '/reports/inconsistencies',
      icon: icons.AlertOutlined
    }
  ]
};
```

## 7. Componentes Reutilizáveis

```jsx
// components/charts/StatisticCard.jsx
function StatisticCard({ title, value, trend, icon }) {
  return (
    <MainCard>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="rounded" color="primary">
          {icon}
        </Avatar>
        <Stack spacing={0.5}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{value}</Typography>
          <TrendIndicator value={trend} />
        </Stack>
      </Stack>
    </MainCard>
  );
}
```

## 8. Filtros e Pesquisa

```jsx
// components/FilterDrawer.jsx 
function FilterDrawer({ open, onClose, filters, onChange }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Stack spacing={3} sx={{ p: 3, width: 320 }}>
        <Typography variant="h5">Filtros</Typography>
        
        <DateRangePicker
          value={filters.dateRange}
          onChange={(range) => onChange('dateRange', range)}
        />

        <FormGroup>
          {/* Status checkboxes */}
        </FormGroup>
        
        <Button 
          variant="contained"
          onClick={handleApply}
        >
          Aplicar Filtros  
        </Button>
      </Stack>
    </Drawer>
  );
}
```

## 9. Implementação da API

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const notification = {
      message: error.response?.data?.message || 'Erro na requisição',
      type: 'error'
    };
    dispatchNotification(notification);
    return Promise.reject(error);
  }
);

export default api;
```

Esta estrutura aproveita os componentes e recursos do Mantis mantendo a funcionalidade do sistema original.

Recomendações:
1. Implementar loading states usando Skeleton do MUI
2. Usar ThemeProvider do Mantis para consistência visual
3. Implementar error boundaries em nível de rota
4. Configurar Suspense para lazy loading
5. Usar interceptors do Axios para tratamento de erros global