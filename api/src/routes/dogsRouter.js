const express = require('express');
const router = express.Router();
const { Dog, Temperaments } = require('../db.js');
const { getAll, dataApi } = require('../controllers/controllers');
// const getTempers = require('../controllers/controllersTemps.js');
// const { query } = require('express');
const { Op, where } = require('sequelize');

//-------------------GET / dogs -------------------//

router.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    let queryDog = await dataApi();
    let getAllDataBase = await Dog.findAll();
    const allDogs = [...queryDog, ...getAllDataBase];
    if (name) {
      const getFoundDb = await Dog.findAll({
        where: {
          name: { [Op.iLike]: `${name}%` },
        },
        include: {
          model: Temperaments,
        },
      });
      const rejex = new RegExp('(' + name + ')', 'gi'); // rejex = metodo para string
      const dogFound = await queryDog
        // .map((dog) => dog.name)
        .filter(({ name }) => name.match(rejex));

      return res.status(200).send([...dogFound, ...getFoundDb]);
    }
    res.status(200).send(allDogs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//-------------------GET / ID -------------------//

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await dataApi();
    let perrito = await data.find((perro) => perro.id === parseInt(id));
    if (perrito === undefined) {
      perrito = await Dog.findOne({
        where: {
          id,
        },
      });
    }
    console.log(perrito);
    res.status(200).json(perrito);
  } catch (error) {
    res.status(400).json(error);
  }
});

// //------------------- Post -------------------//

// router.post('/', async (req, res) => {
//   const { name, id, height, weight, life, image, creatInDb, temperaments } =
//     req.body;
//   try {
//     const dogCreated = await Dog.create({
//       id,
//       name,
//       height,
//       weight,
//       life,
//       image,
//       creatInDb,
//       temperaments,
//     });
//     if (temperaments) {
//       temperaments.map(async (temperament) => {
//         let temps = await Temperaments.findOne({
//           where: {
//             name: temperament,
//           },
//         });
//         dogCreated.addTemperament(temps);
//       });
//     }
//     res.status(200).send('Creado Exitosamente');
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_years,
      max_years,
      temperaments,
    } = req.body;
    const height = min_height + " - " + max_height;
    const weight = min_weight + " - " + max_weight;
    const years = min_years + " - " + max_years;
    const dogCreate = await Dog.create({
      name,
      image,
      height,
      weight,
      years,
    });
    let temperDb = await Temperaments.findAll({
      where: { name: temperaments },
    });
    dogCreate.addTemper(temperDb);
    res.status(200).send("Perro creado con exito");
  } catch (error) {
    console.log(error);
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
        res.status(200).send('El perro fue eliminado satisfactoriamente.');
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
    res.status(200).send('Dog has been modified');
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;

// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
// //-------------------NO TOCAR -------------------//
