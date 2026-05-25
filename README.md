# 🎓 API REST - Gestión de Estudiantes
### Proyecto Universitario · Computación en la Nube
**Stack:** Node.js · Express · Azure SQL Server · mssql

---

## 📁 Estructura del Proyecto

```
api-estudiantes/
├── src/
│   ├── config/
│   │   └── db.js                        # Conexión a Azure SQL Server
│   ├── controllers/
│   │   └── estudiantes.controller.js    # Lógica de negocio (GET, POST, DELETE)
│   ├── routes/
│   │   └── estudiantes.routes.js        # Definición de rutas
│   └── server.js                        # Punto de entrada, Express + CORS
├── .env.example                         # Plantilla de variables de entorno
├── .gitignore                           # Excluye node_modules y .env
├── package.json                         # Dependencias y scripts npm
└── README.md                            # Este archivo
```

---

## ⚙️ Instalación y configuración

### 1. Clonar / descargar el proyecto
```bash
cd api-estudiantes
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear el archivo `.env`
Copia el archivo de ejemplo y rellena con tus credenciales reales de Azure:
```bash
cp .env.example .env
```

Edita `.env`:
```env
PORT=3000
DB_SERVER=servidor.database.windows.net
DB_DATABASE=estudiantes_db
DB_USER=usuario
DB_PASSWORD=password
DB_PORT=1433
```

### 4. Ejecutar en modo desarrollo (con nodemon)
```bash
npm run dev
```

### 5. Ejecutar en modo producción
```bash
npm start
```

---

## 🗄️ Tabla SQL requerida en Azure SQL

Si la tabla aún no existe, créala con este script en Azure Query Editor:

```sql
CREATE TABLE estudiantes (
    id            INT           IDENTITY(1,1) PRIMARY KEY,
    nombres       VARCHAR(100)  NOT NULL,
    apellidos     VARCHAR(100)  NOT NULL,
    numero_carnet VARCHAR(20)   NOT NULL UNIQUE,
    edad          INT           NOT NULL
);
```

---

## 🌐 Endpoints disponibles

Base URL: `http://localhost:3000`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/estudiantes` | Listar todos los estudiantes |
| POST | `/api/estudiantes` | Crear un nuevo estudiante |
| DELETE | `/api/estudiantes/:id` | Eliminar estudiante por ID |

---

## 📨 Ejemplos de uso

### GET — Listar todos los estudiantes
```
GET http://localhost:3000/api/estudiantes
```
**Respuesta exitosa:**
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "nombres": "María",
      "apellidos": "González López",
      "numero_carnet": "20230001",
      "edad": 21
    },
    {
      "id": 2,
      "nombres": "Carlos",
      "apellidos": "Martínez Pérez",
      "numero_carnet": "20230002",
      "edad": 23
    }
  ]
}
```

---

### POST — Crear un estudiante
```
POST http://localhost:3000/api/estudiantes
Content-Type: application/json
```
**Body:**
```json
{
  "nombres": "María",
  "apellidos": "González López",
  "numero_carnet": "20230001",
  "edad": 21
}
```
**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Estudiante creado exitosamente.",
  "data": {
    "id": 1,
    "nombres": "María",
    "apellidos": "González López",
    "numero_carnet": "20230001",
    "edad": 21
  }
}
```

---

### DELETE — Eliminar un estudiante
```
DELETE http://localhost:3000/api/estudiantes/1
```
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Estudiante con ID 1 eliminado correctamente."
}
```
**Si no existe (404):**
```json
{
  "success": false,
  "message": "No se encontró un estudiante con ID 1."
}
```

---

## 📦 Dependencias utilizadas

| Paquete | Uso |
|---------|-----|
| `express` | Framework web para crear la API |
| `cors` | Habilita CORS para cualquier frontend |
| `dotenv` | Lee variables de entorno desde `.env` |
| `mssql` | Driver oficial para conectar a SQL Server / Azure SQL |
| `nodemon` | Reinicia el servidor automáticamente al guardar cambios |

---

## 🔒 Seguridad

- Las consultas SQL usan **parámetros tipados** (`.input()`) para prevenir **SQL Injection**.
- Las credenciales nunca están en el código; se cargan desde `.env`.
- El archivo `.env` está excluido en `.gitignore`.

---

## 🛠️ Comandos npm de referencia

```bash
npm install          # Instalar todas las dependencias
npm run dev          # Modo desarrollo con nodemon (reinicio automático)
npm start            # Modo producción
```
