const express = require('express');
const productsRepo = require('../repositories/products');

const router = express.Router();

router.get('/', async (req, res) => {
    const product = await productsRepo.getAll();
    res.send('stuff');
});

module.exports = router;