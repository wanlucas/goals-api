exports.up = async (knex) => knex.schema.createTable('Goal', (table) => {
  table.uuid('id').primary().notNullable();
  table.string('description').notNullable();
  table.float('target').notNullable();
  table.float('score').notNullable();
  table.float('difficulty').notNullable();
  table.uuid('branchId').references('id').inTable('Branch').notNullable();
});

exports.down = async (knex) => knex.schema.dropTable('Goal');

