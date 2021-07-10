const Ciudad = require("../models/Ciudad");

const listarPuntosVacunacion = async (nombreCiudad) => {
  try {
    const ciudad = await Ciudad.find({
      nombre: nombreCiudad,
    });
    const puntosVacunacionCiudad = ciudad
      .map(({ puntosVacunacion }) => puntosVacunacion)[0]
      .map(({ nombre }) => ({
        value: nombre,
        name: nombre,
      }));
    return puntosVacunacionCiudad;
  } catch (err) {
    console.log(
      "No tenemos puntos de vacunación en la base de datos",
      err.message
    );
  }
};

const getPuntoVacunacion = async (nombrePuntoVacunacion) => {
  try {
    const ciudadConPuntoVacunacion = await Ciudad.find({
      "puntosVacunacion.nombre": nombrePuntoVacunacion,
    });
    const puntoVacunacion = ciudadConPuntoVacunacion
      .map(({ puntosVacunacion }) => puntosVacunacion)[0]
      .find(({ nombre }) => nombre === nombrePuntoVacunacion);
    return puntoVacunacion;
  } catch (err) {
    console.log("No existe la vacuna", err.message);
  }
};

module.exports = {
  listarPuntosVacunacion,
  getPuntoVacunacion,
};
