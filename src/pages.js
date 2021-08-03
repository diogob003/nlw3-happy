const Database = require("./database/db.js")
const saveOrphanage = require("./database/saveOrphanage")

module.exports = {
    /* Creating objet. Same as:
    index: function(){}
    */
    index(request, response){
        return response.render('index')
    },
    addOrphanage(request, response){
        return response.render('add-orphanage')
    },
    async orphanageDetails(request, response){
        const id = request.query.id
        try {
            const db = await Database;
            const result = await db.all(`SELECT * FROM orphanages WHERE id="${id}";`)
            const orphanage = result[0]
            // transform string into array
            orphanage.images = orphanage.images.split(';')
            // get the img[0] and remove 1 element from array
            orphanage.firstImg = orphanage.images.splice(0, 1)
            orphanage.open_on_weekends = (orphanage.open_on_weekends == "true") ? true : false

            return response.render('orphanage-details', {orphanage: orphanage})
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
    },
    async orphanagesMap(request, response){
        try {
            const db = await Database;
            const orphanage_db = await db.all('SELECT * FROM orphanages')
            return response.render('orphanages-map', {orphanage_db})
        } catch (error) {
            console.log(error)
            return response.sed('Erro no banco de dados!')
        }
    },
    async saveOrphanage(request, response){
        const fields = request.body

        // verify if empity fields
        if(Object.values(fields).includes('')){
            // if empity fields is not img
            if(fields.images !== ''){
                return response.send('Faltando campo obrigatório')
            }else{// if empity is img
                console.log(fields)
                return response.send('Faltando campo opcional imagens')
            }
        }else{
            const db = await Database
            await saveOrphanage(db, fields)
            console.log(fields)
            return response.send('Tudo certo')
        }
        // tempo 1:47:20
    }
}