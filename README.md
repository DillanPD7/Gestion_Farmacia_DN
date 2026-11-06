# API REST de gestión de farmacia

API educativa construida con Node.js y Express. Los datos se guardan en arrays en memoria: al reiniciar el servidor, se recuperan los datos de ejemplo.

## Requisitos y ejecución

Se necesita Node.js instalado.

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para cambiar el puerto o la clave para las operaciones de escritura, configure las variables de entorno `PORT` y `API_KEY` antes de iniciar la aplicación. La clave predeterminada de demostración es `farmacia123`; no la use como mecanismo de seguridad en producción.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/medicamentos` | Lista el inventario completo. |
| GET | `/api/medicamentos/:id` | Devuelve el detalle de un medicamento; responde 404 si no existe. |
| POST | `/api/medicamentos` | Registra un medicamento; responde 201 al crearlo. |
| PUT | `/api/medicamentos/:id/stock` | Actualiza únicamente el stock. |
| DELETE | `/api/medicamentos/:id` | Elimina un medicamento; responde 204 si lo elimina. |
| GET | `/api/proveedores` | Lista los proveedores registrados. |

Cada medicamento guarda `idProveedor`, que referencia a un proveedor existente. El alta valida los campos requeridos, que el precio sea un número no negativo, que el stock sea un entero no negativo y que el proveedor exista. Las peticiones POST, PUT y DELETE requieren el encabezado `x-api-key`.

### Ejemplo de cuerpo para crear un medicamento

```json
{
  "nombre": "Loratadina 10 mg",
  "principioActivo": "Loratadina",
  "precio": 2100,
  "stock": 20,
  "idProveedor": 1
}
```

### Ejemplo de cuerpo para actualizar el stock

```json
{
  "stock": 35
}
```

## Colección de Postman

1. Inicie el servidor con `npm start`.
2. En Postman, seleccione **Import** e importe `postman/Farmacia API.postman_collection.json`.
3. Abra la colección y configure sus variables:
   - `baseUrl`: `http://localhost:3000`
   - `apiKey`: `farmacia123` (o el valor configurado en `API_KEY`)
   - `medicamentoId`: puede dejar `1` para consultar un medicamento de ejemplo.
4. Pruebe **Listar proveedores** y **Listar medicamentos**. Para las demás lecturas use **Obtener medicamento**.
5. Ejecute **Crear medicamento** para guardar automáticamente su ID en `medicamentoId`; luego ejecute **Actualizar stock**, **Obtener medicamento** y **Eliminar medicamento**.
6. Las tres solicitudes que modifican datos ya incluyen el encabezado `x-api-key`. Quite el encabezado o cambie su valor para comprobar la respuesta 401. Elimine o cambie campos del cuerpo para probar errores 400.

El ID creado se mantiene como variable de colección durante la sesión de Postman. Los cambios de datos solo duran mientras el proceso Node.js esté activo.
