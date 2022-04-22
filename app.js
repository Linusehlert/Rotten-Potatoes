const express = require('express')
const methodOverride = require('method-override')
const app = express()
const path = require('path');


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/rotten-potatoes');
//
// const Review = mongoose.model('Review', {
//     title: String,
//     movieTitle: String,
//     description: String,
//     rating: Number
// });
const reviews = require('./controllers/reviews')(app)

app.listen(3000, () => {
    console.log('Listening...')
})
