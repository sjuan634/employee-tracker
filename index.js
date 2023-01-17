const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
require('dotenv').config();


// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'View employees by manager',
        'View employees by department',
        'View total used budget for each department',
        'Quit'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Update an employee manager':
          updateEmployeeManager();
          break;
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        case 'View employees by department':
          viewEmployeesByDep();
          break;
        case 'View total used budget for each department':
          viewDepBudget();
          break;
        case 'Quit':
          connection.end();
          break;
      }
    });
};

start();

// function to display all departments
const viewDepartments = () => {
  connection.query('SELECT * FROM department', (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
};

// function to display all roles
const viewRoles = () => {
  connection.query(
    `SELECT role.id, role.title, department.name AS department, role.salary 
    FROM role
    JOIN department
    ON role.department_id = department.id
    ORDER BY department.name`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
};

// function to display all employees
const viewEmployees = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
};

// function to add a department
const addDepartment = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Enter the name of the department:'
    })
    .then(answer => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.department
        },
        (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
          start();
        }
      );
    });
};

// function to add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary of the role:'
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department id for the role:'
      }
    ])
    .then(answers => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id
        },
        (err) => {
          if (err) throw err;
        console.log('Role added successfully!');
        start();
      });
    });
};

// function to add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the first name of the employee:"
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the last name of the employee:"
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the role id for the employee:"
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter the manager id for the employee (if any):"
      }
    ])
    .then(answers => {
      if (answers.manager_id.toLowerCase() === "null" || answers.manager_id.toLowerCase() === "none" || answers.manager_id.toLowerCase() === "n/a") {
        answers.manager_id = null;
      }
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id
        },
        (err) => {
          if (err) throw err;
          console.log("Employee added successfully!");
          start();
        }
      );
    });
};

// function to update an employee role
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: 'Select the employee you want to update:',
          choices: employees.map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
          })
        },
        {
          name: 'role_id',
          type: 'input',
          message: 'Enter the new role id for the employee:'
        }
      ])
      .then(answers => {
        connection.query(
          'UPDATE employee SET role_id = ? WHERE id = ?',
          [answers.role_id, answers.employee],
          (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            start();
          }
        );
      });
  });
};

// function to update an employee manager
const updateEmployeeManager = () => {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, employees) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: 'Select the employee you want to update:',
          choices: employees.map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
          })
        },
        {
          name: 'manager_id',
          type: 'input',
          message: 'Enter the new manager id for the employee:'
        }
      ])
      .then(answers => {
        connection.query(
          'UPDATE employee SET manager_id = ? WHERE id = ?',
          [answers.manager_id, answers.employee],
          (err) => {
            if (err) throw err;
            console.log('Employee manager updated successfully!');
            start();
          }
        );
      });
  });
};

// function to view employees by manager
const viewEmployeesByManager = () => {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, employees) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'manager',
          type: 'list',
          message: 'Select a manager:',
          choices: employees.map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
          })
        }
      ])
      .then(answer => {
        connection.query(
          `SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
          FROM employee
          JOIN employee as manager ON employee.manager_id = manager.id 
          WHERE employee.manager_id = ?`,
          [answer.manager],
          (err, data) => {
            if (err) throw err;
            console.table(data);
            start();
          }
        );
      });
  });
};

// function to view employees by department
const viewEmployeesByDep = () => {
  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'department',
          type: 'list',
          message: 'Select a department:',
          choices: departments.map(department => {
            return { name: department.name, value: department.id };
          })
        }
      ])
      .then(answer => {
        connection.query(
          `SELECT employee.id, employee.first_name, employee.last_name, department.name as department
          FROM employee
          JOIN role ON employee.role_id = role.id 
          JOIN department ON role.department_id = department.id
          WHERE department.id = ?`,
          [answer.department],
          (err, data) => {
            if (err) throw err;
            console.table(data);
            start();
          }
        );
      });
  });
};

// function to view total utilized budget of a department
const viewDepBudget = () => {
  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'department',
          type: 'list',
          message: 'Select a department:',
          choices: departments.map(department => {
            return { name: department.name, value: department.id };
          })
        }
      ])
      .then(answer => {
        connection.query(
          `SELECT SUM(role.salary) as utilized_budget, department.name as department
          FROM employee
          JOIN role ON employee.role_id = role.id
          JOIN department ON role.department_id = department.id
          WHERE department.id = ?`,
          [answer.department],
          (err, data) => {
            if (err) throw err;
            console.table(data);
            start();
          }
        );
      });
  });
};