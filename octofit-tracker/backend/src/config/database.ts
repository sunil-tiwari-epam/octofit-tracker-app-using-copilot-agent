import mongoose, { Mongoose } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

let cachedConnection: Mongoose | null = null;

/**
 * Connect to MongoDB and octofit_db database using mongoose
 */
export async function connectToDatabase(): Promise<Mongoose> {
  if (cachedConnection) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log(`Connecting to MongoDB at ${MONGO_URI}`);
    const connection = await mongoose.connect(MONGO_URI);
    cachedConnection = connection;
    console.log('Successfully connected to octofit_db');
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('Disconnected from MongoDB');
  }
}

export default mongoose;
