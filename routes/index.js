const express = require('express');

const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

// Celebrities Routes

router.get('/celebrities', async (req, res, nxt) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities-list', { celebrities });
    } catch (error) {
        return nxt(error);
    }
});

router.get('/celebrities/new', (req, res, nxt) => {
    res.render('celebrities/add-celebrity');
});

router.get('/celebrities/:id', async (req, res, nxt) => {
    try {
        const { id } = req.params;

        const celebrity = await Celebrity.findById(id);

        res.render('celebrities/celebrity-detail', celebrity);
    } catch (error) {
        return nxt(error);
    }
});

router.post('/celebrities', async (req, res, nxt) => {
    try {
        const { name, occupation, catchPhrase } = req.body;

        if (!name || !occupation || !catchPhrase) {
            res.render('celebrities/add-celebrity', { errorMessage: 'All fields required!' });

            return;
        }

        const newCeleb = new Celebrity({ name, occupation, catchPhrase });

        await newCeleb.save();

        res.redirect('/celebrities');
    } catch (error) {
        return nxt(error);
    }
});

router.post('/celebrities/:id/delete', async (req, res, nxt) => {
    try {
        const { id } = req.params;

        await Celebrity.findByIdAndDelete(id);

        res.redirect('/celebrities');
    } catch (error) {
        return nxt(error);
    }
});

router.get('/celebrities/:id/edit', async (req, res, nxt) => {
    try {
        const { id } = req.params;

        const celebrity = await Celebrity.findById(id);

        res.render('celebrities/edit-celebrity', { celebrity });
    } catch (error) {
        return nxt(error);
    }
});

router.post('/celebrities/:id', async (req, res, nxt) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        const { id } = req.params;

        if (!name || !occupation || !catchPhrase) {
            const celebrity = await Celebrity.findById(id);
            res.render('celebrities/edit-celebrity', { celebrity, errorMessage: 'All fields required!' });

            return;
        }

        await Celebrity.findByIdAndUpdate(id, { $set: { name, occupation, catchPhrase } });

        res.redirect('/celebrities');
    } catch (error) {
        return nxt(error);
    }
});

// Movies routes

router.get('/movies', async (req, res, nxt) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies-list', { movies });
    } catch (error) {
        return nxt(error);
    }
});

router.get('/movies/new', (req, res, nxt) => {
    res.render('movies/add-movie');
});

router.get('/movies/:id', async (req, res, nxt) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);

        res.render('movies/movie-detail', movie);
    } catch (error) {
        return nxt(error);
    }
});

router.post('/movies', async (req, res, nxt) => {
    try {
        const { title, genre, plot } = req.body;

        if (!title || !genre || !plot) {
            res.render('movies/add-movie', { errorMessage: 'All fields required!' });

            return;
        }

        const newMovie = new Movie({ title, genre, plot });

        await newMovie.save();

        res.redirect('/movies');
    } catch (error) {
        return nxt(error);
    }
});

router.post('/movies/:id/delete', async (req, res, nxt) => {
    try {
        const { id } = req.params;

        await Movie.findByIdAndDelete(id);

        res.redirect('/movies');
    } catch (error) {
        return nxt(error);
    }
});

router.get('/movies/:id/edit', async (req, res, nxt) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findById(id);

        res.render('movies/edit-movie', { movie });
    } catch (error) {
        return nxt(error);
    }
});

router.post('/movies/:id', async (req, res, nxt) => {
    try {
        const { title, genre, plot } = req.body;
        const { id } = req.params;

        if (!title || !genre || !plot) {
            const movie = await Movie.findById(id);
            res.render('movies/edit-movie', { movie, errorMessage: 'All fields required!' });

            return;
        }

        await Movie.findByIdAndUpdate(id, { $set: { title, genre, plot } });

        res.redirect('/movies');
    } catch (error) {
        return nxt(error);
    }
});

module.exports = router;
