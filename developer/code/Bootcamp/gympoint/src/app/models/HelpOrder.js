import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {

      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Field 'as' in FKs below is required for related models
    // more than one model with belongsTo
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
