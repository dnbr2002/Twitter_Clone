var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterDb.db');
var Name = ['Steve', 'John', 'Kim', 'Sara','Rusty','Scott','Molly','Bryce','Carolyn','Steve'];
var Profile = ['I live in MD', 'I live in DC', 'I love Purple','I live in Florida','I like to surf','I like to play Tennis','','','Must love dogs','']
var Tweet = ['cats', 'dogs', 'Kanye', 'cats that like Kanye','Oprah','Horses','Cars','programmming','bikes','skyscrapers'];
var replies = ['cool', 'not cool', 'me too', 'likewise','always!!','forever','never','ugh','ride or die','yeap!!']


try {
    updateUser(db)
    updateTweet(db);

    function updateTweet(db) {
        db.serialize(function () {
            var stmt = db.prepare("INSERT INTO Tweet (Date, Text, Author, Reply) VALUES (?,?,?,?)");
            for (var i = 0; i < 10; i++) {
                stmt.run(Math.floor((Math.random() * 10) + 1)+'/'+Math.floor((Math.random() * 10) + 1)+'/2016', 'I like ' + Tweet[i], Name[i], replies[i]);
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

    function updateUser(db) {
        db.serialize(function () {
            var stmt = db.prepare("INSERT INTO User (Name, Profile) VALUES (?,?)");
            for (var i = 0; i < 10; i++) {
                stmt.run(Name[i], Profile[i]);
            }

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

