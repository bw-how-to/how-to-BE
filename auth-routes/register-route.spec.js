const request=require('supertest')
const server=require('../api/server.js')
const db=require('../data/dbConfig.js')

describe('Post to /register', () =>{
    
    afterEach(async () => {
        await db('users').truncate();
      });

    it('registers the user, test DB is empty should return one user', async () =>{
    await db('users').insert({username:'testingtester', password:'password1',type:'creator'});

    const users = await db('users')

    expect(users).toHaveLength(1);
    })

    it('should return a status 200 if a user is added', async () =>{
    const user={username:'testingtester', password:'password1',type:'creator'}
    
    const res = await request(server).post('/register').send(user);
    
    expect(res.status).toBe(200);
    })

    it('should return json data', async () =>{
        const user={username:'testingtester', password:'password1',type:'creator'}
        
        const res = await request(server).post('/register').send(user);
        
        expect(res.type).toBe('application/json');

    })
})