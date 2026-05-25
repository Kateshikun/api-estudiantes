// =============================================
// src/config/db.js
// Configuración y conexión a Azure SQL Server
// usando el paquete "mssql".
// =============================================

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host:     process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port:     parseInt(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }, // Obligatorio en Azure PostgreSQL
});

const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Conectado a PostgreSQL correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };