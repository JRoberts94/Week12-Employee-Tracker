const { connect } = require("../db/connection")

async function addRole(title, salary, department){

    const db = await connect();
    await db.query('INSERT INTO `employee_tracker`.`roles` (`title`, `salary`, `department`) VALUES (?, ?, ?)', [title, salary, department]);   
}

async function getRoles(){
    const db = await connect();

    const [roles] = await db.query('SELECT * FROM roles');

    return roles;
}

  // FUNCTION TO RETURN ROLE ID
async function getRoleByTitle(title) {
    const db = await connect();
    const [roles] = await db.query("SELECT * FROM roles WHERE title = ?", title);
        
        return roles[0];
  }

// FUNCTION TO RETURN ROLE ID
// async function getRoles() {
//   const db = await connect();
//   const [roles] = await db.query("SELECT * FROM roles");
//   console.log(roles);
//   return roles;
// }


// async function getRoleId(id){
//     const db = await connect();
//     const [roleId] = await db.query(
//         "SELECT id FROM employee_tracker.roles WHERE title = ?",
//         id
//     );
//     return roleId[0]?.id;
// }

module.exports = {
    addRole,
    getRoles,
    getRoleByTitle,
    // getRoles,
}