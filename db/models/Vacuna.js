const { Schema, model } = require("mongoose");

const VacunaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    dosis: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Vacuna = model("Vacuna", VacunaSchema, "vacunas");

module.exports = Vacuna;
