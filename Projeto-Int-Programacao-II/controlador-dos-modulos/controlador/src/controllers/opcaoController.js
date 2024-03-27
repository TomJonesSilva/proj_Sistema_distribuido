const axios = require('axios');


const cadastrar_opcao = async (req, res) =>{
    const response =  await axios.post('http://localhost:3337/opcao/cadastrar', req.body);
    return res.status(response.status).json(response.data);
};

const buscar_opcao = async (req, res) =>{
    const response =  await axios.post('http://localhost:3337/opcao/buscar', req.body);
    if('erro' in response.data){
        return res.status(400).json(response.data);
    }
    return res.status(response.status).json(response.data);
};

const editar_opcao = async (req, res) =>{
    const response =  await axios.post('http://localhost:3337/opcao/editar', req.body);
    return res.status(response.status).json(response.data);
};






module.exports = {
    cadastrar_opcao,
    buscar_opcao,
    editar_opcao
};