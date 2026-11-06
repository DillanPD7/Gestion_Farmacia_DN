// Datos de ejemplo en memoria. Se reinician cada vez que se inicia el servidor.
const proveedores = [
  {
    id: 1,
    nombreEmpresa: 'Distribuidora Salud',
    telefono: '555-0101',
    email: 'ventas@distribuidorasalud.example'
  },
  {
    id: 2,
    nombreEmpresa: 'Laboratorio Central',
    telefono: '555-0102',
    email: 'contacto@laboratoriocentral.example'
  }
];

const medicamentos = [
  {
    id: 1,
    nombre: 'Paracetamol 500 mg',
    principioActivo: 'Paracetamol',
    precio: 1250,
    stock: 40,
    idProveedor: 1
  },
  {
    id: 2,
    nombre: 'Ibuprofeno 400 mg',
    principioActivo: 'Ibuprofeno',
    precio: 1800,
    stock: 25,
    idProveedor: 2
  },
  {
    id: 3,
    nombre: 'Amoxicilina 500 mg',
    principioActivo: 'Amoxicilina',
    precio: 3200,
    stock: 15,
    idProveedor: 1
  }
];

module.exports = { medicamentos, proveedores };
