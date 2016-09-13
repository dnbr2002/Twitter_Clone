"use strict";

var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterCloneDB.sqlite');
var FollowName = 'Kim';
var FollowingName = 'Rusty';

UnFollowUser(db, FollowName, FollowingName);
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