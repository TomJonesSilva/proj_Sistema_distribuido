const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const usuarioMiddleware = require('./middleweres/usuarioMiddleware');
const ticketController = require('./controllers/ticketController');
const relatorioController = require('./controllers/relatorioController');
const cardapioController = require('./controllers/cardapioController');
const opcaoController = require("./controllers/opcaoController");

//const lojaController = require('./controllers/lojaController');

const router = express.Router();

const usuarioRouter = express.Router();
const ticketRounter = express.Router();
const cardapioRouter = express.Router();
const relatorioRouter = express.Router();
const opcaoRouter = express.Router();

router.use('/usuario', usuarioRouter);
router.use('/ticket', ticketRounter);
router.use('/cardapio', cardapioRouter);
router.use('/relatorio', relatorioRouter);
router.use('/opcao',opcaoRouter);



//usuario
usuarioRouter.get('/listar', usuarioController.getAll);
usuarioRouter.post('/login', usuarioMiddleware.validateBodyLogin, usuarioController.signIn);
usuarioRouter.post('/cadastro', usuarioMiddleware.validateBodyCadastro, usuarioController.sigUp);
usuarioRouter.post('/busca',usuarioMiddleware.verifyJTW,usuarioController.buscarUsuario);
usuarioRouter.post('/editar',usuarioController.editUser);
usuarioRouter.post('/excluir',usuarioController.excluirUsuario);

//ticket
ticketRounter.post('/comprar',ticketController.comprar);
ticketRounter.post('/consumir',ticketController.consumir);
ticketRounter.get('/listar',ticketController.listar);
ticketRounter.post('/naoConsumidos',ticketController.listar_ticketConsumidos);


//relatorio
relatorioRouter.post('/vendidos', relatorioController.vendidos);
relatorioRouter.post('/consumidos', relatorioController.consumidos);


//cardapio
cardapioRouter.post('/cadastrar', cardapioController.cadastrar_cardapio);
cardapioRouter.post('/buscar', cardapioController.buscar_cardapio);
cardapioRouter.post('/editar',cardapioController.editar_cardapio);

//opção
opcaoRouter.post('/cadastrar', opcaoController.cadastrar_opcao);
opcaoRouter.post('/buscar', opcaoController.buscar_opcao);
opcaoRouter.post('/editar', opcaoController.editar_opcao);

module.exports = router;