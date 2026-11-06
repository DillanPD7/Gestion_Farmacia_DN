const express = require('express');
const medicamentosRouter = require('./routes/medicamentos');
const proveedoresRouter = require('./routes/proveedores');

const app = express();
const puerto = process.env.PORT || 3000;

// Permite recibir y leer cuerpos JSON en las peticiones.
app.use(express.json());

app.use('/api/medicamentos', medicamentosRouter);
app.use('/api/proveedores', proveedoresRouter);

// Convierte errores de sintaxis en JSON con estado 400 para facilitar las pruebas.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'El cuerpo de la petición contiene JSON inválido.' });
  }

  next(err);
});

app.listen(puerto, () => {
  console.log(`API de Farmacia disponible en http://localhost:${puerto}`);
});
