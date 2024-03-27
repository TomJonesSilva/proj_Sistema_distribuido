const express = require('express');
const cardapioController = require('./controllers/CardapioController');



const router = express.Router();
const cardapioRouter = express.Router();
router.use('/cardapio', cardapioRouter);




//cardapio
cardapioRouter.post('/cadastrar', cardapioController.cadastrar_cardapio);
cardapioRouter.post('/buscar', cardapioController.buscar_cardapio);
cardapioRouter.post('/editar', cardapioController.editar_cardapio);




module.exports = router;