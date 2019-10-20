import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    /* Usando aqui "super.init". Isto diz que o método
       init da classe pai "Model" será chamado.
       Aqui são declaradas apenas as colunas que serão
       preenchidas com algum dado manualmente (colunas
       como createAt, PKs e etc não precisam ser
       declaradas)
    */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
