/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('Users', function(table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
      })
      .createTable('Sectors', function(table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.integer('parent_id').unsigned().references('id').inTable('Sectors').onDelete('CASCADE');
      })
      .createTable('User_Sectors', function(table) {
        table.integer('user_id').unsigned().notNullable();
        table.integer('sector_id').unsigned().notNullable();
        table.foreign('user_id').references('Users.id');
        table.foreign('sector_id').references('Sectors.id');
        table.primary(['user_id', 'sector_id']);
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTable('User_Sectors')
      .dropTable('Sectors')
      .dropTable('Users');
  };
