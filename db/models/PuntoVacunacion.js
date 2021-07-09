const { Schema } = require("mongoose");

const PuntoVacunacion = {
  nombre: {
    type: String,
    required: true,
  },
  localizacion: {
    coordenadas: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  vacunas: {
    type: Schema.Types.ObjectId,
    ref: "Vacuna",
  },
};

module.exports = PuntoVacunacion;
