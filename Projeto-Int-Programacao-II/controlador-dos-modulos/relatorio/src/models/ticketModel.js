const connection = require('./connection');
require('dotenv').config();


const consumidos = async (dataInicio, dataFim) => {
    try {
        // Consulta para contar os tickets de almoço consumidos entre as datas especificadas
        const queryAlmoco = 'SELECT COUNT(*) AS almocos_consumidos FROM ticket_refeicao WHERE tipo = "almoço" AND data_consumo IS NOT NULL AND data_consumo BETWEEN ? AND ?';
        
        // Consulta para contar os tickets de janta consumidos entre as datas especificadas
        const queryJanta = 'SELECT COUNT(*) AS jantas_consumidas FROM ticket_refeicao WHERE tipo = "janta" AND data_consumo IS NOT NULL AND data_consumo BETWEEN ? AND ?';

        // Executar as consultas no banco de dados
        const [resultAlmoco] = await connection.execute(queryAlmoco, [dataInicio, dataFim]);
        const [resultJanta] = await connection.execute(queryJanta, [dataInicio, dataFim]);

        // Extrair os resultados das consultas
        const almocos = resultAlmoco[0].almocos_consumidos;
        const jantas = resultJanta[0].jantas_consumidas;

        // Retornar o resultado
        return { almocos, jantas };
    } catch (error) {
        // Lidar com erros
        console.error("Erro ao obter a quantidade de tickets consumidos:", error);
        throw error;
    }
};


const vendidos = async (dataInicio, dataFim) => {
    try {
        // Consulta para obter todos os tickets de almoço vendidos entre as datas especificadas
        const queryAlmoco = 'SELECT * FROM ticket_refeicao WHERE tipo = "almoço" AND data_venda BETWEEN ? AND ?';

        // Consulta para obter todos os tickets de janta vendidos entre as datas especificadas
        const queryJanta = 'SELECT * FROM ticket_refeicao WHERE tipo = "janta" AND data_venda BETWEEN ? AND ?';

        // Executar as consultas no banco de dados
        const [almocosVendidos] = await connection.execute(queryAlmoco, [dataInicio, dataFim]);
        const [jantasVendidas] = await connection.execute(queryJanta, [dataInicio, dataFim]);

        // Obter a quantidade de almocos e jantas vendidas
        const almocos = almocosVendidos.length;
        const jantas = jantasVendidas.length;

        // Retornar a quantidade de almocos e jantas vendidas
        return { almocos, jantas };
    } catch (error) {
        // Lidar com erros
        console.error("Erro ao obter os tickets vendidos:", error);
        throw error;
    }
};


module.exports ={
    consumidos,
    vendidos
   
}