const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('./server');
const Jwt = require("../utils/jwt")

chai.should();
chai.use(chaiHttp);

(async () => {
    token = await Jwt.signToken(user)
})();

describe("Users", () => {

    describe("GET /users", () => {
        it("It should GET all the users", (done) => {
            chai.request(server)
                .get("/users")
                .auth(token, { type: "bearer" })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });

        it("It shouldn't GET all the users without auth", (done) => {
            chai.request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.have.property("message").eq("Unauthorization. Please log in");
                    done();
                });
        })
    });

    describe("PATCH /users/:id", () => {
        const user = {
            firstName: "User",
            lastName: "Test",
            image: "https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"
        }
        it("It shouldn't update an user without auth", (done) => {
            chai.request(server)
                .patch("/users/1")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("message");
                    done();
                });
        })

        it("It should user an user", (done) => {
            chai.request(server)
                .patch("/users/1")
                .auth(token, { type: "bearer" })
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('content');
                    response.body.should.have.property('image');
                    done();
                });
        });
    })

    it("It shouldn't update an user that does not exist", (done) => {
        chai.request(server)
            .patch("/users/100")
            .auth(token, { type: "bearer" })
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property("msg").eq("User does not exist");
                done();
            });
    })

    describe("DELETE /user/:id", () => {
        it("It shouldn't delete an User without auth", (done) => {
            chai.request(server)
                .delete("/users/1")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("message").eq("Unauthorization. Please log in");
                    done();
                });
        })

        it("It shouldn't delete an user that does not exist", (done) => {
            chai.request(server)
                .delete("/users/100")
                .auth(token, { type: "bearer" })
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("msg").eq("User does not exist");
                    done();
                });
        })

        it("It should delete an user", (done) => {
            chai.request(server)
                .delete("/users/1")
                .auth(token, { type: "bearer" })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.to.deep.equal("User deleted");
                    done();
                });
        });
    })

})