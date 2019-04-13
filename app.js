const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express()
mongoose.connect("mongodb+srv://fareedagha:aghafareedagha@cluster0-wrbv5.mongodb.net/test?retryWrites=true")
mongoose.connection.once('open',()=>{
    console.log('connect')
}).catch((err)=>{
    console.log(err)
})

app.use('/graphql',graphqlHTTP({schema,
graphiql : true}))
app.listen(4000,()=>{
    console.log('now listening server .. 4000')
})