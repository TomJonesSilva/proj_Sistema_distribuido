create database ru;
use ru;

CREATE TABLE usuario (
  nome varchar(30) NOT NULL,
  cpf varchar(14) NOT NULL,
  data_nascimento date NOT NULL,
  email varchar(30) NOT NULL,
  senha varchar(30) NOT NULL,
  dia_cadastro timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE funcionario (
  cpf varchar(14) NOT NULL,
  salario decimal(10,2) DEFAULT NULL,
  data_admin date DEFAULT NULL,
  PRIMARY KEY (`cpf`),
  CONSTRAINT `funcionario_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE
);

CREATE TABLE estudante (
  cpf varchar(14) NOT NULL,
  matricula char(9) NOT NULL,
  PRIMARY KEY (`cpf`),
  CONSTRAINT `estudante_ibfk_1` FOREIGN KEY (`cpf`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE
);

CREATE TABLE ticket_refeicao (
  ticket_codigo int AUTO_INCREMENT,
  tipo enum('almoço','janta') DEFAULT NULL,
  data_venda timestamp NULL DEFAULT NULL,
  data_consumo timestamp NULL DEFAULT NULL,
  usuario varchar(14) DEFAULT NULL,
  PRIMARY KEY (`ticket_codigo`),
  CONSTRAINT `ticket_refeicao_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`cpf`) ON DELETE CASCADE
);

CREATE TABLE opcao_refeicao (
  codigo_opcao int AUTO_INCREMENT PRIMARY KEY,
  opcao1 varchar(30) default NULL,
  opcao2 varchar(30) default NULL,
  vegana varchar(30) default NULL,
  fast_grill varchar(30) default NULL,
  suco varchar(30) default NULL,
  sobremesa varchar(30) default NULL
);



CREATE TABLE cardapio (
  data_inicio date NOT NULL,
  tipo enum('almoço','janta') NOT NULL,
  opcao_segunda int DEFAULT NULL,
  opcao_terca int DEFAULT NULL,
  opcao_quarta int DEFAULT NULL,
  opcao_quinta int DEFAULT NULL,
  opcao_sexta int DEFAULT NULL,
  PRIMARY KEY (`data_inicio`,`tipo`),
  CONSTRAINT `fk_opcao_segunda` FOREIGN KEY (`opcao_segunda`) REFERENCES `opcao_refeicao` (`codigo_opcao`) ON DELETE CASCADE,
  CONSTRAINT `fk_opcao_terca` FOREIGN KEY (`opcao_terca`) REFERENCES `opcao_refeicao` (`codigo_opcao`) ON DELETE CASCADE,
  CONSTRAINT `fk_opcao_quarta` FOREIGN KEY (`opcao_quarta`) REFERENCES `opcao_refeicao` (`codigo_opcao`) ON DELETE CASCADE,
  CONSTRAINT `fk_opcao_quinta` FOREIGN KEY (`opcao_quinta`) REFERENCES `opcao_refeicao` (`codigo_opcao`) ON DELETE CASCADE,
  CONSTRAINT `fk_opcao_sexta` FOREIGN KEY (`opcao_sexta`) REFERENCES `opcao_refeicao` (`codigo_opcao`) ON DELETE CASCADE
);


INSERT INTO usuario (nome, cpf, data_nascimento, email, senha, dia_cadastro)
VALUES ('carlos', '12345678912', '1990-01-01', 'email3@example.com', 'senha123', CURRENT_TIMESTAMP);

INSERT INTO funcionario (cpf, salario, data_admin)
VALUES ('12345678912', 3000.00, '2024-02-24');

select * from funcionario;





