const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'dog',
    {
      id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          nameValidation(value) {
            if (value.length > 20)
              throw new Error('Nombre debería ser menor a 40 caracteres.');
          },
        },
      },

      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lifetime: {
        type: DataTypes.STRING,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      grupo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      funcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      creadoDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false },
  );
};
