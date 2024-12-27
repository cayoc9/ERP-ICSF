// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { sequelize } = require('./models'); // Importa a instância do Sequelize e os modelos

// Importar rotas
const sectorRoutes = require('./routes/sectors');
const responsibleRoutes = require('./routes/responsibles');
const failureRoutes = require('./routes/failures');
const indicatorRoutes = require('./routes/indicators');
const hospitalRoutes = require('./routes/hospitals');
const formRoutes = require('./routes/forms'); // Rota de forms
const tpInconsistenciesRoutes = require('./routes/tp-inconsistencies');
const hospitalGroupRoutes = require('./routes/hospital-groups'); // Rota de hospital-groups

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Projeto',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middlewares
app.use(cors({
  origin: '*', // Altere para a URL do seu frontend em produção
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Se estiver utilizando cookies
}));
app.use(express.json());

// Rotas
app.use('/api/sectors', sectorRoutes);
app.use('/api/responsibles', responsibleRoutes);
app.use('/api/failures', failureRoutes);
app.use('/api/indicators', indicatorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/tp-inconsistencies', tpInconsistenciesRoutes);
app.use('/api/hospital-groups', hospitalGroupRoutes);

const PORT = process.env.PORT || 5000;

/**
 * Primeiro, testamos a conexão com o banco.
 * Em seguida, sincronizamos modelos sem recriar tabelas.
 * Por fim, iniciamos o servidor.
 */
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database...');
    return sequelize.sync({ force: false });  // Mude para true apenas se necessário
  })
  .then(() => {
    console.log('Models synchronized with the database.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Error connecting or synchronizing models:', err);
    process.exit(1);
  });
