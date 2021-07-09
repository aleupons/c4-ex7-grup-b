const Persona = require("../models/Persona");

const validarDni = (dni) => {
  const numero = parseInt(dni.slice(0, 7), 10);
  const letra = dni.slice(-1);
  const letras = "TRWAGMYFPDXBNJZSQVHLCKET";
  if (
    !!numero ||
    numero > 99999999 ||
    dni.length !== 9 ||
    letras.charAt(numero % 23) !== letra.toUpperCase()
  ) {
    console.log("DNI incorrecto");
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
  centroVacunacion,
  vacuna,
  fechaPrimeraDosis,
  fechaSegundaDosis
) => {
  try {
    const nuevaPersona = await Persona.create({
      dni: validarDni(dni),
      centroVacunacion,
      vacuna,
      fechaPrimeraDosis: validarFecha(fechaPrimeraDosis),
      ...(vacuna.dosis === 2 && {
        fechaSegundaDosis: validarFecha(fechaSegundaDosis),
      }),
    });
    return nuevaPersona;
  } catch (error) {
    console.log("Error al introducir la persona en la BBDD", error.message);
  }
};

module.exports = { introducirPersonaVacunada };
