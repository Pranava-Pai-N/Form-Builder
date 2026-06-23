import dotenv from 'dotenv'

dotenv.config()

type environment = 'development' | 'production'

interface credentials {
  DATABASE_URL: string
  JWT_SECRET: string
  NODE_ENV: environment
  CLOUD_NAME: string
  API_KEY: string
  API_SECRET: string
}

const credentialProvider: credentials = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  API_KEY: process.env.CLOUDINARY_API_KEY ?? '',
  API_SECRET: process.env.CLOUDINARY_API_SECRET ?? '',
}

export default credentialProvider
