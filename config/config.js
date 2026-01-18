import dotenv from 'dotenv';
dotenv.config();

const config = {
    DB_URI: process.env.DB_URI,

    
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 2525,
    EMAIL_SECURE: process.env.EMAIL_SECURE === 'true',
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,

  
    APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:5000',

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    
    PORT: process.env.PORT || 5000,
};


const requiredVars = ['DB_URI', 'EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS'];
for (const varName of requiredVars) {
    if (!config[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
}

export default config;
