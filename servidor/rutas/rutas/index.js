const express = require("express");
const rutaCentros = require("./puntosVacunacion");

const router = express.Router();

router.use("/centros", rutaCentros);

module.exports = router;
