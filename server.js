const mysql = require('mysql2');
const express = require('express') //I may not need express since I am not triggering HTTP routes. May need to delete.
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');
const { Server } = require('http');

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


//Additional Functions
function viewDepts() {
    //Add a cTable takes the query to view departments
    const sql = fs.readFileSync('./queries/viewDepts_query.sql').toString();

    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
        }
    })
    //Add mainMenu() call 
    mainMenu()
}

function viewRoles() {
    //Add a cTable takes the query to view roles
    //Add mainMenu() call 

}

function viewEmps() {
    //Add a cTable takes the query to view roles
    //Add mainMenu() call
}

function addDepartment () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable
    //Add mainMenu() call    
}

function addRole () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable
    //Add mainMenu() call    
}

function addEmployee () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable
    //Add mainMenu() call    
}

function updateEmployee () {
    //Add inquirer prompt here for these specific questions. Also need to PUT to db. 
    //Add mainMenu() call   
}

function mainMenu() {
    inquirer
    .prompt([{
        message: "Welcome to the employee tracker database! What would you like to do?",
        type: 'list',
        name: 'menu',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
    }])
    .then(answer => {
        // if(answer.menu === "Quit"){
        //     return
        // } else {
        //     console.log(`You have selected ${answer.menu}`)
        //     mainMenu()
        // }

        if (answer.menu === "View all departments") {
            viewDepts();
        } else if (answer.menu === "View all roles") {
            viewRoles();
        } else if (answer.menu === "View all employees") {
            viewEmps();
        } else if (answer.menu === "Add a department") {
            addDepartment();
        } else if (answer.menu === "Add a role") {
            addRole();
        } else if (answer.menu === "Add a employee") {
            addEmployee();
        } else if (answer.menu === "Update an employee role") {
            updateEmployee();
        } else if (answer.menu === "Quit") {
            return;
        }
    });

}

mainMenu()