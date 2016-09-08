var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterDb');

/*app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/foo', function (req, res) {
    res.send('yo');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/

try
{
var date = new Date();
var current_hour = date.getHours();

initDB(db);

function initDB(db) {
    db.serialize(function() {
        db.run("CREATE TABLE Tweet (Date TEXT, Text Text, Author Text, Replies Text, Likes Text)");

        var stmt = db.prepare("INSERT INTO TwitterDb VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run(current_hour,'blah ' + i, 'Steve the ' + i,'',i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM TwitterDb", function (err, row) {
            if (err) {
                console.log(err);
            }
            console.log(row.id + ": " + row.info);
        });
    });
}

db.close();

}

catch (err)
{
    console.log(err);
}