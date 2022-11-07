SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(a.first_name, " ", a.last_name) AS manager
FROM employee
LEFT JOIN roles ON 
employee.role_id = roles.id
LEFT JOIN department ON
department.id = roles.department_id
LEFT JOIN employee a ON 
a.id = employee.manager_id
ORDER BY employee.id;