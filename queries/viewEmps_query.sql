SELECT 
employee.id, 
employee.first_name, 
employee.last_name, 
role.title AS title, 
role.department AS department, 
CONCAT(employee.first_name, " ", employee.last_name) AS manager WHERE employee.manager_id = employee.id
FROM employee
INNER JOIN role ON employee.role_id = role.id;
