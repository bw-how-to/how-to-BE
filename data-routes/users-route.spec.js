const request=require('supertest')
const server=require('../api/server.js')
const db=require('../data/dbConfig.js')

let token;

    beforeAll((done) => {
      request(server)
        .post('/register').send({ username: 'fake', password: 'password1',type:'creator'})
        .end((err, res) => {
          token = res.body.token; 
          done();
        });
    });

describe('/users endpoint', async () =>{
    afterEach(async () => {
        await db('users').delete();
    })

    it('should return a status code of 200 if able to get users',() => {

            return request(server).get('/users').set('Authorization', `${token}`).expect(200)
    
    })

    it('should return a status code of 401 if the token isnt on the request',() => {

        return request(server).get('/users').expect(401)

})


    it('should return json type data', async () => {

        const res= await request(server).get('/users')

        expect(res.type).toBe('application/json');
    })

})

describe('/users by id endpoint',() =>{

    it('returns a 404 status when user does not exist', async () => {

        return request(server).get('/users/422').set('Authorization', `${token}`).expect(404)
    })

    it('should return json type data', async () => {

        const res= await request(server).get('/users/1').set('Authorization', `${token}`)

        expect(res.type).toBe('application/json');
    })
})