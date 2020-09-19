const express = require('express');
const Celebrity = require('../models/Celebrity');

const router = express.Router();
router.get('/celebrities/', async (req, res) => {
    const { name } = req.query;

    const regex = name === 'all' ? '' : new RegExp(name, 'i');

    const celebrities = await Celebrity.find({
        name: { $regex: regex },
    });
    res.json({ celebrities });
});

module.exports = router;
