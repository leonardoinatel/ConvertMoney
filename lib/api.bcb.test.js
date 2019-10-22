const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
    const res = {
        data: {
            value: [
                {cotacaoVenda: 4.08}
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then( resp => {
            expect(resp).toEqual(res)
            expect(axios.get.mock.calls[0][0]).toBe('url')
        })    
})

test('extracCotacao', ()=>{
    const cotacao = api.extracCotacao({
        data: {
            value: [
                {cotacaoVenda: 4.08}
            ]
        }
    })
    expect(cotacao).toBe(4.08)
})