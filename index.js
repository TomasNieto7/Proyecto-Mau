//Dependencies
const morgan = require('morgan')
const express = require('express')
const app = express()
//Routers
const user = require("./routes/users.js")
const notes = require("./routes/notes.js")
//Middleware
const auth = require('./middleware/auth.js')
const index = require('./middleware/index.js')
const notFound = require('./middleware/notFound.js')
const cors = require('./middleware/cors.js')

app.use(cors)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", index)

app.use("/user", user)
app.use(auth)
app.use("/notes", user)


app.use(notFound)

app.listen(3000, () => {
    console.log('Server is running...');
})