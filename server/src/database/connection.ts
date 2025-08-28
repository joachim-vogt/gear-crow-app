import sequelize from '../config/db/database';

export const establish_database_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize to Database connection established');
  } catch (error) {
    console.error('❌ Error in establishing Sequelize connection: ', error);
    process.exit(1);
  }
};

export const close_database_connection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Sequelize Database connection closed.');
  } catch (error) {
    console.error('❌ Error closing Sequelize database connection: ', error);
    throw error;
  }
};
