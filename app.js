var express = require('express');
var app = express();

var db = require('./db')

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.get('/userid/:username', function (req, res) {
    var username = req.params.username;
    db.GetUserId(username).then(
        function (tweets) {
            res.send(tweets);
        }
    ).catch(
        function (err) {
            res.status(500);
            res.send('we blew up ID');
        }
    )
});
app.get('/userfeed/:userid', function(req, res) {
    var id = req.params.userid;
    db.allFollowingTweets(id).then(
        function (tweets) {
            res.send(tweets);
        }
    ).catch(
        function (err) {
            res.status(500);
            res.send('we blew up');
        }
    );
});

app.listen(3000, function () {
   console.log('Server is running on 3000');
});