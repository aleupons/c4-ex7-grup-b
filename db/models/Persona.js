const { Schema, model } = require("mongoose");
const PuntoVacunacion = require("./PuntoVacunacion");

const PersonaSchema = new Schema({
  dni: {
    type: String,
    required: true,
  },
  puntoVacunacion: {
    type: PuntoVacunacion,
  },
  vacuna: {
    type: Schema.Types.ObjectId,
    ref: "Vacuna",
  },
  dosis: [
    {
      type: Date,
    },
  ],
});

const Persona = model("Persona", PersonaSchema, "personas");

module.exports = Persona;
