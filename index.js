import express from "express"
import mongoose from "mongoose";
import router from "./routes/index.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
const app = express()
const port = 3000

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://dhuruvbansl99:Shubham123@cluster0.jos6q.mongodb.net/");
}

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type']
}

app.use(cors(corsOptions))

app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use(cookieParser())
app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
        httpOnly: false,
        withCredentials: true,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(router)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})