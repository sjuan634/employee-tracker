-- DESCRIBE department;
-- DESCRIBE role;
-- DESCRIBE employee;


-- view all departments
SELECT * FROM department;

-- view all roles
SELECT role.id, role.title, department.name AS department, role.salary 
FROM role
JOIN department
ON role.department_id = department.id
ORDER BY department.name;

-- view all employees
SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

-- add a department
INSERT INTO department (name) 
VALUES ('DepartmentName');

-- add a role
INSERT INTO role (title, salary, department_id)
VALUES ('RoleTitle', 'Salary', 'DepartmentID');

-- add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('FirstName', 'LastName', 'RoleID', 'ManagerID'),

-- update an employee role
UPDATE employee 
SET role_id = 'NewRoleID', 
WHERE id = 'EmployeeID';

-- update employee managers
UPDATE employee 
SET manager_id = 'NewManagerID', 
WHERE id = 'EmployeeID';

-- view employees by manager
SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, GROUP_CONCAT(CONCAT(employee.first_name, ' ', employee.last_name) SEPARATOR ', ') AS employee_name
FROM employee
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
GROUP BY employee.manager_id;

-- view employees by department
SELECT department.name AS department, GROUP_CONCAT(CONCAT(employee.first_name, ' ', employee.last_name) SEPARATOR ', ') AS employee_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
GROUP BY department.id;

-- view total used budget for each department
SELECT department.name AS department, SUM(role.salary) AS total_utilized_budget
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
GROUP BY department_id;