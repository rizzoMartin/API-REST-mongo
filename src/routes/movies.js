const { Router } = require('express');
const router = Router();

const mongo = require('../db/conn')
const { ObjectId } = require('mongodb')

router.get('/', async function (req, res) {
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

router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        const db = mongo.getDb();
        const newMovie = { ...req.body };
        db.collection('movies').insertOne(newMovie, (err, result) => {
            if (err) {
                res.status(400).send("Error fetching listings!");
            }
            else {
                console.log(`Added a new movie with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
    }
    else {
        res.status(500).json({ "error": "You must fill all fields" });
    }
});

router.put('/:id', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        const db = mongo.getDb();
        const objectId = new ObjectId(req.params)
        const movie ={ _id: objectId };
        console.log(movie)
        const update = {
            $set: {
                "title": title,
                "director": director,
                "year": year,
                "rating": rating,
            }
        };

        db.collection('movies').updateOne(movie, update, (err, _result) => {
            if (err) {
                res.status(400).send(`Error updating movie with id: ${movie._id}`);
            }
            else {
                console.log(`movie with id: ${movie._id} updated`);
                res.status(204).send();
            }
        });
    }
    else {
        res.status(500).json({ "error": "You must fill all fields" });
    }
});

router.delete('/:id', (req, res) => {
    const db = mongo.getDb();
    const objectId = new ObjectId(req.params);
    const movie = { _id: objectId };

    db.collection('movies').deleteOne(movie, (err, _result) => {
        if (err) {
            res.status(400).send(`Error deleting movie with id: ${movie._id}`);
        }
        else {
            console.log(`movie with id: ${movie._id} deleted`)
            res.status(204).send()
        }
    });
});

module.exports = router;