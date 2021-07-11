const morgan = require("morgan");
const express = require("express");
const app = require("./init");
const { error404, errorGeneral } = require("./errores");

app.use(morgan("dev"));
app.use(express.json());

app.use(error404);
app.use(errorGeneral);
