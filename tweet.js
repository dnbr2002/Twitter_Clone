"use strict";

var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterCloneDB.sqlite');
var FollowName = 'Kim';
var FollowingName = 'Rusty';


FollowUser(db,FollowName,FollowingName);
function FollowUser(db,FollowName,FollowingName){
    return new Promise(function (resolve, reject) {
        db.run("INSERT INTO Following (Follower, Followee) VALUES ('"+FollowName+"','"+FollowingName+"')", function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }else {
                console.log("Successfully Following "+FollowName+" Now");
                resolve();
            }
    });
    });
}


SelectUserProfile(db, 'Rusty');
function SelectUserProfile(db,SelectedUser){
    return new Promise(function (resolve,reject) {
        db.each("SELECT name, profile, T.Text from User U join Tweet T where U.Name=T.Author and U.Name='"+SelectedUser+"'", function (err, row) {
            if (err) {
                reject(err);
                console.log(err);

            }else {
                console.log(row);
                resolve();
            }
        });
    });
}






var textbox = document.getElementById("userFeed");
textbox.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        console.log(textbox.value);
        doSearch(textbox.value);
    }
});

var Login = document.getElementById(userFeed)


}

function doSearch(title) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            updateMovie(data);
        }
    };
    xhttp.open("GET", "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", true);
    xhttp.send();
}




