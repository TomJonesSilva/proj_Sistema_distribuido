const connection = require('./connection');
const moment = require('moment');
require('dotenv').config();
const axios = require('axios');

const cadastrar_cardapio = async (dataInicio, tipo, opcaoSegunda, opcaoTerca, opcaoQuarta, opcaoQuinta, opcaoSexta) => {
    const query = 'SELECT * FROM cardapio WHERE data_inicio =? && tipo = ?';
    const [result] = await connection.execute(query,[dataInicio,tipo]);
    if(result.length >0){
        return {erro: "essa semana ja tem cardapio cadastrado"};
    }
    try {
        const query = 'INSERT INTO cardapio (data_inicio, tipo, opcao_segunda, opcao_terca, opcao_quarta, opcao_quinta, opcao_sexta) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [dataInicio, tipo, opcaoSegunda, opcaoTerca, opcaoQuarta, opcaoQuinta, opcaoSexta]);
        return { mensagem: "Cardápio cadastrado com sucesso." };
    } catch (error) {
        console.error("Erro ao cadastrar cardápio:", error);
        throw error;
    }
};

const buscar_cardapio = async (dataInicio, tipo) => {
    try {
        // Consulta SQL para obter o cardápio com base na data de início e tipo
        const query = 'SELECT * FROM cardapio WHERE data_inicio = ? AND tipo = ?';
        const [result] = await connection.execute(query, [dataInicio, tipo]);

        // Verificar se o cardápio foi encontrado
        if (result.length === 0) {
            return { erro: "Cardápio não encontrado." };
        }

        // Retornar o cardápio
        return {
            data_inicio: result[0].data_inicio,
            tipo: result[0].tipo,
            opcoes: {
                segunda: result[0].opcao_segunda,
                terca: result[0].opcao_terca,
                quarta: result[0].opcao_quarta,
                quinta: result[0].opcao_quinta,
                sexta: result[0].opcao_sexta
            }
        };
    } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
        throw error;
    }
};

const editar_cardapio = async (dataInicio, tipo, opcaoSegunda, opcaoTerca, opcaoQuarta, opcaoQuinta, opcaoSexta) => {
    try {
        // Verifica se a data de início está dentro da mesma semana que a data atual
        const dataAtual = moment();
        const dataInicioCardapio = moment(dataInicio, 'YYYY-MM-DD');
        
        // Verifica se a data de início do cardápio está na semana atual ou em uma semana futura
        if (dataInicioCardapio.isBefore(dataAtual, 'week')) {
            return { Error: "Não é possível alterar cardápios de semanas passadas." };
        }
        
        var query = 'SELECT * FROM cardapio WHERE data_inicio = ? && tipo = ?';
        const [result] = await connection.execute(query,[dataInicio,tipo]);
        if(result.length === 0){
            return {erro:"Não existe cardapio cadastrado nessa semana desse tipo "}
        }
        // Realiza a atualização do cardápio
        var query = `
            UPDATE cardapio
            SET opcao_segunda = ?, opcao_terca = ?, opcao_quarta = ?, opcao_quinta = ?, opcao_sexta = ?
            WHERE data_inicio = ? AND tipo = ?
        `;
        await connection.execute(query, [opcaoSegunda, opcaoTerca, opcaoQuarta, opcaoQuinta, opcaoSexta, dataInicio, tipo]);

        return { mensagem: "Cardápio atualizado com sucesso." };
    } catch (error) {
        console.error("Erro ao editar cardápio:", error);
        throw error;
    }
};

module.exports = {
    cadastrar_cardapio,
    buscar_cardapio,
    editar_cardapio
};
