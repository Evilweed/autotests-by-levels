const {describe, it} = require('mocha');
const {expect} = require('chai');
const {sum} = require('../app/calculator')

describe('Suite', () => {
    it('should', function () {
        expect(sum(1, 5)).to.equal(
            6,
            'Not expected sum'
        );

        // expect(sum(0, 5)).to.equal(
        //     5,
        //     'Not expected sum'
        // );
        //
        // expect(sum(0, 0)).to.equal(
        //     0,
        //     'Not expected sum'
        // );
        //
        //
        // expect(() => sum('1', 0)).to.throw();
    });
})
