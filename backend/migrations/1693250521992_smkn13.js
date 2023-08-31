/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
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
  }),
  pgm.createTable('murid', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    nama: {
      type: 'varchar',
      notNull: true,
    },
    jurusan: {
      type: 'varchar',
      notNull: true,
    },
    kelas: {
      type: 'integer',
      notNull: true,
    },
    nis: {
      type: 'integer',
      notNull: true,
    },
    nisn: {
      type: 'integer',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('account');
};
