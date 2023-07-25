exports.up = async(knex) => knex.schema.createTable('User', (table) => {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('password').notNullable();
  });

exports.down = async(knex) => knex.schema.dropTable('User');

