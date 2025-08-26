import sequelize from '../config/db/database';

export const connect_to_database = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connection to database established.');
  } catch (error) {
    console.error('Error establishing Sequelize connection to database: ', error);
    process.exit(1);
  }
};

export default sequelize;
