// Importando as bibliotecas que iremos utilizar
const { Sequelize,Model, DataTypes } = require("sequelize");
//abrindo uma conexão
const sequelize = new Sequelize({
  dialect: "sqlite",
 storage: "empresa.sqlite"
});
// Definindo a classe setor
class Setor extends Model {
 static init(sequelize) {
 super.init({ 
 idsetor:{ 
 type: DataTypes.INTEGER, 
 autoIncrement: true,
 allowNull: false,
 primaryKey: true
 },
 
 nome: {
 type: DataTypes.STRING(60),
 allowNull: false
 },
 
 ramal:{
 type: DataTypes.STRING(6)
 },
 email:{
 type: DataTypes.STRING(40)
 }
 }, { sequelize, modelName: 'setor', tableName: 'setores' })
 }
}
// inicializando o modelo create table
Setor.init(sequelize);
class Funcionario extends Model {
   static init(sequelize) {
 super.init({ 
 matricula:{ 
 type: DataTypes.INTEGER, 
 autoIncrement: true,
 allowNull: false,
 primaryKey: true
 },
 
 Idsetor: {
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
 nascimento:{
 type: DataTypes.DATE
 },
 telefone:{
 type: DataTypes.STRING(15)
 }
 }, { sequelize, modelName: 'funcionario', tableName: 'funcionarios' })
 }
}
// inicializando o modelo create table
Funcionario.init(sequelize);
(async () => {
 // Sincronizando automaticamente
 await sequelize.sync({ force: true });
 
 const setor_c = await Setor.create({ nome: "Financeiro", ramal: "2134", email: 
"financeiro@empresa.com" });
 const setor_S = await Setor.create({ nome: "Secretaria", ramal: "2135", email: 
"secretaria@empresa.com" });
 const setor_P = await Setor.create({ nome: "Portaria", ramal: "2136", email: 
"portaria@empresa.com" });
   const setor_co = await Setor.create({ nome: "Contabilidade", ramal: "2137", email: 
"contabilidade@empresa.com" });
 const setor_d = await Setor.create({ nome: "Diretoria", ramal: "2138", email: 
"diretoria@empresa.com" });
 const setor_rh = await Setor.create({ nome: "Recursos Humanos", ramal: "2139", email: 
"rh@empresa.com" });
   
// Listando objetos da tabela Setor
 
 const setores_listar = await Setor.findAll();
 console.log("Lista de setores: \n", JSON.stringify(setores_listar, null, 2), "\n\n");
 
// Alterando objetos – UPDATE
const setor_chave = await Setor.findByPk(6);
setor_chave.nome = "Departamento Pessoal";
const resultado = await setor_chave.save();
console.log(resultado);

const setores_update = await Setor.findAll(); 
console.log("\nLista de setores atualizada: \n", JSON.stringify(setores_update, null, 2), 
"\n\n");

// Deletar objetos – DELETE
  const setor_delete = await Setor.findByPk(2);
setor_delete.destroy();

// Listando objetos após a exclusão do setor 2 - Secretaria
 const setores_exclusao = await Setor.findAll();
 console.log("Lista de setores após a exclusão: \n", 
JSON.stringify(setores_exclusao, null, 2), "\n\n");

})();