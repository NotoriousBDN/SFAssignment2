
//CHAI FOR INTEGRATION TESTING
//npm run-script test

var assert = require('assert');
var app = require('../server/server.js');
var getUser2 = require('../server/router/getUser2');
http = require('http');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { Http2ServerRequest } = require('http2');
let should = chai.should();
chai.use(chaiHttp);


describe('Tests for function one', () => {
    describe('Test Case 1 #fnOne()',() => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
    describe('Test Case #fnOne()', () => {
        it('should return 3 as the value is present', () => {
            assert.equal([1,2,3,4,5].indexOf(4), 3);
        });
    });
});

describe('Server Test', function () {

    before(function() {
        console.log("before test");
    });
   
    after(function() {
        console.log("after test");
    });

    /*
    describe('/getUser2', () => {
        it('should serve on route /getUser2', function() {
            http.get('http://localhost:4200/getUser2', function(response) {
                assert.equal(response.statusCode, 200);

                var body = '';
                response.on('data', function(d) {body += d;});
                response.on('end', function() {
                    assert.equal(body, 'Hello Mocha');
                });
            });
        });
    });
    */
    
    
    describe('/getUser2', () => {
        it('should serve on route /getUser2', (done) => {
            chai.request(app).post('/getUser2').type('form');
                .send({'username': 'Super', 'password': '123'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log(res.body);
                        done();
                    });
        });
    });
    
});