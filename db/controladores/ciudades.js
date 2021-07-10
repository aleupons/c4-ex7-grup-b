const Ciudad = require("../models/Ciudad");

const getCiudad = async (nombreCiudad) => {
  try {
    const ciudad = await Ciudad.findOne().where("nombre").equals(nombreCiudad);
    return ciudad._id;
  } catch (err) {
    console.log("No existe la ciudad", err.message);
  }
};

module.exports = {
  getCiudad,
};
