const request=require('supertest')
const server=require('../api/server.js')
const db=require('../data/dbConfig.js')

describe('Post to /register', () =>{
    
    afterEach(async () => {
        await db('users').delete();
      });

    it('registers the user, test DB is empty should return one user', async () =>{
    await db('users').insert({username:'testingtester', password:'password1',type:'creator'});

    const users = await db('users')

    expect(users).toHaveLength(1);
    })

      it('should return an array', async () => {
          await db('users').insert({ username:'testmyarray', password:'password1',type:'creator'});
    
          const res = await db('users');
    
          expect(Array.isArray(res)).toBe(true)
        });
})