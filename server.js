const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport') // make sure the configuration execute once and no need to export anything, so no variable
const authRouter = require('./routes/authRoutes')

mongoose.connect(keys.mongoURI)
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// authRoutes return a function and immediately call that function with the app object
//require('./routes/authRoutes')(app)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))