const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const port = process.env.PORT ||3000
require('./database/database.ts')

const routes = require ('./routers/routes.ts')

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(port ,(req, res) => {
    console.log(`Listening on Port ${port}`)
})
