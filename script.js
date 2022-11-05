const cTable = require('console.table');
const { response } = require('express');
const inquirer = require('inquirer');

//Additional Functions
function addDepartment () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable    
}

function addRole () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable    
}

function addEmployee () {
    //Add inquirer prompt here for these specific questions. Also need to POST to db. ALso return cTable    
}

function updateEmployee () {
    //Add inquirer prompt here for these specific questions. Also need to PUT to db. ALso return cTable    
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
        if(answer.menu === "Quit"){
            return
        } else {
            console.log(`You have selected ${response.menu}`)
            mainMenu()
        }
    });

}

mainMenu()

