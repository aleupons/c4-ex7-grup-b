const PuntoVacunacion = require("../models/PuntoVacunacion");

const listarPuntosVacunacion = async () => {
  try {
    const puntosVacunacion = await PuntoVacunacion.find("nombre");
    console.log(puntosVacunacion);
    return puntosVacunacion;
  } catch (err) {
    console.log(
      "No tenemos puntos de vacunación en la base de datos",
      err.message
    );
  }
};

module.exports = {
  listarPuntosVacunacion,
};
