const inquirer = require("inquirer");
const {
  introducirPersonaVacunada,
} = require("../../db/controladores/personas");
const {
  listarPuntosVacunacion,
} = require("../../db/controladores/puntosVacunacion");
const {
  listarVacunas,
  listarVacunasCentro,
  introducirVacuna,
  getVacuna,
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
      {
        value: "salir",
        name: "Salir",
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
  await introducirVacuna(
    preguntasVacuna.vacuna,
    ciudad,
    preguntasVacuna.centroVacunacion
  );
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
  ]);
  const preguntasPersona2 = await inquirer.prompt([
    {
      name: "vacunaCentro",
      message: "Vacuna: (listado con las vacunas del centro seleccionado)",
      type: "list",
      choices:
        (await listarVacunasCentro(preguntasPersona.elegirCentroVacunacion)) ===
        undefined
          ? ["Volver"]
          : await listarVacunasCentro(preguntasPersona.elegirCentroVacunacion),
    },
  ]);
  if (preguntasPersona2.vacunaCentro === "Volver") {
    return -1;
  }
  const preguntasPersona3 = await inquirer.prompt([
    {
      name: "fechaPrimeraDosis",
      message: "Fecha primera dosis: ",
      type: "input",
    },
    {
      name: "fechaSegundaDosis",
      message: "Fecha segunda dosis: ",
      type: "input",
      when: async () => {
        const vacuna = await getVacuna(preguntasPersona2.vacunaCentro);
        return vacuna.dosis === 2;
      },
    },
    {
      name: "anyadirOtraPersona",
      message: "¿Deseas añadir otra persona vacunada?",
      type: "confirm",
    },
  ]);
  await introducirPersonaVacunada(
    preguntasPersona.dni,
    preguntasPersona.elegirCentroVacunacion,
    preguntasPersona2.vacunaCentro,
    preguntasPersona3.fechaPrimeraDosis,
    preguntasPersona3.fechaSegundaDosis
  );
  return { ...preguntasPersona, ...preguntasPersona2, ...preguntasPersona3 };
};

module.exports = {
  preguntasGenerales,
  preguntarVacuna,
  preguntarPersona,
};
