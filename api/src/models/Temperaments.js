const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo. id seteada por pgAdmin
  sequelize.define('temperaments', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, { timestamps: false });
};
