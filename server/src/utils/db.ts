import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../config/config';

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
  } catch (e) {
    console.log('Failed to connect to database');
    return process.exit(1);
  }
  return null;
};

export { connectToDatabase, sequelize };
