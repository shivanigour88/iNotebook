const mongoose = require('mongoose');
const mongURI = "mongodb://localhost:27017"

const connectToMongo = ()=>{
    mongoose.connect(mongURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
}

module.exports = connectToMongo;