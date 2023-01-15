INSERT INTO department (name)
VALUES ('Data IO'),
       ('Mastering'),
       ('Client Services');

INSERT INTO role (title, salary, department_id)
VALUES ('Data IO Manager', 100000, 1),
       ('Data IO Op', 60000, 1),
       ('Data Archive Op', 60000, 1),
       ('Data IO Lead', 75000, 1),
       ('Data Achive Lead', 75000, 1),
       ('Mastering Manager', 115000, 2),
       ('Mastering Op', 75000, 2),
       ('Mastering Lead', 85000, 2),
       ('Acount Manager', 150000, 3),
       ('Mastering Coordinator', 60000, 3),
       ('Distriburion Coordinator', 50000, 3);

       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Emily', 'Smith', 1, NULL),
       ('Michael', 'Johnson', 2, 1),
       ('Joshua', 'Williams', 3, 1),
       ('Ashley', 'Jones', 4, 1),
       ('Matthew', 'Brown', 5, 1),
       ('Sarah', 'Garcia', 6, NULL),
       ('David', 'Miller', 7, 6),
       ('Megan', 'Davis', 8, 6),
       ('Ryan', 'Rodriguez', 9, NULL),
       ('Stephanie', 'Martinez', 10, 9),
       ('Jasmine', 'Patel', 11, 9);