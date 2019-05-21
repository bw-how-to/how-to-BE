const request=require('supertest')
const server=require('../api/server.js')
const db=require('../data/dbConfig.js')


describe('Post to /login', () =>{
    
    afterEach(async () => {
        await db('users').truncate();
      });

    it('logs in the user', async () =>{
    await db('users').insert({username:'testingtester', password:'password1',type:'creator'});

    const users = await db('users')

    expect(users).toHaveLength(1);
    })

    it('should return a status 200 if a login works', async () =>{
        const user={username:'testingtester', password:'password1',type:'creator'}

        const register=await request(server).post('/register').send(user);
        
        const res = await request(server).post('/login').send(user);
        
        expect(res.status).toBe(200);
    })
        

    
        it('should return json data', async () =>{
            const user={username:'testerbester', password:'password1',type:'creator'}

            const register=await request(server).post('/register').send(user);
            
            const res = await request(server).post('/login').send(user);
            
            expect(res.type).toBe('application/json');
    
        })

})