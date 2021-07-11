const Vacuna = require("../models/Vacuna");
const Ciudad = require("../models/Ciudad");
const { getCiudad } = require("./ciudades");
const { getPuntoVacunacion } = require("./puntosVacunacion");

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

const listarVacunasCentro = async (centro) => {
  try {
    const puntoVacunacion = await getPuntoVacunacion(centro);
    const listaVacunas = await Vacuna.find();
    const vacunasCentro = listaVacunas.filter(({ _id }) =>
      puntoVacunacion.vacunas.find((vacuna) => _id.equals(vacuna))
    );
    if (vacunasCentro.length !== 0) {
      return vacunasCentro.map((vacuna) => ({
        value: vacuna.nombre,
        name: vacuna.nombre,
      }));
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(
      `El centro ${centro} no tiene vacunas disponibles`,
      err.message
    );
  }
};

const getVacuna = async (nombreVacuna) => {
  try {
    const vacuna = await Vacuna.findOne().where("nombre").equals(nombreVacuna);
    return vacuna;
  } catch (err) {
    console.log("No existe la vacuna", err.message);
  }
};

const introducirVacuna = async (
  nombreVacuna,
  nombreCiudad,
  nombrePuntoVacunacion
) => {
  try {
    const { _id: idVacuna } = await getVacuna(nombreVacuna);
    const idCiudad = await getCiudad(nombreCiudad);
    const puntoVacunacion = await getPuntoVacunacion(nombrePuntoVacunacion);
    const ciudad = await Ciudad.find({ _id: idCiudad });
    const puntosVacunacionEncontrados = ciudad
      .map(({ puntosVacunacion }) => puntosVacunacion)[0]
      .map((puntoVacunacionRecorrido) => {
        if (puntoVacunacionRecorrido.nombre === puntoVacunacion.nombre) {
          if (
            !puntoVacunacionRecorrido.vacunas.find((vacuna) =>
              vacuna.equals(idVacuna)
            )
          ) {
            puntoVacunacionRecorrido.vacunas.push(idVacuna);
          } else {
            throw new Error(
              `\nEl centro ${nombrePuntoVacunacion} ya tiene la vacuna ${nombreVacuna}`
            );
          }
        }
        return puntoVacunacionRecorrido;
      });
    const ciudadModificada = await Ciudad.findByIdAndUpdate(idCiudad, {
      puntosVacunacion: puntosVacunacionEncontrados,
    });
  } catch (error) {
    console.log(
      "Error al introducir la vacuna en el punto de vacunación",
      error.message
    );
  }
};

module.exports = {
  listarVacunas,
  listarVacunasCentro,
  getVacuna,
  introducirVacuna,
};
