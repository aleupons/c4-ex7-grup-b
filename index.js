const { preguntar } = require("./cli/preguntador");
const {
  preguntasGenerales,
  preguntarVacuna,
  preguntarPersona,
} = require("./cli/preguntas/preguntas");

require("./db/index");

const hazPreguntas = async () => {
  const ciudad = "Barcelona";
  const respuestas = await preguntar(preguntasGenerales);
  if (respuestas.opcion === "introducirVacunas") {
    const respuestasVacuna = await preguntarVacuna(ciudad);
    if (!respuestasVacuna.anyadirOtraVacuna) {
      await hazPreguntas();
    } else {
      await preguntarVacuna(ciudad);
    }
  } else if (respuestas.opcion === "introducirPersonasVacunadas") {
    const respuestasPersona = await preguntarPersona(ciudad);
    if (respuestasPersona === -1 || respuestasPersona.anyadirOtraPersona) {
      await preguntarPersona(ciudad);
    } else {
      await hazPreguntas();
    }
  } else if (respuestas.opcion === "salir") {
    process.exit(0);
  }
};

(async () => {
  await hazPreguntas();
})();
