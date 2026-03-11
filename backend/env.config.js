export const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://localhost:27017/mechanical_contractors';

export const PORT = process.env.PORT || 3001;

// Matches Railway's 3-minute timeout (in ms)
export const TIMEOUT = 180000;

