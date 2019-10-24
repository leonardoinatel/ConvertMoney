const express = require('express')
const app = express()
const path = require('path')

//db
const sqlite = require('sqlite')
const dbcon = sqlite.open(path.resolve(__dirname, 'moeda.sqlite'), { Promise })

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req,res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home', {
        cotacao
    })
})

app.post('/cotacao', async (req, res) => { //incio da unidade
    const { cotacao, quantidade } = (req.query);
    console.log(cotacao, quantidade)
    
    if(cotacao && quantidade){
        db = await dbcon
        console.log("testando",cotacao)
        await db.run(`INSERT into cotacao_dolar(cotacao) values('${cotacao}')`)

        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else{
        console.log("testando",req.body)
        res.render('cotacao', {
            error: 'valores invalidos, você será redirecinado a pagina inicial em 4 segundos',
        })
    }
}) //fim da unidade
//unidade nao pode ser quebrada, isso define a unidade

app.listen(port , err => {
    if(err){
        console.log("nao foi possivel iniciar o servidor");
    }else{
        console.log("ConvertMoney esta online");
    }
})

//7:32