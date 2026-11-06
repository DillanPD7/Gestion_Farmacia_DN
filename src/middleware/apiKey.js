// Protege las operaciones que modifican datos. En producción, usar una solución
// de autenticación y gestión de secretos apropiada en lugar de una clave simple.
const apiKey = process.env.API_KEY || 'farmacia123';

function validarApiKey(req, res, next) {
  if (req.get('x-api-key') !== apiKey) {
    return res.status(401).json({
      error: 'No autorizado. Envíe una x-api-key válida.'
    });
  }

  next();
}

module.exports = validarApiKey;
