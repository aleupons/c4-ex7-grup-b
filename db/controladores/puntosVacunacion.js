const Ciudad = require("../models/Ciudad");

const listarPuntosVacunacion = async (ciudad) => {
  try {
    const ciudades = await Ciudad.find({ nombre: ciudad });
    const puntosVacunacionEncontrados = ciudades.map(
      ({ puntosVacunacion }) => puntosVacunacion.nombre
    )[0];
    if (puntosVacunacionEncontrados === undefined) {
      throw new Error();
    }
    return puntosVacunacionEncontrados.map((puntoVacunacion) => ({
      value: puntoVacunacion,
      name: puntoVacunacion,
    }));
  } catch (err) {
    console.log(
      "No tenemos puntos de vacunación en la base de datos",
      err.message
    );
  }
};

// No funciona. No es pot iterar promeses
const getPuntoVacunacion = async (nombrePunto) => {
  try {
    const ciudades = await Ciudad.find();
    const puntoVacunacionEncontrados = ciudades.find(
      ({ puntosVacunacion }) => puntosVacunacion.nombre === nombrePunto
    );
    if (puntoVacunacionEncontrados === undefined) {
      throw new Error();
    }
    return puntoVacunacionEncontrados.puntosVacunacion;
  } catch (err) {
    console.log("No existe la vacuna", err.message);
  }
};

module.exports = {
  listarPuntosVacunacion,
  getPuntoVacunacion,
};
