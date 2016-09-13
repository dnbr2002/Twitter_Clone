"use strict";

var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterCloneDB.sqlite');
var FollowName = 'Kim';
var FollowingName = 'Rusty';
var LikeTweetUser = 'Kim';
var TweetLiked = 'Must love dogs';

FollowUser(db, FollowName, FollowingName);
function FollowUser(db, FollowName, FollowingName) {
    return new Promise(function (resolve, reject) {
        db.run("INSERT INTO Following (Follower, Followee) VALUES ('" + FollowName + "','" + FollowingName + "')", function (err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Successfully Following " + FollowName + " Now");
                resolve();
            }
        });
    });
}

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

LikeTweet(db, LikeTweetUser, TweetLiked);
function LikeTweet(db, LikeTweetUser, TweetLiked) {
    return new Promise(function (resolve, reject) {
        db.run("INSERT INTO Like (User, Tweet) VALUES ('" + LikeTweetUser + "','" + TweetLiked + "')", function (err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Successfully liked tweet " + TweetLiked + " Now");
                resolve();
            }
        });
    });
}