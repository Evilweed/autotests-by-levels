function sum(a, b) {

    if (a === 0) {
        console.log('a: 0')
    }

    if (b === 0) {
        console.log('b: 0')
    }


    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }

    throw new Error('qweqwe');
}


module.exports = {
    sum
}
