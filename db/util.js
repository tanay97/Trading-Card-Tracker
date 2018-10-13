const { Pool, Client } = require('pg');    

const connectionString = 'postgres://asivvmmy:llmOHkPi-sLOd6jW_KVsLf4_VxSFeyDa@elmer.db.elephantsql.com:5432/asivvmmy';
var pool;

module.exports = {
	// call this method before everything to connect to db
	connect: () => {
		console.log('creating and connecting Pool object');
		pool = new Pool({    // # of clients is defaulted to 10
  			connectionString: connectionString,
		});

		// the pool with emit an error on behalf of any idle clients
		// it contains if a backend error or network partition happens      NOT SURE IF THIS SHOULD GO HERE
		pool.on('error', (err, client) => {
		  console.error('Unexpected error on idle client', err)
		  process.exit(-1)
		});
	},
	// execute singular query
	query: (text, values, callback) => {
		const start = Date.now();
		return pool.query(text, values, (err, res) => {
			const duration = Date.now() - start;
			console.log('executed query', { text, duration });
      		callback(err, res);
		});
	},
	// get client for transactions
	// wrapper so know what was the last query the client executed
	getClient: (callback) => {
		pool.connect((err, client, done) => {   // pool.connect returns a client or creates one if can

			// after 5 secs, an error occured
			const timeout = setTimeout(() => {
		        console.error('A client has been checked out for more than 3 minutes!');
		    }, 180000);

			const release = (err) => {
				done(err);  // return client to pool
				console.log("returned client");
				clearTimeout(timeout); // clear the error timeout
			};

			callback(err, client, release);
		});
	}
};