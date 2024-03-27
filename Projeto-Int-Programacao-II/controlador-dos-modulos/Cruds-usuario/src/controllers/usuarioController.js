const usuarioModel = require('../models/usuarioModel');

const getAll = async (req,res) => {

    const usuario = await usuarioModel.getAll();

    return res.status(200).json({
        usuario
    });
};

const sigIn = async (req,res) => {
    
    const usuario = await usuarioModel.sigIn(req.body, res);
        
    if ('mensagem' in usuario) {
        return res.status(201).json({ mensagem: usuario.mensagem });
    } else {
        return res.status(200).json(usuario);
    }
};


const sigUp = async (req,res) => {

    const usuario = await usuarioModel.sigUp(req.body,res);
    
    if('erro' in usuario)
        return res.status(201).json({mensagem: usuario.erro});
    else
        return res.status(200).json(usuario);
};

const buscarUsuario = async (req,res) => {
    const busca = await usuarioModel.buscarUsuario(req.body.cpf);
    if(busca != null){
        return res.status(200).json(busca);
    } else {
        return res.status(201).json({mensagem:'usuario nao existe'});
    }
    
};

const deleteUser = async (req,res) => {
    const usuario = await usuarioModel.deleteUser(req.body.cpf);
    if('erro' in usuario)
        return res.status(201).json({mensagem:usuario.erro});
    else
        return res.status(200).json(usuario);
};

const ediUser = async (req,res) => {
    const usuario = await usuarioModel.ediUser(req.body);
    if('erro' in usuario){
        return res.status(201).json({mensagem: usuario.erro});
    } else {
        return res.status(200).json(usuario);
    }
};

module.exports = {
    getAll,
    sigUp,
    sigIn,
    buscarUsuario,
    deleteUser,
    ediUser
};