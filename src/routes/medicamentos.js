const express = require('express');
const { medicamentos, proveedores } = require('../data');
const validarApiKey = require('../middleware/apiKey');

const router = express.Router();

function obtenerId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Lecturas del inventario.
router.get('/', (req, res) => {
  res.json(medicamentos);
});

router.get('/:id', (req, res) => {
  const id = obtenerId(req);
  const medicamento = medicamentos.find((item) => item.id === id);

  if (!medicamento) {
    return res.status(404).json({ error: 'Medicamento no encontrado.' });
  }

  res.json(medicamento);
});

// El registro exige los datos del medicamento y un proveedor existente.
router.post('/', validarApiKey, (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'El cuerpo debe ser un objeto JSON.' });
  }

  const { nombre, principioActivo, precio, stock, idProveedor } = req.body;

  if (
    typeof nombre !== 'string' ||
    !nombre.trim() ||
    typeof principioActivo !== 'string' ||
    !principioActivo.trim() ||
    precio === undefined ||
    stock === undefined ||
    idProveedor === undefined
  ) {
    return res.status(400).json({
      error: 'nombre, principioActivo, precio, stock e idProveedor son obligatorios.'
    });
  }

  const precioValido = typeof precio === 'number' && Number.isFinite(precio) && precio >= 0;
  const stockValido = Number.isInteger(stock) && stock >= 0;
  const proveedorId = Number(idProveedor);
  const proveedorExiste = Number.isInteger(proveedorId) &&
    proveedores.some((proveedor) => proveedor.id === proveedorId);

  if (!precioValido || !stockValido) {
    return res.status(400).json({
      error: 'El precio debe ser un número mayor o igual a 0 y el stock un entero mayor o igual a 0.'
    });
  }

  if (!proveedorExiste) {
    return res.status(400).json({ error: 'idProveedor no corresponde a un proveedor registrado.' });
  }

  const siguienteId = medicamentos.reduce(
    (mayorId, item) => Math.max(mayorId, item.id),
    0
  ) + 1;
  const nuevoMedicamento = {
    id: siguienteId,
    nombre: nombre.trim(),
    principioActivo: principioActivo.trim(),
    precio,
    stock,
    idProveedor: proveedorId
  };

  medicamentos.push(nuevoMedicamento);
  res.status(201).json(nuevoMedicamento);
});

// Solo se modifica el stock; el resto de los campos no se aceptan como cambios.
router.put('/:id/stock', validarApiKey, (req, res) => {
  const id = obtenerId(req);
  const medicamento = medicamentos.find((item) => item.id === id);

  if (!medicamento) {
    return res.status(404).json({ error: 'Medicamento no encontrado.' });
  }

  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'El cuerpo debe ser un objeto JSON.' });
  }

  const campos = Object.keys(req.body);
  if (
    campos.length !== 1 ||
    campos[0] !== 'stock' ||
    !Number.isInteger(req.body.stock) ||
    req.body.stock < 0
  ) {
    return res.status(400).json({
      error: 'Envíe únicamente el campo stock como un entero mayor o igual a 0.'
    });
  }

  medicamento.stock = req.body.stock;
  res.json(medicamento);
});

router.delete('/:id', validarApiKey, (req, res) => {
  const id = obtenerId(req);
  const indice = medicamentos.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Medicamento no encontrado.' });
  }

  medicamentos.splice(indice, 1);
  res.status(204).send();
});

module.exports = router;
