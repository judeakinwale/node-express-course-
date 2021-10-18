const express = require('express')
const morgan = require('morgan')
const logger = require('./logger')
const authorize = require('./authorize')

const app = express()

// // only applies to paths starting with /api
// app.use('/api', logger)

// app.use([logger, authorize])
// app.use(express.static('./public'))
app.use(morgan('tiny'))

// req => middleware => res
app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    console.log(req.user)
    res.send('Items')
})

app.listen(5000, () => {
    console.log("server listening on port 5000....")
})
