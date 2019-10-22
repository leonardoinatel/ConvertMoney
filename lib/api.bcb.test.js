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
describe('getToday', () => {
    const RealDate = Date
    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-1-2019')
    })
})

test('getUrl', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

//aula 09 semana 03, aparti do minuto 10:50

