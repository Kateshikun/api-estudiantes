// =============================================
// src/server.js
// Punto de entrada principal de la aplicación.
// Configura Express, CORS, rutas y arranca
// el servidor en el puerto indicado en .env.
// =============================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const estudiantesRoutes = require("./routes/estudiantes.routes");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globales ────────────────────────────────────────────────────

// CORS: permite peticiones desde cualquier frontend (origen *)
app.use(cors());

// Parsear cuerpos JSON en las peticiones POST/PUT
app.use(express.json());

// ─── Rutas ──────────────────────────────────────────────────────────────────

// Ruta raíz para verificar que la API está en línea
app.get("/", (req, res) => {
  res.json({
    message: "🎓 API de Gestión de Estudiantes - Computación en la Nube",
    version: "1.0.0",
    endpoints: {
      "GET /api/estudiantes": "Listar todos los estudiantes",
      "POST /api/estudiantes": "Crear un nuevo estudiante",
      "DELETE /api/estudiantes/:id": "Eliminar un estudiante por ID",
    },
  });
});

// Todas las rutas de estudiantes bajo /api/estudiantes
app.use("/api/estudiantes", estudiantesRoutes);

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta "${req.originalUrl}" no encontrada.`,
  });
});

// ─── Inicio del servidor ─────────────────────────────────────────────────────

const startServer = async () => {
  // Conectar a la base de datos antes de abrir el puerto
  await connectDB();

  app.listen(PORT);
};

startServer();
