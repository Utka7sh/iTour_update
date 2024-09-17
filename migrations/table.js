exports.up = function(knex) {
  return knex.schema
      .createTable('users', function(table) {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.string('email').notNullable().unique();
          table.string('password').notNullable();
          table.string('user_type').notNullable();
          table.boolean('is_owner').defaultTo(false);
      })
      .createTable('owner_details', function(table) {
          table.increments('id').primary();
          table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
          table.string('property_type');
          table.string('house_number');
          table.string('colony_area');
          table.string('landmark');
          table.string('pincode');
          table.string('property_for');
          table.string('room_for');
          table.string('ac_available');
          table.string('television_available');
          table.string('geaser_available');
          table.string('price');
          table.string('image_url');
      })
      .createTable('rentee_details', function(table) {
          table.increments('id').primary();
          table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
          table.integer('age');
          table.string('city');
          table.integer('number_of_travelmates');
          table.string('budget');
          table.string('gender');
          table.string('female_group');
      });
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists('rentee_details')
      .dropTableIfExists('owner_details')
      .dropTableIfExists('users');
};