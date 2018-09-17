var express = require('express');
var router = express.Router();

var XLSX = require('xlsx');
var FileReader = require('filereader');
var SheetJSSQL = require('../db/SheetJSSQL');

// multer stuff
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

// todo: move code into controllers, out of router file
const pgp = require('pg-promise')({
    capSQL: true, // if you want all generated SQL capitalized
});
const connectionString = 'postgres://asivvmmy:llmOHkPi-sLOd6jW_KVsLf4_VxSFeyDa@elmer.db.elephantsql.com:5432/asivvmmy';
const db = pgp(connectionString);

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

// todo: upload is not excel file, handling duplicate col names, proper error propagation
// todo: not a single transaction together
// todo: only handling one file upload right now (unimportant)
router.post('/', upload.any(), function(req, res, next) {
    console.log('in upload router');
    var files = req.files;
    var f = files[0];
    var buffer = f.buffer;

    // reading file
    data = new Uint8Array(buffer);
    try {
        console.log("reading excel file...");
        var workBook = XLSX.read(data, {
            type: 'array'
        });
        var tname = 'Data';
        var dataSheet = workBook.Sheets[tname]; 

        var columnSetObject = SheetJSSQL.createColumnSet(dataSheet, tname.toLowerCase(), "PGSQL");
        var headers = SheetJSSQL.getHeaders(); // formatted column headers

        data = XLSX.utils.sheet_to_json(workBook.Sheets[tname], {
            header: headers,
            range: 1
        });
        const cs = new pgp.helpers.ColumnSet(columnSetObject);
        const tablename = new pgp.helpers.TableName(tname.toLowerCase());
        SheetJSSQL.getAndExecuteDropAndCreateTableQueries();

        db.tx('massive-insert', t => { // executes callback function as a transaction
            return t.sequence(index => { // t.sequence returns a promise
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
    } catch(err) {
        console.log(err);
        res.status(500).send("did not upload successfully");
    }
});

module.exports = router;