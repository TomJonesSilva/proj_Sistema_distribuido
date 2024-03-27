const cardapioModel = require('../models/cardapioModel');
const moment = require('moment');
const axios = require('axios');

const cadastrar_cardapio = async (req, res) => {
    const { data_inicio, tipo, opcao_segunda, opcao_terca, opcao_quarta, opcao_quinta, opcao_sexta } = req.body;
    

    // Verificar se as opções fornecidas existem antes de cadastrar o cardápio
    try {
        const opcoesExistentes = await Promise.all([
            buscar_opcao(opcao_segunda),
            buscar_opcao(opcao_terca),
            buscar_opcao(opcao_quarta),
            buscar_opcao(opcao_quinta),
            buscar_opcao(opcao_sexta)
        ]);
    
        // Verifica se alguma opção retornou um erro
        const opcoesInvalidas = opcoesExistentes.filter(opcao => opcao && opcao.erro);
        if (opcoesInvalidas.length > 0) {
            const mensagensErro = opcoesInvalidas.map(opcao => opcao.erro);
            return res.status(200).json( mensagensErro );
        }

        // Todas as opções existem, então podemos prosseguir com o cadastro
        const result = await cardapioModel.cadastrar_cardapio(data_inicio, tipo, opcao_segunda, opcao_terca, opcao_quarta, opcao_quinta, opcao_sexta);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao cadastrar cardápio:", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const buscar_cardapio = async (req, res) => {
    const { data_inicio, tipo } = req.body;
    var tipo1;
      if(tipo === "JANTAR" || tipo === "janta")
      tipo1 = "janta";
    else tipo1 = "almoço"

    try {
        const cardapio = await cardapioModel.buscar_cardapio(data_inicio, tipo1);
        console.log(cardapio);
        //verifica se deu erro
        if('erro' in cardapio){
            console.log("entro");
            return res.status(200).json(cardapio);
        }

        // Fazer requisição para obter as opções detalhadas
        const opcoes = {
            segunda: await buscar_opcao(cardapio.opcoes.segunda),
            terca: await buscar_opcao(cardapio.opcoes.terca),
            quarta: await buscar_opcao(cardapio.opcoes.quarta),
            quinta: await buscar_opcao(cardapio.opcoes.quinta),
            sexta: await buscar_opcao(cardapio.opcoes.sexta)
        };

        cardapio.opcoes = opcoes;
        return res.status(200).json(cardapio);
    } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const editar_cardapio =async (req,res) =>{
    const {data_inicio, tipo, opcao_segunda, opcao_terca, opcao_quarta, opcao_quinta, opcao_sexta} = req.body;

    // Verificar se as opções fornecidas existem antes de cadastrar o cardápio
    try {
        const opcoesExistentes = await Promise.all([
            buscar_opcao(opcao_segunda),
            buscar_opcao(opcao_terca),
            buscar_opcao(opcao_quarta),
            buscar_opcao(opcao_quinta),
            buscar_opcao(opcao_sexta)
        ]);
    
        // Verifica se alguma opção retornou um erro
        const opcoesInvalidas = opcoesExistentes.filter(opcao => opcao && opcao.erro);
        if (opcoesInvalidas.length > 0) {
            const mensagensErro = opcoesInvalidas.map(opcao => opcao.erro);
            return res.status(200).json( mensagensErro );
        }
        const result = await cardapioModel.editar_cardapio(data_inicio,tipo,opcao_segunda,opcao_terca,opcao_quarta,opcao_quinta,opcao_sexta);
        return res.status(200).json(result);
    }catch (error) {
        console.error("Erro ao cadastrar cardápio:", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

// Função para buscar opção através da rota http://localhost:3330/opcao/buscar
const buscar_opcao = async (opcaoId) => {
    try {
        const response = await axios.post('http://localhost:3337/opcao/buscar', { codigo: opcaoId });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar opção:", error);
        throw error;
    }
};

module.exports = {
    cadastrar_cardapio,
    buscar_cardapio,
    editar_cardapio
};
