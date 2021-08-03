#!/usr/bin/node
const Database = require('sqlite-async')    

// Create table db
function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            latitude TEXT,
            longitude TEXT,
            name TEXT,
            about TEXT,
            cellphone TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends BOOLEAN
        );
    `)
}

module.exports = Database.open(__dirname + "/database.sqlite").then(execute) // return db