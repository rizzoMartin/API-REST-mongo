const { Router } = require('express');
const router = Router();

const _ = require('underscore');
const { v4: uuidv4 } = require('uuid');

const data = require('../movies.json');
const mongo = require('../db/conn')
// router.get('/', (req, res) => {
//     res.json(data);
// });

router.get('/', async function (req, res) {
    mongo.connectToServer((err) => {
        if (err){
            throw err
        }
        
        const db = mongo.getDb();

        db.collection('movies').find().toArray((err, result) => {
            if (err) {
                res.status(400).send("Error fetching listings!");
            }
            else {
                res.json(result);
            }
        });
    });
});

router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        const id = uuidv4();
        const newMovie = {...req.body, id };
        data.push(newMovie);
        res.json(data);
    }
    else {
        res.status(500).json({ "error": "You must fill all fields" });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const projectIndex = data.findIndex(movie => movie.id == id);
    
    data.splice(projectIndex, 1);

    res.json(data)
});

module.exports = router;