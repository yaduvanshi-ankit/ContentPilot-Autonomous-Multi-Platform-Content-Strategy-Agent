import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'contentpilot-local-development-secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
