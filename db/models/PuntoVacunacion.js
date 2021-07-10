const { Schema } = require("mongoose");

const PuntoVacunacion = new Schema(
  {
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
    vacunas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vacuna",
      },
    ],
  },
  { _id: false }
);

module.exports = PuntoVacunacion;
