const express = require('express');
const router = express.Router();
const { Temperaments } = require('../db.js');
const getTempers = require('../controllers/controllersTemps.js');

/* GET /temperaments:
    obtener todos los temperamentos posibles
    en una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */

router.get('/', async (req, res) => {
  const infoApi = await getTempers();

  const allTemperaments = await Temperaments.findAll();
  res.status(200).send(allTemperaments);
});

module.exports = router;
