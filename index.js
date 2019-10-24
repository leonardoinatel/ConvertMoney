//homemaeAPI
const api = require('./lib/api.bcb')

//API chart
// var plotly = require('plotly')('costaleo122','EXb91ASPhl2DI1BAnrgR');

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

app.get('/cotacao', async (req, res) => { //incio da unidade
    const { cotacao, quantidade } = (req.query);

    if(cotacao && quantidade){
        db = await dbcon
        const data = api.getToday()
        const conversao = convert.convert(cotacao, quantidade)

        await db.run(`INSERT into cotacao_dolar(cotacao,quantidade,conversao,data) 
                        VALUES('${cotacao}','${quantidade}','${conversao}','${data}')`)

        // const historico_moeda = await db.all('select * from cotacao_dolar;')    
        // let i = 0;
        // let cotacao = []
        // const valorUnitario = historico_moeda.forEach( element => {
        //     let cotacao[i] = element.cotacao
        //     console.log(element.conversao)
        // })
        // console.log(valorUnitario)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else{
        res.render('cotacao', {
            error: 'valores invalidos, você será redirecinado a pagina inicial em 4 segundos',
        })
    }
}) 

//fim da unidade
//unidade nao pode ser quebrada, isso define a unidade
// var data = [
//     {
//         x: [0, 1, 2],
//         y: [6, 10, 2],
//         error_y: {
//         type: "data",
//         array: [1, 2, 3],
//         visible: true
//         },
//         type: "scatter"
//     }
// ];

// plotly.plot('myDiv', data, {}, {showSendToCloud: true});

// var graphOptions = {filename: "basic-error-bar", fileopt: "overwrite"};
// plotly.plot(data, graphOptions, function (err, msg) {
//     console.log(msg);
// });


// const init = async() => {
//         const db = await dbcon
//         await db.run('create table if not exists cotacao_dolar(id INTEGER PRIMARY KEY, cotacao INTEGER, quantidade INTEGER, conversao INTEGER, data DATE);')
        
//         //await db.run('drop table cotacao_dolar')
//     }
// init()

app.listen(port , err => {
    if(err){
        console.log("nao foi possivel iniciar o servidor");
    }else{
        console.log("ConvertMoney esta online");
    }
})


