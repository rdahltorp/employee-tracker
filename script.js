const mysql = require('mysql2');
const express = require('express') //I may not need express since I am not triggering HTTP routes. May need to delete.
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');
const { Server } = require('http');
const { type } = require('os');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware //see note above
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
},
console.log("You are now connected to the employees_db database")
);

function test() {
    console.log(db.query('SELECT name FROM department'));
}

test()