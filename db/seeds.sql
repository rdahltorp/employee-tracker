INSERT INTO department (name)
VALUES ("Marketing"),
       ("Engineering"),
       ("Legal"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Lead", 180000, 1),
       ("Marketing Associate", 90000, 1),
       ("Engineering Lead", 200000, 2),
       ("Engineer", 120000, 2),
       ("Senior Lawyer", 300000, 3),
       ("Lawyer", 150000, 3),
       ("Accounting Lead", 180000, 4),
       ("Accountant", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, ,manager_id)
VALUES ("Han", "Solo", 1, NULL),
       ("Chewy", "Bacca", 2, 1),
       ("Artoo", "Deetoo", 3, NULL),
       ("Bebe", "Eight", 4, 3),
       ("Leia", "Organa", 5, NULL),
       ("Cee", "Threepeo", 6, 5),
       ("Darth", "Vader", 7, Null),
       ("Luke", "Skywalker", 8, 7);

