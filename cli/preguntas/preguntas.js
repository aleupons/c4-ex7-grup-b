const inquirer = require("inquirer");
const {
  introducirPersonaVacunada,
} = require("../../db/controladores/personas");
const {
  listarPuntosVacunacion,
} = require("../../db/controladores/puntosVacunacion");
const {
  listarVacunas,
  introducirVacuna,
} = require("../../db/controladores/vacunas");

const preguntasGenerales = [
  {
    name: "opcion",
    message: "Opciones",
    type: "list",
    choices: [
      { value: "introducirVacunas", name: "Introducir vacunas" },
      {
        value: "introducirPersonasVacunadas",
        name: "Introducir personas vacunadas",
      },
    ],
  },
];

const preguntarVacuna = async (ciudad) => {
  const preguntasVacuna = await inquirer.prompt([
    {
      name: "centroVacunacion",
      message: "¿En que centro de vacunación se distribuira la vacuna?",
      type: "list",
      choices: await listarPuntosVacunacion(ciudad),
    },
    {
      name: "vacuna",
      message: "¿Cual de las vacunas van a distribuir?",
      type: "list",
      choices: await listarVacunas(),
    },
    {
      name: "anyadirOtraVacuna",
      message: "¿Deseas añadir otra vacuna?",
      type: "confirm",
    },
  ]);
  introducirVacuna(
    preguntasVacuna.vacuna,
    ciudad,
    preguntasVacuna.centroVacunacion
  );
  if (preguntasVacuna.anyadirOtraVacuna) {
    await preguntarVacuna(ciudad);
  }
  return preguntasVacuna;
};

const preguntarPersona = async (ciudad) => {
  const preguntasPersona = await inquirer.prompt([
    {
      name: "dni",
      message: "Por favor inidique su DNI:",
      type: "input",
    },
    {
      name: "elegirCentroVacunacion",
      message: "¿En que centro ha sido o sera vacunado?:",
      type: "list",
      choices: await listarPuntosVacunacion(ciudad),
    },
    {
      name: "vacunaCentro",
      message: "Vacuna: (listado con las vacunas del centro seleccionado)",
      type: "list",
      choices: await listarVacunas(),
    },
    {
      name: "fechaPrimeraDosis",
      message: "Fecha primera dosis: ",
      type: "input",
    },
    {
      name: "fechaSegundaDosis",
      message: "Fecha segunda dosis: ",
      type: "input",
    },
    {
      name: "anyadirOtraPersona",
      message: "¿Deseas añadir otra persona vacunada?",
      type: "confirm",
    },
  ]);
  introducirPersonaVacunada(
    preguntasPersona.dni,
    preguntasPersona.elegirCentroVacunacion,
    preguntasPersona.vacunaCentro,
    preguntasPersona.fechaPrimeraDosis,
    preguntasPersona.fechaSegundaDosis
  );
  if (preguntasPersona.anyadirOtraPersona) {
    await preguntarPersona();
  }
  return preguntasPersona;
};

module.exports = {
  preguntasGenerales,
  preguntarVacuna,
  preguntarPersona,
};
