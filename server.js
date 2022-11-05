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


//Additional Functions
function viewDepts() {
    const sql = fs.readFileSync('./queries/viewDepts_query.sql').toString();

    db.query(sql, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            mainMenu()
        }
    });
};

function viewRoles() {
    const sql = fs.readFileSync('./queries/viewRoles_query.sql').toString();

    db.query(sql, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            mainMenu()
        }
    });
};

function viewEmps() {
    //RECIVING ERROR
    const sql = fs.readFileSync('./queries/viewEmps_query.sql').toString();

    db.query(sql, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            mainMenu()
        }
    });
}

function addDepartment () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable
    inquirer
        .prompt([{
            message: "What is the name of the new department?",
            type: 'input',
            name: 'name'
        }])
        .then(answer => (console.log(answer)));
    //Add mainMenu() call    
}

function addRole () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable
    inquirer
        .prompt([
            {
                message: "What is the name of the role?",
                type: 'input',
                name: 'title'
            },
            {
                message: 'What is the salary for this role?',
                type: 'input',
                name: 'salary'
            },
            {
                message: 'What department number is this role in?',
                type: 'input',
                name: 'department_id'
            }
        ])
        .then(answer => (console.log(answer)));
    //Add mainMenu() call    
}

function addEmployee () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable
    inquirer
        .prompt([
            {
                message: "What is the new employee's first name?",
                type: 'input',
                name: 'first_name'
            },
            {
                message: "What is the new employee's last name?",
                type: 'input',
                name: 'last_name'
            },
            {
                message: "What is this employee's role id number?",
                type: 'input',
                name: 'role_id'
            },
            {
                message: "What is this employee's manager id number?",
                type: 'input',
                name: 'manager_id'
            }
        ])
        .then(answer => (console.log(answer)));
    //Add mainMenu() call    
}

function updateEmployeeRole () {
    //Add inquirer prompt here for these specific questions. Also need to PUT to db. 
    inquirer
        .prompt([
            {
                message: "Which employee would you like to update?",
                type: 'list',
                name: 'employee',
                choices: []
            },
            {
                message: "What is the new employee's last name?",
                type: 'input',
                name: 'last_name'
            },
            {
                message: "What is this employee's role id number?",
                type: 'input',
                name: 'role_id'
            },
            {
                message: "What is this employee's manager id number?",
                type: 'input',
                name: 'manager_id'
            }
        ])
        .then(answer => (console.log(answer)));
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
        switch (answer.menu) {
            case "View all departments":
                viewDepts()
                break;
            
            case "View all roles":
                viewRoles()
                break;
            
            case "View all employees":
                viewEmps()
                break;

            case "Add a department":
                addDepartment()
                break;
            
            case "Add a role":
                addRole()
                break;
            
            case "Add an employee":
                addEmployee()
                break;
            
            case "Update an employee role":
                updateEmployeeRole()
                break;
        
            default:
                break;
        }
    });
}

mainMenu()