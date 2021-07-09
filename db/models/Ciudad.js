const { Schema, model } = require("mongoose");
const PuntoVacunacion = require("./PuntoVacunacion");

const CiudadSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  puntosVacunacion: {
    type: [PuntoVacunacion],
    required: true,
  },
});

const Ciudad = model("Ciudad", CiudadSchema, "ciudades");

module.exports = Ciudad;
