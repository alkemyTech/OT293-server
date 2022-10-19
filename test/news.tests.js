const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require('./server');

//Assertion style
chai.should();
chai.use(chaiHttp);

let token = "";

describe("News", () => {
  /**
   * Test news route
   */
   describe("Find one news [GET /news/:id]", () => {
    it("It should get news by id", (done) => {
      chai
        .request(server)
        .get("/news/1")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should not get news without auth", (done) => {
        chai
          .request(server)
          .get("/news/1")
          .send({})
          .end((err, response) => {
            response.should.have.status(401);
            response.body.should.have.property("message");
            response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
            done();
          });
      });

    it("It should not get a news if news is not found", (done) => {
      chai
        .request(server)
        .get("/news/123")
        .auth(token, { type: "bearer" })
        .send({})
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.to.deep.equal({ message:"News not found" });
          done();
        });
    });
});

  describe("News [POST /news]", () => {
    const data = {
      name: "Create new News",
      content: "Container of the news",
      image: "https://myimage.com/photo.jpg",
    };

    it("It should create a news", (done) => {
      chai
        .request(server)
        .post("/news")
        .auth(token, { type: "bearer" })
        .send(data)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("name")
          response.body.should.have.property("content")
          response.body.should.have.property("image")
          done();
        });
    });


    it("It should not create a news without auth", (done) => {
        chai
          .request(server)
          .post("/news")
          .send({})
          .end((err, response) => {
            response.should.have.status(401);
            response.body.should.have.property("message");
            response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
            done();
          });
      });

    it("It should not create a news without data", (done) => {
      chai
        .request(server)
        .post("/news")
        .auth(token, { type: "bearer" })
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
        .post("/news")
        .send(data)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  describe("Edit news [PUT news/:id]", () => {
    const data = {
        name: "New name of the news",
        content: "New content of the news",
        image: "New image"
      };

    it("It should edit news", (done) => {
      chai
        .request(server)
        .put("/news/1")
        .send(data)
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should not edit a news without auth", (done) => {
        chai
          .request(server)
          .put("/news/1")
          .send({})
          .end((err, response) => {
            response.should.have.status(401);
            response.body.should.have.property("message");
            response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
            done();
          });
      });


    it("It should not edit a news if news is not found", (done) => {
      chai
        .request(server)
        .put("/news/123")
        .send({})
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.to.deep.equal({ message: "News not found" });
          done();
        });
    });

  });


  describe("Delete a news [Delete news/:id]", () => {
    it("It should delete a news", (done) => {
      chai
        .request(server)
        .delete("/news/1")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.to.deep.equal("News eliminated successfully");
          done();
        });
    });

    it("It should not delete a news without auth", (done) => {
        chai
          .request(server)
          .delete("/news/1")
          .send({})
          .end((err, response) => {
            response.should.have.status(401);
            response.body.should.have.property("message");
            response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
            done();
          });
      });

    it("It should not delete a news if id doesn´t exist", (done) => {
      chai
        .request(server)
        .delete("/news/123")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(401);
          response.text.should.to.deep.equal("There is no news with that id");
          done();
        });
    });
  })
})
