const convert = require('./convert')

test('convert cotacao 4  and quantidade 4', () => {
    expect(convert.convert(4,4)).toBe(16)
})

test('convert cotacao 4 and quantidade 0', () => {
    expect(convert.convert(4,0)).toBe(0)
})

test('toMoney converts float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney converts strings', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})

//npm install --save-dec jest