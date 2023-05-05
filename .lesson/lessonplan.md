Códificação
--------------------------
index.js
-----------------------
// Importando as biliotecas
const{ Sequelize, Model, DataTypes} = require("sequelize");
//Abrindo conexão com o Banco de dados ou criando um novo caso não exista
const sequelize = new Sequelize({
dialect: "sqlite",
storage: "empresa.sqlite"
});
// Definindo a classe setor
class Setor extends Model{
static init(sequelize){
super.init({

idsetor:{
type: DataTypes.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},

nome:{
type: DataTypes.STRING(60),
allowNull: false
},

ramal:{
type: DataTypes.STRING(6),
allowNull: false
},
email:{
type: DataTypes.STRING(40),
allowNull: false
}
}, {sequelize, ModelName: 'setor', tableName: 'setores'})
}
}
//incializando o modelo create table
Setor.init(sequelize);
class Funcionario extends Model{
static init(sequelize){
super.init({
matricula:{
type: DataTypes.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey:true
},
idsetor:{
type: DataTypes.INTEGER,
references: {
model: Setor,
key: 'idsetor'
},
},
nome:{
type: DataTypes.STRING(60),
allowNull: false
},
nascimento: {
type: DataTypes.DATE
},
telefone:{
type: DataTypes.STRING(15)
}
}, {sequelize, modelName: 'funcionario', tablename: 'funcionarios'})
}
}
//Inicializando o modelo create table
Funcionario.init(sequelize);


(async () => {
await sequelize.sync({force: true});

const setor_c = await Setor.create({ nome: "Financeiro", ramal: "2134", email:
"financeiro@empresa.com" });
const setor_S = await Setor.create({ nome: "Secretaria", ramal: "2135", email:
"secretaria@empresa.com" });
const setor_P = await Setor.create({ nome: "Portaria", ramal: "2136", email:
"portaria@empresa.com" });

//Inserindo novos setores
const setor_c1 = await Setor.create({ nome: "Contabilidade", ramal: "2165", email:
"Contabilidade@empresa.com" });
const setor_D = await Setor.create({ nome: "Diretoria", ramal: "2100", email:
"diretoria@empresa.com" });
const setor_R = await Setor.create({ nome: "Recursos Humanos", ramal: "2168", email:
"rh@empresa.com" });

// Deletando objeto Contabilidade
const setor_delete = await Setor.findByPk(4);
setor_delete.destroy();

// Atualizando objeto Recursos Humanos
const setor_update = await Setor.findByPk(6);
setor_update.nome = "Departamento Pessoal";
setor_update.save();

//Listar objetos da tabela
const setores_listar = await Setor.findAll();
console.log("Lista de setores: \n", JSON.stringify(setores_listar, null, 2), "\n\n");


})();