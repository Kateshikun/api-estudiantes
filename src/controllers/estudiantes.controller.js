// =============================================
// src/controllers/estudiantes.controller.js
// Lógica de negocio para cada endpoint.
// Aquí se ejecutan las consultas SQL.
// =============================================

const { connectDB, sql } = require("../config/db");

// --------------------------------------------------
// GET /api/estudiantes
// Retorna la lista de todos los estudiantes.
// --------------------------------------------------
const obtenerEstudiantes = async (req, res) => {
  try {
    const pool = await connectDB();

    const result = await pool
      .request()
      .query("SELECT id, nombres, apellidos, numero_carnet, edad FROM estudiantes");

    res.status(200).json({
      success: true,
      total: result.recordset.length,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error en obtenerEstudiantes:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al obtener los estudiantes.",
      error: error.message,
    });
  }
};

// --------------------------------------------------
// POST /api/estudiantes
// Crea un nuevo estudiante.
// Body esperado (JSON):
// { nombres, apellidos, numero_carnet, edad }
// --------------------------------------------------
const crearEstudiante = async (req, res) => {
  const { nombres, apellidos, numero_carnet, edad } = req.body;

  // Validación básica de campos requeridos
  if (!nombres || !apellidos || !numero_carnet || !edad) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son requeridos: nombres, apellidos, numero_carnet, edad.",
    });
  }

  try {
    const pool = await connectDB();

    // Se usan parámetros con .input() para evitar SQL Injection
    const result = await pool
      .request()
      .input("nombres", sql.VarChar(100), nombres)
      .input("apellidos", sql.VarChar(100), apellidos)
      .input("numero_carnet", sql.VarChar(20), numero_carnet)
      .input("edad", sql.Int, parseInt(edad))
      .query(`
        INSERT INTO estudiantes (nombres, apellidos, numero_carnet, edad)
        OUTPUT INSERTED.*
        VALUES (@nombres, @apellidos, @numero_carnet, @edad)
      `);

    res.status(201).json({
      success: true,
      message: "Estudiante creado exitosamente.",
      data: result.recordset[0],
    });
  } catch (error) {
    console.error("Error en crearEstudiante:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al crear el estudiante.",
      error: error.message,
    });
  }
};

// --------------------------------------------------
// DELETE /api/estudiantes/:id
// Elimina un estudiante por su ID.
// --------------------------------------------------
const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;

  // Validar que el ID sea un número entero válido
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: "El ID proporcionado no es válido.",
    });
  }

  try {
    const pool = await connectDB();

    // Primero se verifica si el estudiante existe
    const check = await pool
      .request()
      .input("id", sql.Int, parseInt(id))
      .query("SELECT id FROM estudiantes WHERE id = @id");

    if (check.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró un estudiante con ID ${id}.`,
      });
    }

    // Si existe, se elimina
    await pool
      .request()
      .input("id", sql.Int, parseInt(id))
      .query("DELETE FROM estudiantes WHERE id = @id");

    res.status(200).json({
      success: true,
      message: `Estudiante con ID ${id} eliminado correctamente.`,
    });
  } catch (error) {
    console.error("Error en eliminarEstudiante:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el estudiante.",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerEstudiantes,
  crearEstudiante,
  eliminarEstudiante,
};
