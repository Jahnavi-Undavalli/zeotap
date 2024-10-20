// database.js
const mongoose = require('mongoose');


const mongoDBUri = 'mongodb+srv://undavallijahnavi354:c2cEbppkLY5Azf0L@cluster0.8bh3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log(mongoDBUri);

mongoose.connect(mongoDBUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
