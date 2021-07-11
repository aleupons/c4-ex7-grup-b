const morgan = require("morgan");
const express = require("express");
const app = require("./init");
const { error404, errorGeneral } = require("./errores");
const rutaParaVacunacion = require("./rutas/index");

app.use(morgan("dev"));
app.use(express.json());

app.use("/vacunacion", rutaParaVacunacion);

app.use(error404);
app.use(errorGeneral);
