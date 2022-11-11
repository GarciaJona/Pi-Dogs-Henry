const { Dog, Temperaments } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
// le pego a la API y transformo los datos
const dataApi = async () => {
  const apiDogs = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
  );
  const infoDogs = apiDogs.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      lifetime: dog.life_span,
      image: dog.image.url,
      temperaments: dog.temperament,
      funcion: dog.bred_for,
      grupo: dog.breed_group,
    };
  });

  const newDataBase = await Dog.bulkCreate(infoDogs);
  return newDataBase;
};

module.exports = {
  dataApi,
};
