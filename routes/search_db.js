var express = require('express');
var router = express.Router();

var dbUtil = require('../db/util.js');
dbUtil.connect();

var output;

router.get('/', function(req, res, next) {
	//console.log(req);
	search_q = mk_query(req);
	param_list = mk_list(req);
	dbUtil.query(search_q, param_list, (err, result) => {
  		if (err) {
    		console.log(err.stack);
  		} else {
    		output = result;
    	}
    	out(res);
    });

});

router.get('/all', function(req, res, next) {
	//console.log(req)
	search_q = 'Select * From data';
	param_list = [];
	dbUtil.query(search_q, param_list, (err, result) => {
  		if (err) {
    		console.log(err.stack);
  		} else {
    		output = result;
    	}
    	out(res);
    });

});


function out (res){
	res.header('Access-Control-Allow-Origin', "*");
	res.status(200).send(output);
	//console.log(output);
}



function mk_query(req){
	var q = 'Select * From data where ';
	var count = 1; 
	for (key in req.query){
		
		if (req.query[key] != ""){
			q += 'lower(' + key +') LIKE $' + count + ' and ';
			count+=1;
		}	
	}
	q = q.substring(0, q.length-5);
	console.log(q);
	return q;
}

function mk_list (req){
	var l = [];
	for (key in req.query){
		if (req.query[key] != ""){
			l.push(req.query[key]);
		}
	}
	console.log(l)
	return l;
}

module.exports = router;