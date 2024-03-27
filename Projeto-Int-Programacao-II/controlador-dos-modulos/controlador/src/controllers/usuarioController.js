//const usuarioModel = require('../models/usuarioModel');
const axios = require('axios');

const getAll = async (req,res) => {

    const response = await axios.get('http://localhost:3335/usuario/listar');
    return res.status(response.status).json(response.data);
};



const signIn = async (req, res) => {
    try {
        // Faz uma requisição para a outra API para autenticar o usuário
        const response = await axios.post('http://localhost:3335/usuario/login', req.body);
        console.log(response.status);
        return res.status(response.status).json(response.data);

    } catch (error) {
        // Se ocorrer um erro durante a requisição para a outra API, retorna um erro
        console.error('Erro ao autenticar usuário:', error);
        return res.status(500).json({ messagem: 'Erro interno do servidor' });
    }
};


const sigUp = async (req, res) => {

    const response = await axios.post('http://localhost:3335/usuario/cadastro', req.body);
    
    return res.status(response.status).json(response.data);
};


const buscarUsuario = async (req,res) => {

    const response = await axios.post('http://localhost:3335/usuario/buscar', req.body );
    return res.status(response.status).json(response.data);
};

const excluirUsuario = async (req,res) => {
    
    const response = await axios.post('http://localhost:3335/usuario/excluir', req.body );
    return res.status(response.status).json(response.data);   
};

const editUser = async (req, res) => {
    const response = await axios.post('http://localhost:3335/usuario/editar', req.body );
    return res.status(response.status).json(response.data);
};


module.exports = {
    getAll,
    sigUp,
    signIn,
    buscarUsuario,
    excluirUsuario,
    editUser
};