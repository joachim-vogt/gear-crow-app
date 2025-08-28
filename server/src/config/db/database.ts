import { Sequelize } from 'sequelize';
import validated_env from '../../utilities/validate_env_values';

// Sequelize instance configuration for PostgreSQL using validated env values.
const sequelize = new Sequelize(
  validated_env('DB_NAME'),
  validated_env('DB_USERNAME'),
  validated_env('DB_PASSWORD'),
  {
    host: validated_env('DB_HOST'),
    port: parseInt(validated_env('DB_PORT'), 10),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Disables verbose logging in any other environment than 'development'
  },
);

export default sequelize;
