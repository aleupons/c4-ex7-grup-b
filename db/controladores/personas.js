const Persona = require("../models/Persona");
const { getPuntoVacunacion } = require("./puntosVacunacion");
const { getVacuna } = require("./vacunas");

const validarDni = async (dni) => {
  const numero = parseInt(dni.slice(0, 8), 10);
  const letra = dni.slice(-1);
  const letras = "TRWAGMYFPDXBNJZSQVHLCKET";
  const existeDni = await Persona.find({ dni });
  if (
    numero > 99999999 ||
    dni.length !== 9 ||
    letras.charAt(numero % 23) !== letra.toUpperCase()
  ) {
    console.log("DNI incorrecto");
    return;
  } else if (existeDni.length !== 0) {
    console.log(`El usuario con DNI ${dni} ya existe en nuestra base de datos`);
    return;
  }
  return dni;
};

const validarFecha = (stringFecha) => {
  const fecha = new Date(stringFecha);
  if (fecha.toString() === "Invalid Date") {
    console.log(
      "Formato de fecha incorrecto. Tiene que tener la forma 'DD/MM/AAAA'"
    );
    return;
  }
  return fecha;
};

const introducirPersonaVacunada = async (
  dni,
  nombrePuntoVacunacion,
  nombreVacuna,
  fechaPrimeraDosis,
  fechaSegundaDosis
) => {
  try {
    const vacuna = await getVacuna(nombreVacuna);
    const dosis = fechaSegundaDosis
      ? [validarFecha(fechaPrimeraDosis), validarFecha(fechaSegundaDosis)]
      : [validarFecha(fechaPrimeraDosis)];
    const nuevaPersona = await Persona.create({
      dni: await validarDni(dni),
      puntoVacunacion: await getPuntoVacunacion(nombrePuntoVacunacion),
      vacuna: vacuna._id,
      dosis,
    });
    return nuevaPersona;
  } catch (error) {
    console.log("Error al introducir la persona en la BBDD", error.message);
  }
};

module.exports = { introducirPersonaVacunada };
