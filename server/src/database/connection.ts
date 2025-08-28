import sequelize from '../config/db/database';

export const database_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connection established to PostgreSQL database.');
  } catch (error) {
    console.error('Error establishing Sequelize connection to database: ', error);
    process.exit(1);
  }
};

export default sequelize;
