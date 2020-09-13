const mongoose = require('mongoose');

/* const Celebrity = require('../models/Celebrity');

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
]; */

const Movie = require('../models/Movie');

const movies = [
    {
        title: 'Star Trek IV: The Voyage Home',
        genre: 'Sci-fi',
        plot: 'To save Earth from an alien probe, Admiral James T. Kirk and his fugitive crew go back in time to San Francisco in 1986 to retrieve the only beings who can communicate with it: humpback whales.',
    },
    {
        title: 'Star Trek: First Contact',
        genre: 'Sci-fi',
        plot: 'The Borg travel back in time intent on preventing Earth\'s first contact with an alien species. Captain Picard and his crew pursue them to ensure that Zefram Cochrane makes his maiden flight reaching warp speed.',
    },
    {
        title: 'Star Trek Into Darkness',
        genre: 'Sci-fi',
        plot: 'After the crew of the Enterprise find an unstoppable force of terror from within their own organization, Captain Kirk leads a manhunt to a war-zone world to capture a one-man weapon of mass destruction.',
    },
];

mongoose
    .connect('mongodb://localhost/lab-movies', {useNewUrlParser: true})
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
        Movie.insertMany(movies)
            .then((inserted) => {
                console.log(`Inserted ${inserted.length} movies`);
                mongoose.connection.close();
            })
            .catch((err) => console.log(err));
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err);
    });

