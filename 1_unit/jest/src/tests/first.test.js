const {describe, test, expect} = require('@jest/globals');
const {sum} = require('../app/calculator')

describe('Suite', () => {
    test('should', function () {
        expect(sum(1, 5)).toBe(6);

        expect(sum(0, 5)).toBe(5);

        expect(sum(0, 0)).toBe(0);

        expect(() => sum('1', 0)).toThrow();
    });
})
