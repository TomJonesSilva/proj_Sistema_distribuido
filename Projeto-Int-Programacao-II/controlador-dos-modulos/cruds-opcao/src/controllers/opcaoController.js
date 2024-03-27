const opcaoModel = require('../models/opcaoModel');
const moment = require('moment');



const cadastrar_opcao = async (req, res) =>{
    const {opcao1, opcao2, vegana, fast_grill, suco, sobremesa} = req.body;
    
    const codigo_opcao = await  opcaoModel.cadastrar_opcao(opcao1, opcao2, vegana, fast_grill, suco, sobremesa);
    return res.status(200).json(codigo_opcao);
};

const buscar_opcao = async (req, res) =>{
    const {codigo} = req.body;
    
    const opcao_refeicao = await  opcaoModel.buscar_opcao(codigo);
    return res.status(200).json(opcao_refeicao);
};

const editar_opcao = async (req, res) =>{
    const {codigo, opcao1, opcao2, vegana, fast_grill, suco, sobremesa} = req.body;
    
    const result = await  opcaoModel.editar_opcao(codigo, opcao1, opcao2, vegana, fast_grill, suco, sobremesa);
    return res.status(200).json(result);
};







module.exports = {
    cadastrar_opcao,
    buscar_opcao,
    editar_opcao
};