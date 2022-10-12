
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

const a = require('../server/testingFunctions/getUser2');


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

describe('Tests for getUser function', () => {
    describe('Test Case 1 #fnOne()',() => {
        it('should return false when mongo cannot find matching values', () => {
            assert.equal(a.getUser2('FakeName', 123), 1);
        });
    });
});
