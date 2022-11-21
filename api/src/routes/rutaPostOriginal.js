// router.post('/', async (req, res) => {
//     const { name, id, height, weight, life, image, creatInDb, temperaments } =
//       req.body;
//     try {
//       const dogCreated = await Dog.create({
//         id,
//         name,
//         height,
//         weight,
//         life,
//         image,
//         creatInDb,
//         temperaments,
//       });
//       if (temperaments) {
//         temperaments.map(async (temperament) => {
//           let temps = await Temperaments.findOne({
//             where: {
//               name: temperament,
//             },
//           });
//           dogCreated.addTemperament(temps);
//         });
//       }
//       res.status(200).send('Creado Exitosamente');
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   });



