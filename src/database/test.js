#!/usr/bin/node
const Database = require('./db.js')
const saveOrphanage = require('./saveOrphanage')

Database.then(async (db) =>{
    // inserir dados
    const registeringOrphanage = {
        latitude: "-27.21866",
        longitude: "-49.61291",
        name: "Lar dos pivete",
        about: "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
        cellphone: "+554735250459",
        images: [
            "http://pioneiro.rbsdirect.com.br/imagesrc/7416035.jpg?w=600",
            "https://i.ytimg.com/vi/Kpgv4BXKEjU/maxresdefault.jpg",
            "https://natocadesign.com.br/wp/wp-content/uploads/2015/03/141015_JULIA-E-CIA-046-1000x666.jpg",
            "https://hericasimone.files.wordpress.com/2013/11/casacor-2013-loft-da-blogueira.jpg"
        ].join(';'),
        instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hours: "10:00-17:33",
        open_on_weekends: "true"
    }
    await saveOrphanage(db, registeringOrphanage)

    // consultar todos os orfanatos cadastrados
    // const allOrphanages = await db.all('SELECT * FROM orphanages ;')
    // console.log(allOrphanages)
    
    // consultar somente 1 orfanato pelo id
    // const orphanageConsulted = await db.all('SELECT * FROM orphanages WHERE id="4" ;')
    // console.log(orphanageConsulted)

    // apagar dado da table
    // console.log(await db.run('DELETE FROM orphanages WHERE id="5";'))
    
    // atualizar valor
    // UPDATE orphanages SET images="a.jpg" WHERE id="2"
})