const request=require('supertest')
const server=require('../api/server.js')
const db=require('../data/dbConfig.js')


describe('Post to /login', () =>{
    
    afterEach(async () => {
        await db('users').delete();
      });

        it('should insert provided user', async () => {
          await db('users').insert({ username:'testingtest', password:'password1',type:'creator' });
    
          const res = await db('users');
    
          expect(res).toHaveLength(1);
        });
    

        it('should return an array', async () => {
            await db('users').insert({ username:'testmyarray', password:'password1',type:'creator'});
      
            const res = await db('users');
      
            expect(Array.isArray(res)).toBe(true)
          });

})