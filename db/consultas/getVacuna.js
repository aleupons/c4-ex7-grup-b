const Vacuna = require("../models/Vacuna");

const getVacuna = async (nombreVacuna) => {
  try {
    const vacuna = await Vacuna.find().where("nombre", nombreVacuna);
    console.log(vacuna);
  } catch (err) {
    console.log("Error", err.message);
  }
};

module.exports = {
  getVacuna,
};
