const { pool } = require("../config/db");

const obtenerEstudiantes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nombres, apellidos, numero_carnet, edad FROM estudiantes"
    );
    res.status(200).json({ success: true, total: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener estudiantes.", error: error.message });
  }
};

const crearEstudiante = async (req, res) => {
  const { nombres, apellidos, numero_carnet, edad } = req.body;
  if (!nombres || !apellidos || !numero_carnet || !edad) {
    return res.status(400).json({ success: false, message: "Todos los campos son requeridos." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO estudiantes (nombres, apellidos, numero_carnet, edad) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombres, apellidos, numero_carnet, parseInt(edad)]
    );
    res.status(201).json({ success: true, message: "Estudiante creado.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al crear estudiante.", error: error.message });
  }
};

const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ success: false, message: "ID no válido." });
  }
  try {
    const check = await pool.query("SELECT id FROM estudiantes WHERE id = $1", [parseInt(id)]);
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, message: `No existe estudiante con ID ${id}.` });
    }
    await pool.query("DELETE FROM estudiantes WHERE id = $1", [parseInt(id)]);
    res.status(200).json({ success: true, message: `Estudiante ${id} eliminado.` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar.", error: error.message });
  }
};

module.exports = { obtenerEstudiantes, crearEstudiante, eliminarEstudiante };