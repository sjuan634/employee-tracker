const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
require('dotenv').config();


// create the connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update an employee manager",
        "View employees by manager",
        "View employees by department",
        "View total used budget for each department",
        "Quit"
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Update an employee manager":
          updateEmployeeManager();
          break;
        case "View employees by manager":
          viewEmployeeByManager();
          break;
        case "View employees by department":
          viewEmployeeByDep();
          break;
        case "View total used budget for each department":
          viewDepBudget();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
};