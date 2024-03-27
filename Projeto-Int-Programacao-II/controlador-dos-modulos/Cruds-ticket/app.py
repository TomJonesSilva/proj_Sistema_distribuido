from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Função para conectar ao banco de dados
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="lLAWLIET0",
        database="ru"
    )

# Rota para comprar ticket
@app.route('/ticket/comprar', methods=['POST'])

def comprar_ticket():
    print("entrou 1")

    req_data = request.get_json()
    print("entrou 2")
    tipo = req_data['tipo']
    print("entrou 3")
    usuario = req_data['usuario']
    print("entrou 4")
    # Conectar ao banco de dados
    conn = conectar_bd()
    cursor = conn.cursor()

    # Inserir ticket no banco de dados
    query = "INSERT INTO ticket_refeicao (tipo,data_venda, usuario) VALUES (%s, NOW(), %s)"
    cursor.execute(query, (tipo, usuario))
    conn.commit()

    conn.close()

    return jsonify({"mensagem": "Ticket comprado com sucesso"}), 200










# Rota para listar tickets
@app.route('/ticket/listar', methods=['GET'])

def listar_ticket():
    # Conectar ao banco de dado
    conn = conectar_bd()
    cursor = conn.cursor()

    query = "SELECT * FROM ticket_refeicao"
    cursor.execute(query)
    lista = cursor.fetchall()
    conn.commit()

    conn.close()

    return jsonify(lista), 200

# Rota para listar tickets
@app.route('/ticket/naoConsumidos', methods=['POST'])

def listar_ticketConsumidos():

    req_data = request.get_json()
    usuario = req_data['usuario']
    tipo = req_data['tipo']

    # Conectar ao banco de dado
    conn = conectar_bd()
    cursor = conn.cursor()

    # Verificar se o usuário possui um ticket a ser consumido
    query = "SELECT * FROM ticket_refeicao WHERE usuario = %s AND tipo = %s AND data_consumo IS NULL"
    cursor.execute(query, (usuario, tipo))
    result = cursor.fetchall()
    total = len(result)
    conn.close()

    return jsonify({"total":total,}), 200



# Rota para consumir ticket
@app.route('/ticket/consumir', methods=['POST'])
def consumir():
    req_data = request.get_json()
    usuario = req_data['usuario']
    tipo = req_data['tipo']

    # Conectar ao banco de dados
    conn = conectar_bd()
    cursor = conn.cursor(buffered=True)

    # Verificar se o usuário possui um ticket a ser consumido
    query = "SELECT * FROM ticket_refeicao WHERE usuario = %s AND tipo = %s AND data_consumo IS NULL"
    cursor.execute(query, (usuario, tipo))
    result = cursor.fetchone()

    if result:
        # Atualizar o ticket para indicar que foi consumido
        query = "UPDATE ticket_refeicao SET data_consumo = CURRENT_TIMESTAMP WHERE ticket_codigo = %s"
        cursor.execute(query, (result[0],))
        conn.commit()
        conn.close()
        return jsonify({"mensagem": "Ticket consumido com sucesso"}), 200
    else:
        conn.close()
        return jsonify({"erro": "Nenhum ticket disponível para consumo"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=3333)
