const express = require('express')
require('./services/passport') // make sure the configuration execute once and no need to export anything, so no variable
const authRouter = require('./routes/authRoutes')
const { passportConfig } = require('./services/passport')
const keys = require('./config/keys')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

passportConfig(keys.mongoURI)

// authRoutes return a function and immediately call that function with the app object
//require('./routes/authRoutes')(app)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))