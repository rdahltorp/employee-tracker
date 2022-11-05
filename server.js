const mysql = require('mysql2');
const app = require('express') //I may not need express since I am not triggering HTTP routes. May need to delete.

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware //see note above
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: employees_db
},
console.log("You are now connected to the employees_db database")
);

