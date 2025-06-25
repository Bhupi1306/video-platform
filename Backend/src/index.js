import bodyParser from "body-parser"
import express from "express"
import {connectDb} from "../database/database.js"
import cors from "cors"
import 'dotenv/config'
import { userRouter } from "../Routes/user.routes.js"
import { categoryRoutes } from "../Routes/category.routes.js"

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/categories', categoryRoutes)

app.listen(port, () => {
    connectDb()
    console.log(`Example app listening on port ${port}`)
})
