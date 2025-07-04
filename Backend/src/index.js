import bodyParser from "body-parser"
import express from "express"
import {connectDb} from "../database/database.js"
import cors from "cors"
import 'dotenv/config'
import { userRouter } from "../Routes/user.routes.js"
import { categoryRoutes } from "../Routes/category.routes.js"
import videoRoutes from "../Routes/video.routes.js"

const app = express()
const port = process.env.PORT || 8000

app.use(
    cors({
    origin: "https://nirmaan-six.vercel.app", // ← replace with your actual frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you're using cookies or sessions
  })
)

// app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/video',videoRoutes)

app.listen(port, () => {
    connectDb()
    console.log(`Example app listening on port ${port}`)
})
