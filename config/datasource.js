import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

/**
 * database instance
 *
 * @prop {Sequelize} sequelize
 * @prop {Sequelize} Sequelize
 * @prop {object} models
 */
let database = null;

/**
 * load all models
 *
 * @param {Sequelize} sequelize
 * @returns {array} models
 */
const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../src/models');
  const models = [];

  fs
    .readdirSync(dir)
    .forEach((file) => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);

      models[model.name] = model;
    });

  return models;
};

export default (app) => {
  // check if database is already started
  if (!database) {
    const { config } = app;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );

    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize);

    // synchronize all models
    sequelize.sync().done(() => database);
  }

  return database;
};
