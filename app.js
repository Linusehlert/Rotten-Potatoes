const express = require('express')
const methodOverride = require('method-override')
const app = express()
const path = require("path");

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rotten-potatoes');

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String,
    rating: Number
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
    res.render('reviews-new', {review: null, title: "New Review"})
})

//CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((review) => {
            console.log(review)
            res.redirect(`/reviews/${review._id}`)
        }).catch((err) => {
        console.log(err.message)
    })
})

//SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id)
        .then((review) => {
            res.render('reviews-one', {review: review})
        })
        .catch((err) => {
            console.log(err.message)
        })
})

//EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id)
        .then((review) => {
            res.render('reviews-edit', {review: review, title: "Edit Review"})
        })
        .catch((err) => {
            console.log(err.message)
        })
})

//UPDATE
app.patch('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

app.listen(3000, () => {
    console.log('Listening...')
})
