var X = require('xlsx');
const pgp = require('pg-promise')({
    capSQL: true, // if you want all generated SQL capitalized
});
const Column = pgp.helpers.Column;

var dbUtil = require('../db/util.js');
dbUtil.connect(); // create and connect to pool

var _TYPES = { // using for drop and create db statement
    "PGSQL": {
        t: "text",
        n: "float8",
        d: "timestamp",
        b: "boolean"
    },
    "MYSQL": {
        t: "TEXT",
        n: "REAL",
        d: "DATETIME",
        b: "TINYINT"
    },
    "SQLITE": {
        t: "TEXT",
        n: "REAL",
        d: "TEXT",
        b: "REAL"
    }
};

var headers = [];
var out = [];

module.exports = {

    // createColumnSet must be called first, gets Headers aka Column names
    getHeaders: function() {
        return headers;
    },

    // createColumnSet must be called first
    getAndExecuteDropAndCreateTableQueries: function() {
        dbUtil.getClient((err, client, done) => {
            if (err) {
                res.status(500).send("Error retrieving client");
            }
            var promises = [];
            for (let i = 0; i < out.length; i++) {
                promises.push(client.query(out[i]));
            }
            Promise.all(promises).then(res => {
                console.log("Successfully completed creation of table");
                done();
            }).catch(error => {
                console.error(error.stack);
            }); 
        });
    },

    // takes excel sheet, and generates ColumnSet object
    // uses sname as table name
    createColumnSet: function(ws, sname, mode) {
        console.log("creating ColumnSet");
        var TYPES = _TYPES[mode || "SQLITE"];
        if (!ws || !ws['!ref']) return; // nullcheck
        var range = X.utils.decode_range(ws['!ref']);
        // c -> col, r-> row, s-> start cell in range, e-> end cell in range
        if (!range || !range.s || !range.e || range.s > range.e) return;

        var R = range.s.r; // index of first row
        var C = range.s.c; // index of first col

        var names = []; // column names
        for (C = range.s.c; C <= range.e.c; ++C) { // getting column names
            var addr = X.utils.encode_cell({
                c: C,
                r: R
            });
            ws[addr] ? names.push(ws[addr].v) : names.push(X.utils.encode_col(C));
        }

        // POSTGRESQL types are defaulted by pg-promise, not currently being set
        var columnSet = [];
        // can't have 0 as column name, must catch validation errors
        for (let i = 0; i < names.length; i++) {
            let cleanString;
            if (typeof names[i] === 'string' || names[i] instanceof String) {
                cleanString = names[i].replace(/[^\w\s]/gi, ' '); // only allowing js var valid chars
                cleanString = cleanString.trim();
                cleanString = cleanString.replace(/ /g, '_'); // removing spaces
                cleanString = cleanString.replace(/[^\w\s]|(_)\1/gi, '_'); // replacing consecutive '__' with '_'
                cleanString = cleanString.toLowerCase();
            }
            headers.push(cleanString);
            columnSet.push(new Column({
                name: cleanString,
                def: null
            }));
        }
        console.log("columnSet: " + columnSet);

        // to create DROP and CREATE table statements
        var types = new Array(range.e.c - range.s.c + 1);
        for (C = range.s.c; C <= range.e.c; ++C) {
            var seen = {},
                _type = "";
            for (R = range.s.r + 1; R <= range.e.r; ++R)
                seen[(ws[X.utils.encode_cell({
                    c: C,
                    r: R
                })] || {
                    t: "z"
                }).t] = true;
            if (seen.s || seen.str) _type = TYPES.t;
            else if (seen.n + seen.b + seen.d + seen.e > 1) _type = TYPES.t;
            else switch (true) {
                case seen.b:
                    _type = TYPES.b;
                    break;
                case seen.n:
                    _type = TYPES.n;
                    break;
                case seen.e:
                    _type = TYPES.t;
                    break;
                case seen.d:
                    _type = TYPES.d;
                    break;
            }
            types[C - range.s.c] = _type || TYPES.t;
        }
        console.log("here");
        var BT = mode == "PGSQL" ? "" : "`";
        var Q = mode == "PGSQL" ? "'" : '"';
        var J = mode == "PGSQL" ? /'/g : /"/g;
        out.push("DROP TABLE IF EXISTS " + BT + sname + BT);
        out.push("CREATE TABLE " + BT + sname + BT + " (" + headers.map(function(n, i) {
            return BT + n + BT + " " + (types[i] || "TEXT");
        }).join(", ") + ", PRIMARY KEY (" + headers[0] + ")" + ");");
        console.log("here2");
        return columnSet;
    }
};