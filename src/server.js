#!/usr/bin/node

// import dependencies
const express = require('express')
const path = require('path')
const pages = require('./pages.js')

// starting express
const server = express()

server
    // use body request
    .use(express.urlencoded({ extended: true}))
    // setting start files
    .use(express.static('public'))

    // config template engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')
    
    // application routes
    .get('/', pages.index)
    .get('/add-orphanage', pages.addOrphanage)
    .get('/orphanage-details', pages.orphanageDetails)
    .get('/orphanages-map', pages.orphanagesMap)
    .post('/save-orphanage', pages.saveOrphanage)

// start server
server.listen(5500)