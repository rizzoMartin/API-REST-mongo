const { Router } = require('express');
const router = Router();

const _ = require('underscore');
const { v4: uuidv4 } = require('uuid');

const data = require('../movies.json');

router.get('/', (req, res) => {
    res.json(data);
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