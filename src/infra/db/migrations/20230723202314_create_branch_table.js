exports.up = async (knex) => knex.schema.createTable('Branch', (table) => {
  table.uuid('id').primary().notNullable();
  table.string('name').notNullable();
  table.uuid('userId').references('id').inTable('User').notNullable();
  table.float('xp').notNullable();
});


exports.down = async (knex) => knex.schema.dropTable('Branch');

