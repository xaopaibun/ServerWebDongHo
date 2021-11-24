//Our parent block
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../index.js");
let should = chai.should();

chai.use(chaiHttp);

describe("product", () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });

  describe("/GET product", () => {
    it("it should GET all the getproduct", (done) => {
      chai
        .request(server)
        .get("/api/v1/product/getproduct")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        });
    });
  });
});
