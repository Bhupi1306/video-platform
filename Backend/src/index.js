import bodyParser from "body-parser"
import express from "express"
import {connectDb} from "../database/database.js"
import 'dotenv/config'
import { userRouter } from "../Routes/user.routes.js"

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/api/v1/user',userRouter)

app.listen(port, () => {
    connectDb()
    console.log(`Example app listening on port ${port}`)
})
