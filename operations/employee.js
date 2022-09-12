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
async function updateRole(id, role) {
  const db = await connect();
  const name = id;
  const empIdArray = await db.query(
    "SELECT id FROM employee WHERE first_name = ?",
    name
  );

  let employeeId1 = empIdArray[0];
  let empId = employeeId1[0].id;
  let roleId = role[0].id;

  let sql = `UPDATE employee SET role_id = ? WHERE id =?`;
  const data = [roleId, empId];
  const update = await db.query(sql, data);
  return update;
}

module.exports = {
    addEmployee,
    getEmployees,
    getEmployeeNames,
    getManagerId,
    updateRole,

}
