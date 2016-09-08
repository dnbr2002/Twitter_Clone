var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterDb.db');
var name = ['Steve', 'John', 'Kim', 'Sara','Rusty','Scott','Molly','Bryce','Carolyn','Steve'];
var likestuff = ['cats', 'dogs', 'Kanye', 'cats that like Kanye','Oprah','Horses','Cars','programmming','bikes','skyscrapers'];
var replies = ['cool', 'not cool', 'me too', 'likewise','always!!','forever','never','ugh','ride or die','yeap!!']
var randNum = Math.floor((Math.random() * 10) + 1);


try {
    var date = new Date();
    var current_hour = date.getHours();

    updateDB(db);

    function updateDB(db) {
        db.serialize(function () {
            var stmt = db.prepare("INSERT INTO Tweet (Date, Text, Author, Replies, Likes) VALUES (?,?,?,?,?)");
            for (var i = 0; i < 10; i++) {
                stmt.run(current_hour, 'I like ' + likestuff[i], name[i], replies[i], randNum);
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

