import { Sequelize } from 'sequelize';

// Configuration environment for Sequelize

const validate_env_vars = (env_vars: string[]) => {
  const missing = env_vars.filter((varName) => !process.env[varName]);
  if (missing.length > 0) {
    console.error(new Error(`${'='.repeat(37)} SERVER STARTUP ❌ ${'='.repeat(37)} `));
    console.error(`${'='.repeat(100)}
    ✅ Fix: Check your .env variable values at: '${missing.join(', ')}'`);
    process.exit(1);
  }
};

validate_env_vars(['DATABASE_URL', 'PORT', 'DB_NAME']);

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export default sequelize;
