const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');

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

async function addRole () {
    const sql = fs.readFileSync('./queries/addRole_query.sql').toString();

    const currentDepts = await db.promise().query('SELECT name, id FROM department')
    
    const cDepts = currentDepts[0].map((dept) => {
        return {
            name: dept.name, 
            value: dept.id
        }
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
                type: 'list',
                name: 'department',
                choices: cDepts 
            }
        ])
        .then(role => {
            db.query(sql, {
                title: role.title,
                salary: role.salary,
                department_id: role.department
            });
            console.table(role);
            mainMenu()
        });
}

async function addEmployee () {
    const sql = fs.readFileSync('./queries/addEmp_query.sql').toString();

    const currentRoles = await db.promise().query('SELECT title, id FROM roles')
    
    const cR = currentRoles[0].map((role) => {
        return {
            name: role.title, 
            value: role.id
        }
    })

    const currentManagers = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS manager, id FROM employee')
    
    const cM = currentManagers[0].map((manager) => {
        return {
            name: manager.manager, 
            value: manager.id
        }
    })


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
                type: 'list',
                name: 'role_id',
                choices: cR
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
                            message: "What is this employee's manager's name?",
                            type: 'list',
                            name: 'manager_id',
                            choices: cM
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

async function updateEmployeeRole () {     
    const currentEmployees = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS employee, id FROM employee')

    const cEmps = currentEmployees[0].map((emp) => {
        return {
            name: emp.employee, 
            value: emp.id
        }
    })

    const currentRoles = await db.promise().query('SELECT title, id FROM roles')
    
    const cR = currentRoles[0].map((role) => {
        return {
            name: role.title, 
            value: role.id
        }
    })
    
    inquirer
        .prompt([
            {
                message: "What is the name of the employee you would like to update?",
                type: 'list',
                name: 'name',
                choices: cEmps
            },
            {
                message: "What is the new role this employee will have?",
                type: 'list',
                name: 'role_id',
                choices: cR
            }
        ])
        .then(roleUpdate => {
            //Could not get SQL statement to work in separate file so included in function.  
            db.query(`UPDATE employee SET role_id = ${roleUpdate.role_id} WHERE id = ${roleUpdate.name}`)
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