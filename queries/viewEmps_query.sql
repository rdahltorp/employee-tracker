SELECT 
employee.id, 
employee.first_name, 
employee.last_name, 
roles.title AS title, 
roles.department AS department, 
CONCAT(employee.first_name, " ", employee.last_name) AS manager WHERE employee.manager_id = employee.id
FROM employee
INNER JOIN roles ON employee.role_id = roles.id;
