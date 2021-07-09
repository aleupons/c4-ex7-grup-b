const { preguntar } = require("./cli/preguntador");
const { preguntas } = require("./cli/preguntas/preguntas");
const {
  listarPuntosVacunacion,
} = require("./db/controladores/puntosVacunacion");

const hazPreguntas = async () => {
  const respuestas = await preguntar(preguntas);
  return respuestas;
};

(async () => {
  await hazPreguntas();
  await listarPuntosVacunacion();
})();
