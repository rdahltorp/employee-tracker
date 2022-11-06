SELECT roles.id, roles.title, department.name AS department, roles.salary
FROM roles
INNER JOIN department ON roles.department_id = department.id;