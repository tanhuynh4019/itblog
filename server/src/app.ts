import express, {Application} from 'express'
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"

import config from './config/config'
import router from './router'

const app: Application = express()

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('', express.static(__dirname + '/uploads'))

// ** Connect to Mongo **
mongoose.connect(config.mongo.url, config.mongo.options).then((client) => {
    console.log('👍 Database connection successful!')
}).catch(() => console.log('😥 Database connection failed!'))

// ** Connect router **
router(app)

// ** Connect server **
app.listen(config.server.server_port, () => console.log(`Connect port ${config.server.server_port}`))
