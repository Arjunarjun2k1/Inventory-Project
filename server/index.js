const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const inventoryRouter = require('./routes/inventoryRoutes')

const app = express()
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(express.json())

app.use((req,res,next)=>{
    console.log('Incoming')
    console.log(req.url)
    next()
})

app.use('/api/item',inventoryRouter)

mongoose.connect('mongodb+srv://arjunkk2k1:XvRUJcE30wPX7P9Z@cluster0.hdkutt9.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log(`DB connection successfull`)
})

const port = 8000
app.listen(port,'localhost',()=>{
    console.log(`Listening on ${port}`)
})
