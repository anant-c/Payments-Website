import express from 'express'
import { connectDb } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

import version1 from './routes/version1.js'
import version2 from './routes/version2.js'

dotenv.config() // for environment variables

const app = express()
app.use(cors()) // enables CORS for all r   outes
app.use(express.json()) //allows to accept JSON data in the req.body


app.use("/api/v1", version1) // => currently doing things with this one

// if we ever release a v2 then all it's api calls will be routed there
app.use("/api/v2", version2)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    connectDb();
    console.log("Starting backend on " + PORT)
})