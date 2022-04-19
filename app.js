const express = require('express')
const app = express()
const path = require("path");

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rotten-potatoes');

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});

// INDEX
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        })
})

//NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {})
})

//CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((review) => {
            console.log(review)
            res.redirect('/')
        }).catch((err) => {
            console.log(err.message)
    })
})


app.listen(3000, () => {
    console.log('Listening...')
})
