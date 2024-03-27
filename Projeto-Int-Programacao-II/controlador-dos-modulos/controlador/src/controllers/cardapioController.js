const axios = require('axios');



const cadastrar_cardapio = async (req, res) =>{
    const response =  await axios.post('http://localhost:3334/cardapio/cadastrar', req.body);
    return res.status(response.status).json(response.data);
};


const buscar_cardapio = async (req, res) =>{
    const response =  await axios.post('http://localhost:3334/cardapio/buscar', req.body);
    return res.status(response.status).json(response.data);
};
const editar_cardapio = async (req,res) =>{
    const response = await axios.post('http://localhost:3334/cardapio/editar',req.body);
    return res.status(response.status).json(response.data);
}




module.exports = {
    cadastrar_cardapio,
    buscar_cardapio,
    editar_cardapio
};