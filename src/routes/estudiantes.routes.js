// =============================================
// src/routes/estudiantes.routes.js
// Define las rutas disponibles para el recurso
// "estudiantes" y las conecta con el controlador.
// =============================================

const { Router } = require("express");
const {
  obtenerEstudiantes,
  crearEstudiante,
  eliminarEstudiante,
} = require("../controllers/estudiantes.controller");

const router = Router();

// GET    /api/estudiantes       → listar todos
// POST   /api/estudiantes       → crear uno nuevo
// DELETE /api/estudiantes/:id   → eliminar por ID

router.get("/", obtenerEstudiantes);
router.post("/", crearEstudiante);
router.delete("/:id", eliminarEstudiante);

module.exports = router;
