const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./server');

//Assertion style
chai.should();
chai.use(chaiHttp);

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY2NjEzMDYwNywiZXhwIjoxNjY2MTM3ODA3fQ.5AbxXuXIxpxdFM3u3J_QVtXijlhI4esrK27FMslJaPM';

describe('Members', () => {
  /**
   * Test Members route
   */

  // GET MEMBERS BY 10
  describe('Get All members [GET /members]', () => {
    it('It should return 10 members by page', (done) => {
      chai
        .request(server)
        .get('/members')
        .auth(token, { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });

    it('It should return forbidden', (done) => {
      chai
        .request(server)
        .get('/members')
        .auth('', { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  // CREATE MEMBER
  describe('Create new member [POST /members]', () => {
    const data = {
      name: "emailcom",
      image: "https://myimage.com/photo.jpg",
    };

    it('It should return message: Miembro creado correctamente', (done) => {
      chai
        .request(server)
        .post('/members')
        .send(data)
        .auth(token, { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message")
          done();
        });
    });

    it('It should return message: Campos obligatorios', (done) => {
      chai
        .request(server)
        .post('/members')
        .auth(token, { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("message")
          done();
        });
    });
  });

  // DELETE MEMBER
  describe('Delete member [DELETE /members/:id]', () => {
    
    it('It should return message: Bad request', (done) => {
      chai
        .request(server)
        .delete('/members/id')
        .auth(token, { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("errors")
          done();
        });
    });
    
    it('It should return message: deleted true', (done) => {
      chai
        .request(server)
        .delete('/members/2')
        .auth(token, { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("deleted")
          done();
        });
    });

    it('It should return forbidden', (done) => {
      chai
        .request(server)
        .delete('/members/2')
        .auth('', { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  // Update MEMBER
  describe('UPDATE MEMBER [PUT /members/:id]', () => {
    const data = {
      name: "emailcom",
      image: "https://myimage.com/photo.jpg",
    };
    
    it('It should return message: Miembro Actualizado con exito', (done) => {
      chai
        .request(server)
        .put('/members/1')
        .send(data)
        .auth(token, { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("msg")
          done();
        });
    });

    it('It should return forbidden', (done) => {
      chai
        .request(server)
        .put('/members/3')
        .auth('', { type: 'bearer' })
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a('object');
          done();
        });
    });
  });
});
