const axios = require("axios")
const { Temperaments } = require("../db")
const { API_KEY } = process.env;

const getTempers = async () => {
        const dogsAll = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${ API_KEY }`);
        const temperAll = dogsAll.data.map((e) => e.temperament)
        .toString()
        .split(",");

        const tempers = [...new Set(temperAll)].map(e => {
            return { name: e.trim() }
        });
        const newDataBase = Temperaments.bulkCreate(tempers)
        return newDataBase;
}

module.exports = getTempers