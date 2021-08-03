const db = require("./db")

// Save a new ophanage on database
function saveOrphanage(db, orphanage) {
    return db.run(`
        INSERT INTO orphanages (
            latitude,
            longitude,
            name,
            about,
            cellphone,
            images,
            instructions,
            opening_hours,
            open_on_weekends
        ) VALUES (
            "${orphanage.latitude}",
            "${orphanage.longitude}",
            "${orphanage.name}",
            "${orphanage.about}",
            "${orphanage.cellphone}",
            "${(orphanage.images).join(';')}",
            "${orphanage.instructions}",
            "${orphanage.opening_hours}",
            "${orphanage.open_on_weekends}"
        );
    `)
}

module.exports = saveOrphanage