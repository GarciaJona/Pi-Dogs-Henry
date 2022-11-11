const express = require('express');
const router = express.Router();
const { Dog, Temperaments } = require('../db.js');
const { getAll, dataApi } = require('../controllers/controllers');
const getTempers = require('../controllers/controllersTemps.js');
const { query } = require('express');
const { Op } = require('sequelize');

//-------------------GET / dogs -------------------//

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    let queryDog = await Dog.findAll();
    if (name) {
      queryDog = await Dog.findAll({
        where: {
          name: { [Op.iLike]: `${name}%` },
        },
      });
    }
    res.status(200).send(queryDog);
  } catch (error) {
    res.status(404).send(error.message);
  }

});

//-------------------GET / ID -------------------//

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const perrito = await Dog.findOne({
      where: {
        id: { [Op.eq]: id },
      },
    });

    res.status(200).send(perrito);
  } catch (error) {
    res.status(400).json('ERROR: pedazo de pelotudo.');
  }
});

// //------------------- Post -------------------//

router.post('/', async (req, res) => {
  const { name, id, height, weight, life, image, creatInDb, temperaments } =
    req.body
  try {
    const dogCreated = await Dog.create ({name, id, height, weight, life, image, creatInDb, temperaments});
    if (temperaments) {
      temperaments.map(async (temperament) => {
        let temps = await Temperaments.findOne({
          where: {
            name: temperament,
          },
        });
        dogCreated.addTemperament(temps);
      });
    }
    res.status(200).send('Creado Exitosamente');
  } catch (error) {
    res.status(404).send(error.message);
    // res.status(404).send(error.message);
  }
});

// //------------------- Delete -------------------//

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    if (id) {
      const deleteDog = await Dog.findByPk(id);

      if (deleteDog) {
        await deleteDog.destroy();
        res.status(200).send('Dog was deleted successfully.');
      } else res.status(404).status('ERROR: No matches for that ID.');
    } else res.status(400).send('ERROR: ID does not exist.');
  } catch (err) {
    res.status(400).send('ERROR: Unexpected error.');
  }
});

// //------------------- Put -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//

router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      height,
      weight,
      lifetime,
      image,
      temperaments,
      funcion,
      grupo,
    } = req.body;
    const { id } = req.params;

    await Dog.update(
      {
        name,
        height,
        weight,
        lifetime,
        image,
        temperaments,
        funcion,
        grupo,
      },
      {
        where: {
          id,
        },
      },
    );
    res.status(200).send("Dog has been modified");
  } catch (err) {
    res.status(404).send(error.message);
  }

});

module.exports = router;

// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//

