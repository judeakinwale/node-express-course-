const { response } = require('express')
const express = require('express')
const {products, people} = require('./data')

const app = express()

// // get static files
// app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1> <a href='/api/products'>products</a>")
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((products) => {    
        const {id, name, image, price} = products
        return {id, name, image, price}
    })
    res.json(newProducts)
})

app.get('/api/products/:productId', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    const {productId} = req.params
    const singleProduct = products.find(
        (product) => product.id === Number(productId)
    )

    if (!singleProduct) {
        return res.status(404).send("Product does not exist")
    }
    return res.json(singleProduct)
})

app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
    console.log(req.params)
    res.send('Hello world')
})

app.get('/api/v1/query', (req, res) => {
    console.log(req.query)
    return res.send("hello world")
})

app.listen(5000, () => {
    console.log("server listening on port 5000....")
})
