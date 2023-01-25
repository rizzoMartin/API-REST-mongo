const express = require('express');
const app = express();
const morgan = require('morgan');

// to allow to connect to the server from the same machine
const cors = require('cors');

// This way our whole app is connected
// with mongo at start and
// I can use it just using
// const mongo = require( '../db/conn' );
// const db = mongo.getDb();
// db.collection( 'collection' ).find()

const mongo = require('./db/conn')
mongo.connectToServer((err) => {
    if(err) throw err

    // Configurations 
    app.set('port', process.env.PORT || 3000);
    app.set('json spaces', 2);
    app.use(cors());

    // Middleware
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // Routing
    app.use(require('./routes/movies'));
    // app.use('/api/movies', require('./routes/movies'));

    // Server initiation
    app.listen(app.get('port'), ()=>{
        console.log(`Server listening on port ${app.get('port')}`);
    });
});

