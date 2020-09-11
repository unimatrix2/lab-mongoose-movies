const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity');

const celebs = [
    {
        name: 'Arnold Schwarzenegger',
        occupation: 'actor',
        catchPhrase: 'I\'ll be back!',
    },
    {
        name: 'Leonard Nimoy',
        occupation: 'actor',
        catchPhrase: 'Live long and prosper',
    },
    {
        name: 'Sir Patrick Stewart',
        occupation: 'actor',
        catchPhrase: 'Engage!',
    },
];

mongoose
    .connect('mongodb://localhost/lab-movies', {useNewUrlParser: true})
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
        Celebrity.insertMany(celebs)
            .then((inserted) => {
                console.log(`Inserted ${inserted.length} celebrities`);
                mongoose.connection.close();
            })
            .catch((err) => console.log(err));
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err);
    });

