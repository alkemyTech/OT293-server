const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('./server');
const Jwt = require("../utils/jwt")

chai.should();
chai.use(chaiHttp);

(async () => {
	token = await Jwt.signToken(user)
})();

describe("Activities", () => {

    describe("POST /activities", () => {
        const activity = {
            name: "Activity 1",
            content: "Testing",
            image: "https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Fgrupo-de-estudiantes&psig=AOvVaw3eETl4GxeRe7RIBnuKMIEv&ust=1666193538640000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJjcq-KM6voCFQAAAAAdAAAAABAJ"
        }
        it("It shouldn't create a new activity without auth", (done) => {
            chai.request(server)
                .post("/activities")
                .send(activity)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.have.property("message").eq("Unauthorization. Please log in");
                    done();
                });
        })

        it("It shouldn't create a new activity without data", (done) => {
            chai.request(server)
                .post("/activities")
                .auth(token, { type: "bearer" })
                .send({})
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.have.property("message").eq("Name y Content obligatorios");
                    done();
                });
        })

        it("It shouldn't create a new activity with existing name", (done) => {
            chai.request(server)
                .post("/activities")
                .auth(token, { type: "bearer" })
                .send(activity)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.have.property("message").eq("Ya existe una actividad con ese nombre, pruebe con otro");
                    done();
                });
        })

        it("It should create a new activity", (done) => {
            chai.request(server)
                .post("/activities")
                .auth(token, { type: "bearer" })
                .send(activity)
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

    describe("GET /activities", () => {
        it("It should GET all the activities", (done) => {
            chai.request(server)
                .get("/activities")
                .auth(token, { type: "bearer" })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });

        it("It shouldn't GET all the activities without auth", (done) => {
            chai.request(server)
                .get("/activities")
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.have.property("message").eq("Unauthorization. Please log in");
                done();
                });
        })
    });

    describe("PUT /activities/:id", () => {
        const activity = {
            name: "Activity 1",
            content: "Testing",
            image: "https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Fgrupo-de-estudiantes&psig=AOvVaw3eETl4GxeRe7RIBnuKMIEv&ust=1666193538640000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJjcq-KM6voCFQAAAAAdAAAAABAJ"
        }
        it("It shouldn't update an activity without auth", (done) => {
            chai.request(server)
                .put("/activities/1")
                .send(activity)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("message");
                    done();
                });
        })

        it("It should update an activity", (done) => {
            chai.request(server)
                .put("/activities/1")
                .auth(token, { type: "bearer" })
                .send(activity)
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

    it("It shouldn't update an activity that does not exist", (done) => {
        chai.request(server)
            .put("/activities/100")
            .auth(token, { type: "bearer" })
            .send(activity)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property("msg").eq("Activity does not exist");
                done();
            });
    })

    describe("DELETE /activities/:id", () => {
        it("It shouldn't delete an activity without auth", (done) => {
            chai.request(server)
                .delete("/activities/1")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("message").eq("Unauthorization. Please log in");
                    done();
                });
        })

        it("It shouldn't delete an activity that does not exist", (done) => {
            chai.request(server)
                .delete("/activities/100")
                .auth(token, { type: "bearer" })
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("msg").eq("Activity does not exist");
                    done();
                });
        })

        it("It should delete an activity", (done) => {
            chai.request(server)
                .delete("/activities/1")
                .auth(token, { type: "bearer" })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.to.deep.equal("Activity deleted");
                    done();
                });
        });
    })

})