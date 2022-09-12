const { connect } = require("../db/connection")

async function addEmployee(first_name, last_name, role_id, manager){

    const db = await connect();



    await db.query('INSERT INTO `employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager]);

    
}
// code to grab specific salaries 
// SELECT * FROM employee_tracker.roles WHERE (`salary`) >= (12345);

async function getEmployees(){
    const db = await connect();

    const [employees] = await db.query('SELECT * FROM employees');

    return employees;


}

// FUNCTION TO GET LIST OF NAMES FOR MANAGER
async function getEmployeeNames() {
    const db = await connect();
    const employees = await db.query("SELECT first_name FROM employee_tracker.employees;");
    let employeeNames = employees[0];
    return employeeNames;
  }

// FUNCTION TO GET MANAGER ID
async function getManagerId(name) {
    if (!name) {
      return null;
    } else {
      const db = await connect();
    
      const [managerId] = await db.query(
        "SELECT id FROM employees WHERE first_name = ?",
        [name]
      );
      console.log(managerId);
      return managerId[0]?.id;
    }
  }


// FUNCTION TO UPDATE ROLE
async function updateRole(roleId, first_name) {
  const db = await connect();
  const [empIdArray] = await db.query(
    "SELECT id FROM employees WHERE first_name = ?",
    [first_name]
  );

  let employeeId1 = empIdArray[0];
    console.log(employeeId1);
  const [update] = await db.query("UPDATE employees SET role_id = (?) WHERE id = (?)", [roleId, employeeId1.id]);
  return update[0];
}

module.exports = {
    addEmployee,
    getEmployees,
    getEmployeeNames,
    getManagerId,
    updateRole,

}
