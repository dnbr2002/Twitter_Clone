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
function UnFollowUser(db, FollowName, FollowingName) {
    return new Promise(function (resolve, reject) {
        db.run("DELETE FROM Following WHERE Follower='" + FollowName + "' AND Followee='" + FollowingName + "'", function (err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Successfully UnFollowing " + FollowingName + " Now");
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










