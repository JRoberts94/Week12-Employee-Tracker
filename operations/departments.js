const { connect } = require("../db/connection")

async function addDepartment(name){

    const db = await connect();

    await db.query('INSERT INTO `employee_tracker`.`departments` (`name`) VALUES (?)', name);

    
}


async function getDepartments(){
    const db = await connect();

    const [departments] = await db.query('SELECT * FROM departments');

    return departments;


}

async function getDepartmentId(name) {
    const db = await connect();
    const [departmentId] = await db.query(
      "SELECT id FROM departments WHERE name = ?",
      name
    );
    return departmentId[0]?.id;
  }

module.exports = {
    addDepartment,
    getDepartments,
    getDepartmentId,
}