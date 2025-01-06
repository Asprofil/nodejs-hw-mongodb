const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON requests
app.use(express.json());

// Serve the Swagger UI documentation
const swaggerDocument = fs.readFileSync(path.join(__dirname, 'docs/openapi.yaml'), 'utf-8');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));

// Define your routes
app.get('/contacts/:contactId', (req, res) => {
  // Implementation of get contact by ID
  res.send({ message: 'Get contact by ID' });
});

app.patch('/contacts/:contactId', (req, res) => {
  // Implementation of update contact by ID
  res.send({ message: 'Update contact by ID' });
});

app.delete('/contacts/:contactId', (req, res) => {
  // Implementation of delete contact by ID
  res.send({ message: 'Delete contact by ID' });
});

app.post('/contacts', (req, res) => {
  // Implementation of create new contact
  res.send({ message: 'Create new contact' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
т