const Pool = require('pg').Pool

async function connect_postgresql() {
    try {
        await new Pool({
            user: 'react_fastapi',
            host: 'localhost',
            database: 'db_test',
            password: 'react_fastapi',
            port: 5432,
        });

        console.log("Postgresql connected");
        
        
    }

    catch (error) {
        console.log('Postgresql connection error: ', error)
    }
}

module.exports = { connect_postgresql };