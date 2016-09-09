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
        db.run(("INSERT INTO Following (Follower, Followee) VALUES (?,?) "),FollowName,FollowingName, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }else {
                console.log("Successfully Following ? Now", Following);
                resolve();
            }
    });
    });
}