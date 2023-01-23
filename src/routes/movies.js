const { Router } = require('express');
const router = Router();

const data = require('../movies.json')

router.get('/', (req, res) => {
    res.json(data);
});

router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        const id = data.length + 1;
        const newMovie = {...req.body, id };
        data.push(newMovie);
        res.json(data);
    }
    else {
        res.status(500).json({ "error": "You must fill all fields" })
    }
});

module.exports = router;