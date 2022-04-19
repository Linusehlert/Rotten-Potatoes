const express = require('express')
const app = express()
const path = require("path");

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rotten-potatoes');

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
});

app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        })
})



app.get('/', (req, res) => {
    res.render('/home', {msg: 'Moin'})
})

app.listen(3000, () => {
    console.log('Listening...')
})
