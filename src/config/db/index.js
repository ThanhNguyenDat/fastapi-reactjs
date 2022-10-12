const Pool = require('pg').Pool

async function connect_postgresql() {
    try {
        await new Pool({
            host: 'localhost',
            user: 'react_fastapi',
            password: 'react_fastapi',
            database: 'image_stored',
            port: 5432,
        });
        
        console.log("Postgresql connected");
    }

    catch (error) {
        console.log('Postgresql connection error: ', error)
    }
}

connect_postgresql();

module.exports = { connect_postgresql };