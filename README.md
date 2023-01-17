# Employee Tracker

## Description

This command-line app allows you to view and update data in a MySQL library. Specifically a database that has the below schema.

![Database Schema](./assets/db_schema.png)

Below is a list of options that the app presents you with. ``` inquirer version 8.2.4 ``` is used to handle user interaction. ``` mysql2 ``` is used to connect and interact with the database. ``` console.table ``` is used to present the data to the user.

* Display all departments
* Display all roles
* Display all employees
* Add a department
* Add a role
* Add an employee
* Update an employee role
* Update an employee manager
* View employees by manager
* View employees by department
* View utilized budget of a department

## User Story
utilized budget of a department
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
## Usage

[Demo Video](https://drive.google.com/file/d/1i3Wybp1e_bJXidrs7_pMWZFQne16TmMM/view)