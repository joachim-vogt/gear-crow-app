import sequelize from '../config/db/database';

export const authenticate_database_reachability = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize authenticated reachable connection to Database.');
  } catch (error) {
    console.error('❌ Sequelize could not authenticate DB connection. Error: ', error);
    process.exit(1);
  }
};

export const close_database_connection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Sequelize closed connection to Database.');
  } catch (error) {
    console.error('❌ Error closing Sequelize database connection: ', error);
    throw error;
  }
};
