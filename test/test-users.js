process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Route/Users', () => {
    beforeEach((done) => {
        //Before each test we empty the database
        // Book.remove({}, (err) => {
        //     done();
        // });
    });

    describe('/HEAD userId or phone exists', () => {
        it('it should exists userId', (done) => {
            chai.request(server)
                .head('/users/userId/' + 'tom')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should not exists userId', (done) => {
            chai.request(server)
                .head('/users/userId/' + 'peter')
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });

        it('it should exists phone', (done) => {
            chai.request(server)
                .head('/users/phone/' + '15812344321')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should not exists phone', (done) => {
            chai.request(server)
                .head('/users/phone/' + '15812340000')
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

});
