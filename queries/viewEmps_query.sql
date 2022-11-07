SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.name AS department, CONCAT(employee.first_name, " ", employee.last_name) manager WHERE employee.id = employee.manager_id 
FROM employee
LEFT JOIN roles ON 
employee.role_id = roles.id
LEFT JOIN department ON
department.id = roles.department_id
ORDER BY employee.id;