const express = require('express');
const app = express();
const request = require('request');
const qs = require('querystring');
const axios = require('axios');


let port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/token', (req, res) => {

    const CLIENTID = '66b2c454431e494aaf50f388b1e211ff';
    const CLIENTSECRET = '5cecd5eec53642d28e77dd12168e56a5';
    const clientAndSecret = `${CLIENTID}:${CLIENTSECRET}`;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + new Buffer(clientAndSecret).toString('base64')
        }
    }

    const body = {
        grant_type: 'client_credentials'
    }

    const url = 'https://accounts.spotify.com/api/token';

    axios.post(url, qs.stringify(body), config).then((response) => {

        return res.json({
            ok: true,
            token: response.data
        })


    }).catch(err => {
        return res.status(err.response.status).json({
            message: err.response.statusText
        });
    })
});

app.listen(port, () => {
    console.log("Listening on port " + port);

})
