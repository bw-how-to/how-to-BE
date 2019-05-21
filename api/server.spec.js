const request=require('supertest')
const server=require('./server.js')

describe('server', () => {
    
     it('should return a 200 when connected to the api',() =>{
        return request(server).get('/').expect(200)
    })

     it('should return the message Its working!!!',() =>{
        return request(server).get('/').then(res =>{
            const {body} =res;

            expect(body.message).toBe('Server is working')
    })
 })
     it('should use json ', async () =>{
        const res= await request(server).get('/games')

        expect(res.type).toBe('text/html');
 })

})