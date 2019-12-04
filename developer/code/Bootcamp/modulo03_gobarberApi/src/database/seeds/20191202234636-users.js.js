'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Provider Test',
          email: 'provider@test.com',
          password_hash: '$2a$08$1CdbOtDK7ugFInLUJ5PQIef9ZTsBinvU2a7Agkc1QOOfn18bsMxrO',
          provider: true,
          created_at: new Date(),
          updated_at: new Date(),
          avatar_id: null
        },
        {
          name: 'Not provider test',
          email: 'notprovider@test.com',
          password_hash: '$2a$08$1CdbOtDK7ugFInLUJ5PQIef9ZTsBinvU2a7Agkc1QOOfn18bsMxrO',
          provider: false,
          created_at: new Date(),
          updated_at: new Date(),
          avatar_id: null
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('users', {id: {[Op.in]: [1, 2]}}, {})
  },
};
