const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Caminho do YAML
const swaggerYamlPath = path.join(__dirname, '../swagger.yaml');
// Carrega o documento (objeto JS) a partir do YAML
const swaggerDocument = YAML.load(swaggerYamlPath);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI (usa o objeto já carregado)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// >>> Expor o YAML bruto
app.get('/api-docs.yaml', (req, res) => {
  const yaml = fs.readFileSync(swaggerYamlPath, 'utf8');
  res.type('text/yaml').send(yaml);
});

// >>> Expor o JSON equivalente
app.get('/api-docs.json', (req, res) => {
  res.type('application/json').send(swaggerDocument);
});

// Suas rotas de API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API', documentation: '/api-docs' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`OpenAPI YAML: http://localhost:${PORT}/api-docs.yaml`);
  console.log(`OpenAPI JSON: http://localhost:${PORT}/api-docs.json`);
});
