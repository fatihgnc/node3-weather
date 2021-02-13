const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// app.js'in bulunduğu absolute path
// console.log(__dirname)
// ve app.js'in absolute path
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App biatch',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Fatih Genç'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page(hbs)',
        helpMessage: 'You have to go from this way darling.',
        name: 'Fatih Genç'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'You have to provide address value!'})
    }

    geocode(req.query.address, (err, {latitude, longitude, placeName} = {}) => {
        if(err) {
            return res.send({
                errorMessage: err
            })
        }

        forecast(latitude,longitude, (err, forecastData) => {
            res.send({
                forecast: forecastData,
                location: placeName,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: 404,
        name: 'Fatih Gencc'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: 404,
        name: 'Fatih Gencc'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}...`)
})