var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterDb.db');

try {
    var date = new Date();
    var current_hour = date.getHours();

    updateDB(db);

    function updateDB(db) {
        db.serialize(function () {
            var stmt = db.prepare("INSERT INTO User (Profile, Name, History, Followers, Following) VALUES (?,?,?,?,?)");
                stmt.run('abc', 'Roger ', '', 'Carolyn', 'Bryce');
                stmt.run('def', 'Andy ', '', 'Novak', 'Roger' );

            stmt.finalize();

            db.each("SELECT rowid AS id, Name FROM User", function (err, row) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(row);
            });
        });

    }


db.close();
}

catch (err) {
    console.log(err)

}