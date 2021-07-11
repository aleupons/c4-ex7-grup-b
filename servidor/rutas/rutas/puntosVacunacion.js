const express = require("express");

const {
  listarPuntosVacunacion,
} = require("../../../db/controladores/ciudades");
const { getCiudad } = require("../../../db/controladores/puntosVacunacion");

const router = express.Router();

router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { id } = req.params;
  const ciudad = await getCiudad(id);
  const puntosVacunacion = await listarPuntosVacunacion(ciudad);
  if (!ciudad) {
    const nuevoError = new Error(
      "No existen centros de vacunación en esta ciudad"
    );
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(puntosVacunacion);
});

module.exports = router;
