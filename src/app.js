const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT
const DBURL = process.env.DBURL

mongoose.connect(DBURL).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
const viewPath = path.join(__dirname, "../templetes/views")

const partialPath = path.join(__dirname, "../templetes/partials")
const publicpath = path.join(__dirname, "../public")

app.use(express.static(publicpath))
hbs.registerPartials(partialPath)
app.set("view engine", "hbs")
app.set("views", viewPath)


const homerouter = require("../router/homerouter")
const adminrouter = require("../router/adminrouter")
app.use("/", homerouter)
app.use("/", adminrouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

