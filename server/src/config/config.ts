import dotenv from 'dotenv'
dotenv.config()

const MONGO_OPTIONS = {
    
}

const MONGO_USERNAME:String = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD:String = process.env.MONGO_PASSWORD || ''
const MONGO_HOST:String = process.env.MONGO_HOST || ''

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

const SERVER_PORT: Number = Number(process.env.PORT) || 3000

const SERVER = {
    server_port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config