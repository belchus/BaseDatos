import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket} from 'socket.io'
import normalizeM from './normalize.js'
import options from './options/options.js'
import ContenedorSQL from './api/contenedorSQL.js'
//import Messages from './api/messages.js'

import { faker } from "@faker-js/faker";
faker.locale = 'es'
//const apiProducts = require('./api/contenedor.js')
//const apiMessages = require('./api/messages.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
const products = new ContenedorSQL(options.mySql, 'misproductos')
const messages = new ContenedorSQL(options.sqlite3, 'mensajes')


const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

io.on('connection', async socket => {
    console.log('Cliente esperando en linea')
    io.sockets.emit('productsTable', await products.getAll())
    socket.on('newProduct', async data => {
        await products.save(data)
        io.sockets.emit('productsTable', await products.getAll())
    })
    io.sockets.emit('allMessages', {
        normalizedM: normalizeM(await messages.getAll()),
        dataLength: JSON.stringify(await messages.getAll()).length
    })

    socket.on('newMessage', async data => {
        data.date = new Date().toLocaleString()
        await messages.save(data)
        io.sockets.emit('allMessages', {
            normalizedM: normalizeM(await messages.getAll()),
            dataLength: JSON.stringify(await messages.getAll()).length
        })
    })

})

app.get('/test', (req, res) => {
    let objetos = []
    let cantidad = 10
    let id = 20

    if (req.query.cantidad) {
        cantidad = req.query.cantidad
    }

    for (let i = 0; i < cantidad; i++) {
        let title  =faker.commerce.productName()
        let price = faker.commerce.price()
        let thumbnail = faker.image.imageUrl()

        objetos.push({ id, title, price, thumbnail })

        id++
    }

    res.json(objetos)
})