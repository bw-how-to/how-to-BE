
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Chef213',password:'password1',type:'creator'},
        {username: 'JimJones',password:'password1',type:'creator'},
        {username: 'coolgirl1',password:'password1',type:'creator'},
        {username: 'mountainman',password:'password1',type:'viewer'},
        {username: 'sallyjohnson',password:'password1',type:'viewer'},
        {username: 'foodie',password:'password1',type:'viewer'}
      ]);
    });
};
