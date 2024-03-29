var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var port = process.env.PORT || 3000;

const key = '76E27A0140FE2CEA54ECFB5EE5E325E1';

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', function(req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    })
});

app.post('/id', function(req, res) {
    var url = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + key + "&vanityurl=" + req.body.urlname;
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body.response.steamid);
        }
    });
});

app.post('/data', function(req, res) {
    var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + key + "&steamids=" + req.body.steamid;
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body.response.players);
        }
    });
});

app.listen(port, function(req) {
    console.log('Running and listening on port ' + port);
});
