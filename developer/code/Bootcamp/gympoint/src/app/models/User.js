import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
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
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Antes de salvar
    this.addHook('beforeSave', async user => {
      // Se foi enviado um password, encripta este password
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /*
   * Função que verifica se o password é válido
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
