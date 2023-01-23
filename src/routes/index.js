const { Router } = require('express');
const router = Router()

router.get('/', (req, res) => {
    res.json(
        {
            "Ttile": "Hola mundo"
        }
    );
});

module.exports = router;