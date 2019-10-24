// const sqlite = require('sqlite')
// const path = require('path')
// const dbcon = sqlite.open(path.resolve(__dirname, 'moeda.sqlite'), { Promise })


// app.post('/admin/categorias/nova', async(req, res) => {
//     db = await dbcon
//     const {categoria} = req.body
//     await db.run(`insert into categorias(categoria) values('${categoria}')`)
    
//     res.redirect('/admin/categorias')
// })*/

// const init = async() => {
//     const db = await dbcon
//     await db.run('create table if not exists cotacao_dolar (id INTEGER PRIMARY KEY, cotacao TEXT, data DATE);')
//     //await db.run('create table if not exists vagas(id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')
//     //const vaga = 'Social Media (San Francisco)'
//     //const descricao = 'vaga para full stack developer para labs'
//     //await db.run(`insert into categorias(categoria) values('${categoria}')`)
//     //await db.run(`insert into vagas(categoria, titulo, descricao) values(2,'${vaga}','${descricao}')`)
//     //await db.run('delete from vagas where id = 3')
// }

// //init()