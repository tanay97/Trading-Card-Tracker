var express = require('express');
var router = express.Router();
var pg = require('pg');
var copyTo = require('pg-copy-streams').to;
var fs = require('fs');


var dbUtil = require('../db/util.js');

// download function
router.get('/', function(req, res, next) {
	console.log("here");
	dbUtil.connect(); // create and connect to pool
	dbUtil.getClient((err, client, done) => {
        if (err) {
            res.status(500).send("Error retrieving client");
        }
        var stream = client.query(copyTo('COPY data TO STDOUT'));
        //stream.pipe(process.stdout); to stdout
        const writeStream = fs.createWriteStream(__dirname + '/data.csv');
        console.log(__dirname + 'data.csv');
        stream.pipe(writeStream); // this is not the actual file
		stream.on('end', () => {
			res.header('Access-Control-Allow-Origin', "*");
			res.status(200).sendFile(__dirname + '/data.csv');
			//res.status(200).send(writeStream);
		});
		stream.on('error', () => {
			res.status(500);
		});
    });
});

module.exports = router;