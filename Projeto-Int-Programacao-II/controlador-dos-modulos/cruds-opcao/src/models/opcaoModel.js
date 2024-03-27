const connection = require('./connection');
require('dotenv').config();


const cadastrar_opcao = async (opcao1, opcao2, vegana, fast_grill, suco, sobremesa ) => {
    try {
        
        const query = 'INSERT INTO opcao_refeicao (opcao1, opcao2, vegana, fast_grill, suco, sobremesa) VALUES (?, ?, ?, ?, ?, ?)';
    
        const [result] = await connection.execute(query, [opcao1, opcao2, vegana, fast_grill, suco, sobremesa]);

        // Recuperar o ID gerado após a inserção
        
        const codigoOpcaoInserida = result.insertId;

        return codigoOpcaoInserida;
    } catch (error) {
        console.error("Erro ao cadastrar opção de refeição:", error);
        throw error;
    }
};

const buscar_opcao = async (codigoOpcao) => {
    try {
        const query = 'SELECT * FROM opcao_refeicao WHERE codigo_opcao = ?';
        const [opcoes] = await connection.execute(query, [codigoOpcao]);
        if(opcoes.length ===0){
            return{erro:"opção não existe"};
        }
        return opcoes;
    } catch (error) {
        console.error("Erro ao buscar opção de refeição:", error);
        throw error;
    }
};

const editar_opcao = async (codigo, opcao1, opcao2, vegana, fast_grill, suco, sobremesa) => {
    try {
        const result = await buscar_opcao(codigo);
        if ('erro' in result) {
            return { erro: result.erro };
        }
        // Consulta SQL para editar a opção de refeição
        var query = 'UPDATE opcao_refeicao SET opcao1 = ?, opcao2 = ?, vegana = ?, fast_grill = ?, suco = ?, sobremesa = ? WHERE codigo_opcao = ?';
        
        // Executar a consulta
        await connection.execute(query, [opcao1, opcao2, vegana, fast_grill, suco, sobremesa, codigo]);
        
        return {mensagem :'Opção de refeição editada com sucesso.'};
    } catch (error) {
        console.error("Erro ao editar opção de refeição:", error);
        throw error;
    }
};





module.exports ={
    cadastrar_opcao,
    buscar_opcao,
    editar_opcao
}