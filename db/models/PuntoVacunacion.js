const PuntoVacunacion = {
  nombre: {
    type: String,
    required: true,
  },
  localizacion: {
    coordenadas: {
      type: [
        {
          type: Number,
          required: true,
        },
      ],
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    required: true,
  },
  vacunas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vacuna",
    },
  ],
};

module.exports = PuntoVacunacion;
