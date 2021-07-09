const Vacuna = require("../models/Vacuna");

const listarVacunas = async () => {
  try {
    const vacunas = await Vacuna.find();
    return vacunas.map((vacuna) => ({
      value: vacuna.nombre,
      name: vacuna.nombre,
    }));
  } catch (err) {
    console.log("No tenemos vacunas", err.message);
  }
};

const getVacuna = async (nombreVacuna) => {
  try {
    const vacuna = await Vacuna.findOne().where("nombre").equals(nombreVacuna);
    return vacuna._id;
  } catch (err) {
    console.log("No existe la vacuna", err.message);
  }
};

module.exports = {
  listarVacunas,
  getVacuna,
};
