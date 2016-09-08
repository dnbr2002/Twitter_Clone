var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterDb');

try {
    var date = new Date();
    var current_hour = date.getHours();

    updateDB(db);

    function updateDB(db) {
        db.serialize(function () {
            var stmt = db.prepare("INSERT INTO Tweet (Date, Text, Author, Replies, Likes) VALUES (?,?,?,?,?)");
            for (var i = 0; i < 10; i++) {
                stmt.run(current_hour, 'blah ' + i, 'Steve the ' + i, '', 'y');
            }

            stmt.finalize();

            db.each("SELECT rowid AS id, Text FROM Tweet", function (err, row) {
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

