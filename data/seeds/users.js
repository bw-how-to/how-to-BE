const bcrypt = require('bcryptjs');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Chef213',password: bcrypt.hashSync('password1',10),type:'creator'},
        {username: 'JimJones',password: bcrypt.hashSync('password1',10),type:'creator'},
        {username: 'coolgirl1',password: bcrypt.hashSync('password1',10),type:'creator'},
        {username: 'mountainman',password: bcrypt.hashSync('password1',10),type:'viewer'},
        {username: 'sallyjohnson',password: bcrypt.hashSync('password1',10),type:'viewer'},
        {username: 'foodie',password: bcrypt.hashSync('password1',10),type:'viewer'}
      ]);
    });
};
