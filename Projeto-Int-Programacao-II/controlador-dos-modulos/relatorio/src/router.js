const express = require('express');
const ticketController = require('./controllers/ticketController');



const router = express.Router();
const relatorioRouter = express.Router();
router.use('/relatorio', relatorioRouter);




//relatorio
relatorioRouter.post('/vendidos', ticketController.vendidos);
relatorioRouter.post('/consumidos', ticketController.consumidos );






module.exports = router;