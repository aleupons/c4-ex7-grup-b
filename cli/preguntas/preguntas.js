const preguntas = [
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
  {
    name: "centroVacunacion",
    message: "centro de vacunacion:",
    type: "list",
    choices: [
      { value: "santIsidor", name: "Sant Isidor- Centre vacunal CAPSBE" },
      {
        value: "firaDeBarcelona",
        name: "Fira de Barcelona",
      },
    ],
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirVacunas",
  },
  {
    name: "vacuna",
    message: "vacuna:",
    type: "list",
    choices: [
      { value: "vacunaPfizer", name: "Vacuna Pfizer" },
      {
        value: "vacunaPfizer",
        name: "Vacuna Pfizer",
      },
    ],
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirVacunas",
  },
  {
    name: "anyadirOtraVacuna",
    message: "¿Añadir otra vacuna?",
    type: "confirm",
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirVacunas",
  },
  {
    name: "dni",
    message: "Por favor inidique su DNI:",
    type: "input",
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirPersonasVacunadas",
  },
  {
    name: "elegirCentroVacunacion",
    message: "centro de vacunacion:",
    type: "list",
    choices: [
      { value: "santIsidor", name: "Sant Isidor- Centre vacunal CAPSBE" },
      {
        value: "firaDeBarcelona",
        name: "Fira de Barcelona",
      },
    ],
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirPersonasVacunadas",
  },
  {
    name: "vacunaCentro",
    message: "vacuna: (listado con las vacunas del centro seleccionado)",
    type: "list",
    choices: [
      { value: "vacunaPfizer", name: "Vacuna Pfizer" },
      {
        value: "vacunaPfizer",
        name: "Vacuna Pfizer",
      },
    ],
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirPersonasVacunadas",
  },
  {
    name: "fechaPrimeraDosis",
    message: "Fecha primera dosis: ",
    type: "input",
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirPersonasVacunadas",
  },
  {
    name: "fechaSegundaDosis",
    message: "Fecha segunda dosis: ",
    type: "input",
    when: (respuestaAnterior) =>
      respuestaAnterior.opcion === "introducirPersonasVacunadas",
  },
];

module.exports = {
  preguntas,
};

/* const preguntasPreguntas = () => {
  if (preguntas.preguntas.choices[0]) {
    const preguntasVacunas = [
      preguntas[0],
      ...preguntas.slice(1, 3).map((pregunta) => ({
        ...pregunta,
        when: (respuestasAnteriores) =>
          respuestasAnteriores.tipoTransporte === "introducirVacunas",
      })),
    ];
    return preguntasVacunas;
  } else if (preguntas.preguntas.choices[1]) {
    const preguntasIntroducirVacunas = [
      preguntas[0],
      ...preguntas.slice(3).map((pregunta) => ({
        ...pregunta,
        when: (respuestasAnteriores) =>
          respuestasAnteriores.tipoTransporte === "introducirPersonasVacunadas",
      })),
    ];
    return preguntasIntroducirVacunas;
  }
};

const preguntasVacunas = [
  preguntas[0],
  ...preguntas.slice(1, 3).map((pregunta) => ({
    ...pregunta,
    when: (respuestasAnteriores) =>
      respuestasAnteriores.tipoTransporte === "introducirVacunas",
  })),
];

const preguntasIntroducirVacunas = [
  preguntas[0],
  ...preguntas.slice(3).map((pregunta) => ({
    ...pregunta,
    when: (respuestasAnteriores) =>
      respuestasAnteriores.tipoTransporte === "introducirPersonasVacunadas",
  })),
]; */
