var X = require('xlsx');

var _TYPES = {
  "PGSQL":  { t:"text", n:"float8", d:"timestamp", b:"boolean" },
  "MYSQL":  { t:"TEXT", n:"REAL",   d:"DATETIME",  b:"TINYINT" },
  "SQLITE": { t:"TEXT", n:"REAL",   d:"TEXT",      b:"REAL"    }
};

module.exports = {
	// takes excel sheet and parses into array of queries
	//NOTE! PRIMARY KEY must be the first column
	//NOTE! can't have same column name...
	sheetToQueries: function(ws, sname, mode) {
		var TYPES = _TYPES[mode || "SQLITE"];
		console.log("inside sheetToQueries function");
		if(!ws || !ws['!ref']) return;  // nullcheck
		var range = X.utils.decode_range(ws['!ref']);
		// c -> col, r-> row, s-> start cell in range, e-> end cell in range
		if(!range || !range.s || !range.e || range.s > range.e) return;
  		var R = range.s.r; // index of first row
  		var C = range.s.c; // index of first col

  		var names = new Array(range.e.c-range.s.c+1);
  		for(C = range.s.c; C<= range.e.c; ++C) {  // getting column names
		    var addr = X.utils.encode_cell({c:C,r:R});
		    names[C-range.s.c] = ws[addr] ? ws[addr].v : X.utils.encode_col(C);
		}
		names[0] = "ID";  // hardcoding the first column to be id
		for (let i = 0; i < names.length; i++) { 
			var mystr = "\"";
			names[i] = mystr.concat(names[i]).concat(mystr);
		}
		//console.log(names);


	  var types = new Array(range.e.c-range.s.c+1);
	  for(C = range.s.c; C<= range.e.c; ++C) {
	    var seen = {}, _type = "";
	    for(R = range.s.r+1; R<= range.e.r; ++R)
	      seen[(ws[X.utils.encode_cell({c:C,r:R})]||{t:"z"}).t] = true;
	    if(seen.s || seen.str) _type = TYPES.t;
	    else if(seen.n + seen.b + seen.d + seen.e > 1) _type = TYPES.t;
	    else switch(true) {
	      case seen.b: _type = TYPES.b; break;
	      case seen.n: _type = TYPES.n; break;
	      case seen.e: _type = TYPES.t; break;
	      case seen.d: _type = TYPES.d; break;
	    }
	    types[C-range.s.c] = _type || TYPES.t;
	  }

	  var out = [];

	  var BT = mode == "PGSQL" ? "" : "`";
	  var Q  = mode == "PGSQL" ? "'" : '"';
	  var J  = mode == "PGSQL" ? /'/g : /"/g;
	  out.push("DROP TABLE IF EXISTS " + BT + sname + BT );
	  out.push("CREATE TABLE " + BT + sname + BT + " (" + names.map(function(n, i) { 
	  		return BT + n + BT + " " + (types[i]||"TEXT"); }
	  	).join(", ") + ", PRIMARY KEY (" + names[0] + ")" + ");"); 

	  for(R = range.s.r+1; R<= range.e.r; ++R) {
	    var fields = [], values = [];
	    for(C = range.s.c; C<= range.e.c; ++C) {
	      var cell = ws[X.utils.encode_cell({c:C,r:R})];
	      if(!cell) continue;
	      fields.push(BT + names[C-range.s.c] + BT);
	      var val = cell.v;
	      switch(types[C-range.s.c]) {
	        case TYPES.n: if(cell.t == 'b' || typeof val == 'boolean' ) val = +val; break;
	        default: val = Q + val.toString().replace(J, Q + Q) + Q;
	      }
	      values.push(val);
	    }
	    out.push("INSERT INTO " + BT +sname+ BT + " (" + fields.join(", ") + ") VALUES (" + values.join(",") + ");");
	  }

	  return out;

	}
};