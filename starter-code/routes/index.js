const express = require('express');

const Celebrity = require('../models/Celebrity');

const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

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
            res.render('celebrities/add-celebrity', { errorMessage: 'INSERT ALL FIELDS YOU INCOMPETENT USER!' });

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
            res.render('celebrities/edit-celebrity', { celebrity, errorMessage: 'INSERT ALL FIELDS YOU INCOMPETENT USER!' });

            return;
        }

        await Celebrity.findByIdAndUpdate(id, { $set: { name, occupation, catchPhrase } });

        res.redirect('/celebrities');
    } catch (error) {
        return nxt(error);
    }
});

module.exports = router;
