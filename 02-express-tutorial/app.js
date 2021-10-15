const { response } = require('express')
const express = require('express')
const {products, people} = require('./data')

const app = express()

// // get static files
// // will also use the index.html in the public folder as the home page
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
    const {search, limit} = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((products) => {
            return products.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    // if there are no products matching the search
    if (sortedProducts.length < 1) {
        // return res.status(200).send('No products matched your search')
        return res.status(200).json({
            sucess: true,
            data: [],   
        })
    } 

    return res.status(200).json(sortedProducts)
    // return res.send("hello world")
})

app.listen(5000, () => {
    console.log("server listening on port 5000....")
})
