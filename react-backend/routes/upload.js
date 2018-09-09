var express = require('express');
var router = express.Router();

var XLSX = require('xlsx');
var FileReader = require('filereader');
var SheetJSSQL = require('../db/SheetJSSQL');

// multer stuff
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var dbUtil = require('../db/util.js');
dbUtil.connect();  // create and connect to pool

// todo: only handling one file upload right now
router.post('/', upload.any(), function(req, res, next) {
  	console.log('in upload router');
  	var files = req.files;
  	//console.log(files);
  	var f = files[0];
  	var buffer = f.buffer;
  	//console.log(buffer);

  	dbUtil.getClient((err, client, done) => {
  		if (err) {
  			res.status(500).send("Error retrieving client");
  		} 
  		
  		//console.log("Got client successfully");
  		// reading file
  		data = new Uint8Array(buffer);
  		console.log("reading excel file...");
  		var workBook = XLSX.read(data, {type: 'array'});

  		// NOTE! only works for a sheet named data
  		var queries = SheetJSSQL.sheetToQueries(workBook.Sheets['Data'], 'Data', "PGSQL");
      for (let i = 0; i < queries.length; i++) {
        //console.log(queries[i]);
        client.query(queries[i])
          .then(res => console.log("query " + i + " was successful"))
          .catch(e => {
            console.error(e.stack);
          });
      }

  		//done(); put this in correct spot
      // make this faster
      // make this a transaction
      res.status(201).send("uploaded into db successfully");

  	// cancel file upload halfway? how to stop

  	// 	use filename as new table name...? find out how to submit the file name

  	// 	check file is excel file

  	// 	check if the formatting is correct
  	});
});

// router.post('/', upload.any(), function(req, res, next) {
//     console.log('in upload router');
//     var files = req.files;

//     var f = files[0];
//     var buffer = f.buffer;

//     // reading file
//     data = new Uint8Array(buffer);
//     console.log("reading excel file...");
//     var workBook = XLSX.read(data, {type: 'array'});
//     var queries = SheetJSSQL.sheetToQueries(workBook.Sheets['Data'], 'Data', "PGSQL"); // NOTE! only works for a sheet named data
//     var partition = queries.length / 10;

//     for (let i = 0; i < 10; i++) { // our pool only has 10 clients right now
//       dbUtil.getClient((err, client, done) => {
//         console.log("aquired client " + i);
//         if (err) {
//           res.status(500).send("Error retrieving client");
//         } 
//         for (let i = 0; i < queries.length; i++) {
//           client.query(queries[i])
//             .then(res => console.log("query " + i + " was successful"))
//             .catch(e => {
//               console.error(e.stack);
//             });
//         }
//       });
//     }

//     dbUtil.getClient((err, client, done) => {
//       if (err) {
//         res.status(500).send("Error retrieving client");
//       } 
      
//       for (let i = 0; i < queries.length; i++) {
//         client.query(queries[i])
//           .then(res => console.log("query " + i + " was successful"))
//           .catch(e => {
//             console.error(e.stack);
//           });
//       }

//       //done(); put this in correct spot
//       //res.status(201).send("uploaded into db successfully");

//     // cancel file upload halfway? how to stop

//     //  use filename as new table name...? find out how to submit the file name

//     //  check file is excel file

//     //  check if the formatting is correct
//     });
// });

module.exports = router;