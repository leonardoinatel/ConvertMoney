const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getCotacaoAPI = url => axios.get(url)
const extracCotacao = res => res.data.value[0].cotacaoVenda

//const extracDataCotacao = res2 => res.data.value[0].dataHoraCotacao

const getToday = () => {
    const today = new Date()
    return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
    //console.log(today.getDate(), today.getFullYear(), today.getMonth())
}
const getCotacao = async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        
        //const data = extracDataCotacao(res2)

        //console.log(res)
        const cotacao = extracCotacao(res)    
        return cotacao
    } catch (err) {
        return ''
    }    
}

// app.post('/admin/categorias/nova', async(req, res) => {
//     db = await dbcon
//     const {categoria} = req.body
//     await db.run(`insert into categorias(categoria) values('${categoria}')`)
    
//     res.redirect('/admin/categorias')
// })


module.exports = {
    getCotacaoAPI,
    extracCotacao,
    getCotacao,
    getToday,
    getUrl
}