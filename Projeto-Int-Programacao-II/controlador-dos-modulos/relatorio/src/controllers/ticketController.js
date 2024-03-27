const ticketModel = require('../models/ticketModel');
const moment = require('moment');



const consumidos = async (req, res) =>{
    const {data1, data2} = req.body;
    //const dataInicio = moment(data1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    //const dataFim = moment(data2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const qtdTicket = await  ticketModel.consumidos(data1, data2);
    return res.status(200).json(qtdTicket);
};

const vendidos = async (req, res) =>{
    const {data1, data2} = req.body;
   // const dataInicio = moment(data1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    //const dataFim = moment(data2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const qtdTicket = await  ticketModel.vendidos(data1, data2);
    return res.status(200).json(qtdTicket);
};



module.exports = {
    consumidos,
    vendidos
};