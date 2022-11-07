const mysql = require('mysql2');
const express = require('express') //I may not need express since I am not triggering HTTP routes. May need to delete.
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');

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

//CODE BELOW IS TRYING TO PULL DATA IN FROM THE DB SO I CAN USE AS ANSWERS IN FLOW. 
function test() {
    db.query('SELECT name FROM department', (err, depts) => {
        if(err) {
            console.log(err);
        }
        console.log(depts);
    })
}


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
    //RECIVING ERROR. Needs work
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
    const sql = fs.readFileSync('./queries/addDept_query.sql').toString();
    
    inquirer
        .prompt([{
            message: "What is the name of the new department?",
            type: 'input',
            name: 'name'
        }])
        .then(answer => {
            db.query(sql, answer.name);
            console.table(viewDepts());
        });
}

function addRole () {
    const sql = fs.readFileSync('./queries/addRole_query.sql').toString();

    const currentDepts = db.query('SELECT name FROM department', (err, depts) => {
        if(err) {
            console.log(err);
        }
        console.log(depts);
    })

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
                message: 'What department is this role in?',
                type: 'input',
                name: 'department_id'
            }
            // CODE BELOW IS TRYING TO INPUT DATA FROM THE DB AS ANSWER CHOICES.
            // {
            //     message: 'What department is this role in?',
            //     type: 'list',
            //     name: 'department',
            //     choices: [currentDepts] 
            // }
        ])
        .then(role => {
            db.query(sql, {
                title: role.title,
                salary: role.salary,
                department_id: role.department_id
            });
            console.table(role);
            mainMenu()
        });
}

function addEmployee () {
    const sql = fs.readFileSync('./queries/addEmp_query.sql').toString();

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
                message: "Does this employee have a manager?",
                type: 'list',
                choices: ['Yes', 'No'],
                name: 'hasManager'
            }

        ])
        .then(employee => {
            if(employee.hasManager === "Yes"){
                inquirer
                    .prompt([
                        {
                            message: "What is this employee's manager id number?",
                            type: 'input',
                            name: 'manager_id'
                        }
                    ])
                    .then(directReport => {
                        delete employee.hasManager;

                        let newEmp = {
                            ...employee,
                            ...directReport
                        };

                        db.query(sql, {
                            first_name: newEmp.first_name,
                            last_name: newEmp.last_name,
                            role_id: newEmp.role_id,
                            manager_id: newEmp.manager_id
                        });
                        console.table(newEmp);
                        mainMenu()
                    })
            } else {
                delete employee.hasManager;

                db.query(sql, {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    role_id: employee.role_id,
                    manager_id: null
                });
                console.table(employee);
                mainMenu()
            }
        })
}

function updateEmployeeRole () {  
    inquirer
        .prompt([
            {
                message: "What is the ID of the employee you would like to update?",
                type: 'input',
                name: 'id',
            },
            {
                message: "What is the id of the new role this employee will have?",
                type: 'input',
                name: 'role_id'
            }
        ])
        .then(roleUpdate => {
            //Could not get SQL statement to work in separate file so included in function.  
            db.query(`UPDATE employee SET ? WHERE id = ${roleUpdate.id}`, roleUpdate)
            console.table(roleUpdate);
            mainMenu()
        })
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
//test()