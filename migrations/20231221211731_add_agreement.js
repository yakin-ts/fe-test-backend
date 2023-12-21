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
        table.integer('user_id').unsigned().notNullable().primary();
        table.specificType('sector_ids', 'integer ARRAY');
        table.boolean('agreed').defaultTo(true);
        table.foreign('user_id').references('Users.id');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('User_Sectors')
      .dropTable('Sectors')
      .dropTable('Users');
  };
  