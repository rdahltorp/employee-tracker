SELECT role.id, role.title, department.name AS department, role.salary
FROM role
INNER JOIN department ON role.department_id = department.id;