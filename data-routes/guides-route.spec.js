const request=require('supertest')
const server=require('../api/server.js')
const db=require('../data/dbConfig.js')

let token;

    beforeAll((done) => {
      request(server)
        .post('/register').send({ username: 'faker', password: 'password1',type:'creator'})
        .end((err, res) => {
          token = res.body.token; 
          done();
        });
    });

    describe('/guides endpoint', async () =>{
        afterEach(async () => {
            await db('users').delete();
        })
        afterEach(async () => {
            await db('guides').delete();
        })
    
        it('should return a status code of 200 if able to get guides',() => {
    
                return request(server).get('/guides').set('Authorization', `${token}`).expect(200)
        
        })
    
        it('should return a status code of 401 if the token isnt on the request',() => {
    
            return request(server).get('/guides').expect(401)
    
    })
    
    
        it('should return json type data', async () => {
    
            const res= await request(server).get('/guides')
    
            expect(res.type).toBe('application/json');
        })
    
    
        it('returns a 404 status when user does not exist', async () => {
    
            return request(server).get('/guides/422').set('Authorization', `${token}`).expect(404)
        })
    
        it('should return json type data', async () => {
    
            const res= await request(server).get('/gudies/1').set('Authorization', `${token}`)
    
            expect(res.type).toBe('text/html');
        })

        describe('/post endpoint ',() => {

        
        it('should return a 200 status if a new guide is posted',async ()=>{

            const guide={ title: 'Making pasta with Red Sauce',user_id:"1",type:"cooking", description:"Delicious pasta in a fresh red Sauce",step_1:"Saute half an onion in 1 tsp of olive oil for 5-7 minutes, add 2 cloves of  minced garlic, saute for one minute"}

            return request(server).post('/guides').send(guide).set('Authorization', `${token}`).expect(200)
        })

        it('should return a 422 status if a new guide is missing a required field ',async ()=>{

            const guide={ title: 'Making pasta with Red Sauce',user_id:"1",type:"cooking"}

            return request(server).post('/guides').send(guide).set('Authorization', `${token}`).expect(400)
        })

        it('should return a 401 status if there is no token on the post request ',async ()=>{

            const guide={ title: 'Making pasta with Red Sauce',user_id:"1",type:"cooking", description:"Delicious pasta in a fresh red Sauce",step_1:"Saute half an onion in 1 tsp of olive oil for 5-7 minutes, add 2 cloves of  minced garlic, saute for one minute"}

            return request(server).post('/guides').send(guide).expect(401)
        })
    })
    })
