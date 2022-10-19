const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require('./server');

//Assertion style
chai.should();
chai.use(chaiHttp);

let token = "";

describe("Authentication", () => {
  /**
   * Test register route
   */

  describe("Register [POST auth/register]", () => {
    const data = {
      email: "email@email.com",
      password: "1a2s23d4gf5",
      image: "https://myimage.com/photo.jpg",
      firstName: "Jeicob",
      lastName: "Miller",
    };

    it("It should register an user", (done) => {
      chai
        .request(server)
        .post("/auth/register")
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("token");
          done();
        });
    });

    it("It should not register an user without data", (done) => {
      chai
        .request(server)
        .post("/auth/register")
        .send({})
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property("errors");
          done();
        });
    });

    it("It should send internal server error. Repeating data", (done) => {
      chai
        .request(server)
        .post("/auth/register")
        .send(data)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test login route
   */

  describe("Login [POST auth/login]", () => {
    const goodData = {
      email: "email@email.com",
      password: "1a2s23d4gf5",
    };

    const wrongData = {
      email: "email@ema.com",
      password: "1a2s23d4gf5",
    };

    it("It should be logged", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send(goodData)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("token");
          token = response.body["token"];
          done();
        });
    });

    it("It should not be logged (without credentials)", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({})
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property("errors");
          done();
        });
    });

    it("It should not be logged (wrong credentials)", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send(wrongData)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test profile route
   */

  describe("Profile [Get auth/me]", () => {
    it("It should get the user's data", (done) => {
      chai
        .request(server)
        .get("/auth/me")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("userData");
          done();
        });
    });

    it("It should not get the user's data (without token or wrong token)", (done) => {
      chai
        .request(server)
        .get("/auth/me")
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property("message");
          done();
        });
    });
  });
});
