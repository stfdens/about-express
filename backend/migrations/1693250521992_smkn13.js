/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('account', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'varchar',
      notNull: true,
    },
    email: {
      type: 'varchar',
      notNull: true,
    },
    password: {
      type: 'varchar',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('account');
};
