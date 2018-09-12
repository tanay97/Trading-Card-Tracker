var X = require('xlsx');
const pgp = require('pg-promise')({
    capSQL: true, // if you want all generated SQL capitalized
});
const Column = pgp.helpers.Column;

var headers = [];

module.exports = {

	getHeaders: function() {
		return headers;
	},

	// takes excel sheet, and generates ColumnSet object
	createColumnSet: function(ws, sname, mode) {
		console.log("creating ColumnSet");
		if(!ws || !ws['!ref']) return;  // nullcheck
		var range = X.utils.decode_range(ws['!ref']);
		// c -> col, r-> row, s-> start cell in range, e-> end cell in range
		if(!range || !range.s || !range.e || range.s > range.e) return;

  		var R = range.s.r; // index of first row
  		var C = range.s.c; // index of first col

  		var names = []; // column names
  		for(C = range.s.c; C<= range.e.c; ++C) {  // getting column names
		    var addr = X.utils.encode_cell({c:C,r:R});
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
				cleanString = cleanString.replace(/ /g,'_'); // removing spaces
				cleanString = cleanString.replace(/[^\w\s]|(_)\1/gi,'_'); // replacing consecutive '__' with '_'
				cleanString = cleanString.toLowerCase();
			}
			headers.push(cleanString);
			columnSet.push(new Column({
				name: cleanString,
				def: null
			}));
		}

		return columnSet;
	}
};