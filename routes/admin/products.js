const express = require('express');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const {requireTitle, requirePrice} = require('./validators');
const {handleErrors, requireAuth} = require('./middlewares');
const productsIndexTempalte = require('../../views/admin/products/index');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()})

router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTempalte({products}));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', requireAuth, upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const {title, price} = req.body;
    console.log(title, price)
    await productsRepo.create({title, price, image});

    res.redirect('/admin/products');
});

router.get('/admin/products/:id/edit', (req, res) => {
    console.log(req.params.id);
})

module.exports = router;