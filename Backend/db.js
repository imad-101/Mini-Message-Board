const {Pool } = require('pg');
const pool = new Pool({
    user : 'postgres',
    password : 'imad17',
    host :'localhost',
    port : 5432,
    database : "message_board",
})
module.exports = pool;