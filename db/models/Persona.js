const { Schema, model } = require("mongoose");
const PuntoVacunacion = require("./PuntoVacunacion");

const PersonaSchema = new Schema(
  {
    dni: {
      type: String,
      required: true,
    },
    puntoVacunacion: {
      type: { PuntoVacunacion },
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
  },
  { versionKey: false }
);

const Persona = model("Persona", PersonaSchema, "personas");

module.exports = Persona;
