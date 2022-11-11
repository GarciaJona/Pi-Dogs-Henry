const { Router } = require('express');
const dogsRouter = require('./dogsRouter.js')
const temperamentsRouter = require('./temperamentsRouter.js')

const router = Router();

// config de routers. 
// en temperaments, solo el get de los mismos
// en dogs, una gran variedad que sustenta al proyecto.

router.use('/dogs', dogsRouter)
router.use('/temperaments', temperamentsRouter)


module.exports = router;