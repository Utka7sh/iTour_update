exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('owners', table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('number').notNullable().unique();
            table.string('password').notNullable();
            table.string('property_type').nullable();
            table.string('house_number').nullable();
            table.string('colony_area').nullable();
            table.string('landmark').nullable();
            table.string('pincode').nullable();
            table.string('property_for').nullable();
            table.string('room_for').nullable();
            table.string('ac_available').nullable();
            table.string('television_available').nullable();
            table.string('geaser_available').nullable();
            table.string('price').nullable();
            table.string('image_url').nullable();
        }),
        knex.schema.createTable('rentees', table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('number').notNullable().unique();
            table.string('password').notNullable();
            table.string('age').nullable();
            table.string('city').nullable();
            table.string('number_of_travelmates').nullable();
            table.string('budget').nullable();
            table.string('gender').nullable();
            table.string('female_group').nullable();
        })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('owners'),
        knex.schema.dropTableIfExists('rentees')
    ]);
};
