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


// new shit testing ----------------------------
const pgp = require('pg-promise')({
    capSQL: true, // if you want all generated SQL capitalized
});
const connectionString = 'postgres://vuitsnnr:qfNR6FucYV92dloKvm7QOrj7ifx5pk6c@stampy.db.elephantsql.com:5432/vuitsnnr';
const db = pgp(connectionString);
// --------------------------------------

var data;

// returns promise that reps next data that will be available
// array of objects up till pageIndex, unless data doesn't have that many
function getNextData(smth, index) {
  return new Promise((resolve) => {
    let lastIndex = (index + 1) * 10000;
    let beforeIndex = index * 10000;
    if (beforeIndex < data.length) {
        resolve(data.slice(beforeIndex, lastIndex)); // doesn't include lastIndex
    } else {
        resolve(null);
    }
  });
}



// todo: only handling one file upload right now
router.post('/', upload.any(), function(req, res, next) {
  	console.log('in upload router');
  	var files = req.files;
  	var f = files[0];
  	var buffer = f.buffer;

  	dbUtil.getClient((err, client, done) => {
  		if (err) {
  			res.status(500).send("Error retrieving client");
  		} 

  	// reading file
		data = new Uint8Array(buffer);
		console.log("reading excel file...");
		var workBook = XLSX.read(data, {type: 'array'});
    var dataSheet = workBook.Sheets['Data'];

    var columnSetObject = SheetJSSQL.createColumnSet(dataSheet, 'Data', "PGSQL");
    var headers = SheetJSSQL.getHeaders();  // formatted column headers

    data = XLSX.utils.sheet_to_json(workBook.Sheets['Data'],
                                            { header: headers,
                                              range: 1
                                            });
    const cs = new pgp.helpers.ColumnSet(columnSetObject);
    const tablename = new pgp.helpers.TableName('othertable');

    db.tx('massive-insert', t => { // executes callback function as a transaction
        return t.sequence(index => {  // t.sequence returns a promise
            return getNextData(t, index)
                .then(d => {
                    if (d) {
                        const insert = pgp.helpers.insert(d, cs, tablename);
                        return t.none(insert);
                    }
                });
        });
    }).then(d => {
        // COMMIT has been executed
        console.log('Total batches:', d.total, ', Duration:', d.duration);
        res.status(201).send("uploaded into db successfully");
    }).catch(error => {
        // ROLLBACK has been executed
        console.log(error);
        res.status(500).send("did not upload successfully");
    });

    // drop table if have to command  , note... does this data have a primary key?
    // create table ...

  	// cancel file upload halfway? how to stop

  	// 	use filename as new table name...? find out how to submit the file name

  	// 	check file is excel file

  	// 	check if the formatting is correct

    // catch duplicate column names, wrap in try block or something
  	});
});

module.exports = router;