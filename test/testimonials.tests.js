const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require('./server');
const Jwt = require("../utils/jwt")

chai.should();
chai.use(chaiHttp);

const user = {id: 1}

let token;

(async () => {
	token = await Jwt.signToken(user)
})();

describe("Testimonials", () => {

  describe("Create testimonial [POST /testimonials]", () => {
      const data = {
      name: "John Doe" + Math.random(),
      image: "https://myimage.com/photo.jpg",
      content: "Contenido del testimonial" + Math.random()
    };

    it("It should create a testimonial", (done) => {
      chai
        .request(server)
        .post("/testimonials")
        .auth(token, { type: "bearer" })
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("name")
          response.body.should.have.property("content")
          response.body.name.should.to.deep.equal(data.name)
          response.body.content.should.to.deep.equal(data.content)
          done();
        });
    });

    it("It should not create a testimonial without auth", (done) => {
      chai
        .request(server)
        .post("/testimonials")
        .send({})
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property("message");
          response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
          done();
        });
    });

    it("It should not create a testimonial without data", (done) => {
      chai
        .request(server)
        .post("/testimonials")
        .auth(token, { type: "bearer" })
        .send({})
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("message");
          response.body.should.to.deep.equal({message:"Name and content are required"})
          done();
        });
    });

    it("It should not create a repeated testimonial ", (done) => {
      chai
        .request(server)
        .post("/testimonials")
        .auth(token, { type: "bearer" })
        .send(data)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("message");
          response.body.should.to.deep.equal({message: "Testimonial already exists"})
          done();
        });
    });
  });

  describe("Find all testimonials [Get /testimonials/]", () => {
    it("It should get all testimonials with max 10 items", (done) => {
      chai
        .request(server)
        .get("/testimonials")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("nextPage");
          response.body.should.have.property("previousPage");
          response.body.should.have.property("items");
          response.body.items.should.have.lengthOf.below(11)
          done();
        });
    });

    it("It should not get all testimonials without auth", (done) => {
      chai
        .request(server)
        .get("/testimonials")
        .send({})
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property("message");
          response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
          done();
        });
    });
});

  describe("Edit testimonial [PUT testimonials/:id]", () => {
    const data = {
        name: "John Doe",
        content: "Contenido del testimonio"
      };

    it("It should edit testimonial", (done) => {
      chai
        .request(server)
        .put("/testimonials/1")
        .send(data)
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.name.should.to.deep.equal(data.name);
          response.body.content.should.to.deep.equal(data.content)
          done();
        });
    });

    it("It should not edit a testimonial without auth", (done) => {
      chai
        .request(server)
        .put("/testimonials/1")
        .send({})
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property("message");
          response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
          done();
        });
    });


    it("It should not edit a testimonial if testimonial is not found", (done) => {
      chai
        .request(server)
        .put("/testimonials/123412341234123")
        .send({})
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.to.deep.equal({ message: "Testimonial not found" });
          done();
        });
    });

  });


  describe("Delete a testimonial [Delete testimonials/:id]", () => {
    it("It should delete a testimonial", (done) => {
      chai
        .request(server)
        .delete("/testimonials/1")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.to.deep.equal("Testimonial eliminado correctamente");
          done();
        });
    });

    it("It should not delete a testimonial without auth", (done) => {
      chai
        .request(server)
        .delete("/testimonials/1")
        .send({})
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.have.property("message");
          response.body.should.to.deep.equal({message:"Unauthorization. Please log in"})
          done();
        });
    });

    it("It should not delete a testimonial if id doesn´t exist", (done) => {
      chai
        .request(server)
        .delete("/testimonials/2323123123123213213")
        .auth(token, { type: "bearer" })
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.to.deep.equal("No existe un testimonial con ese ID");
          done();
        });
    });
  })
})