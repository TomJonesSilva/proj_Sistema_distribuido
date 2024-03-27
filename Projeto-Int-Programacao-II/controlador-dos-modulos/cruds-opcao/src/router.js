const express = require('express');
const opcaoController = require('./controllers/opcaoController');



const router = express.Router();
const opcaoRouter = express.Router();
router.use('/opcao', opcaoRouter);




//cardapio
opcaoRouter.post('/cadastrar', opcaoController.cadastrar_opcao);
opcaoRouter.post('/buscar', opcaoController.buscar_opcao);
opcaoRouter.post('/editar', opcaoController.editar_opcao);





module.exports = router;