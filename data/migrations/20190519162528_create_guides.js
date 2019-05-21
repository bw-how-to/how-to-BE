
exports.up = function(knex, Promise) {
    return knex.schema.createTable('guides', tbl => {
    tbl.increments();

    tbl
   .string('title', 128)
   .notNullable()
   .unique();

   tbl
    .integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

   tbl
   .string('type',128)
   .notNullable()

    tbl
   .string('description',255)
   .notNullable();

   tbl
   .string('step_1')
   .notNullable();

   tbl
   .string('step_2')
   

   tbl
   .string('step_3')
   

   tbl
   .string('step_4')

   tbl
   .string('step_5')

   tbl
   .string('link')

    });
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('guides');
};

