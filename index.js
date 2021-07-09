const { preguntar } = require("./cli/preguntador");
const {
  preguntasGenerales,
  preguntarVacuna,
  preguntarPersona,
} = require("./cli/preguntas/preguntas");

require("./db/index");

const hazPreguntas = async () => {
  const respuestas = await preguntar(preguntasGenerales);
  if (respuestas.opcion === "introducirVacunas") {
    preguntarVacuna("Barcelona");
  } else if (respuestas.opcion === "introducirPersonasVacunadas") {
    preguntarPersona("Barcelona");
  }
  return respuestas;
};

(async () => {
  await hazPreguntas();
})();
