const { connect } = require("../db/connection")

async function addEmployee(first_name, last_name, role_id){

    const db = await connect();

    // await db.query('INSERT INTO `employee_tracker`.`employees` (`first_name`) VALUES (?)', first_name);

    await db.query('INSERT INTO `employees` (`first_name`, `last_name`, `role_id`) VALUES (?, ?, ?)', [first_name, last_name, role_id]);

    
}
// code to grab specific salaries 
// SELECT * FROM employee_tracker.roles WHERE (`salary`) >= (12345);

async function getEmployees(){
    const db = await connect();

    const [employees] = await db.query('SELECT * FROM employees');

    return employees;


}


module.exports = {
    addEmployee,
    getEmployees,
}
