var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterDb.db');
var TweetTable = 'Tweet'
var UserTable = 'User'

CreateTweetTable(db);
function CreateTweetTable(db) {
    try {
        db.serialize(function () {

            db.run("CREATE TABLE IF NOT EXISTS " + TweetTable + " (PK_Tweet Integer NOT NULL PRIMARY KEY,Date TEXT, Text Text, Author Text, Replies Text, Likes Text)");
                
                console.log("Tweet table created");
    });


    }

    catch (err) {
        console.log(err);
    }
   CreateUserTable(db);
    function CreateUserTable(db) {
    try {
        db.serialize(function () {

            db.run("CREATE TABLE IF NOT EXISTS " + UserTable + " (Pk_User Integer NOT NULL PRIMARY KEY, Profile Text, Name Text, History Text, Followers Text, Following Text)");

                
                console.log("User table created");
    });

        db.close();
    }
    
    catch (err) {
        console.log(err);
    }
    }
}
