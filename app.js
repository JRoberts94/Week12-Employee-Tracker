const inquirer = require('inquirer');
const { getDepartments, addDepartment, getDepartmentId } = require('./operations/departments');
const { getEmployees, addEmployee } = require('./operations/employee');
const { getRoles, addRole, getRoleTitle, getRoleByTitle } = require('./operations/roles');


function main(){
    
    return inquirer.prompt([
        {
            message: "what you want?",
            type: 'list',
            name: 'operation',
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add department",
                "add a role",
                "add new employee",
                "update employee role", // once user selected this, should see employee name list, once selected, select new role
                "exit"
            ]
        },
        // department
        {
            message: "what is the department name?",
            type: "input",
            name: "department_name",
            when: (ans) => ans.operation === 'add department',
        },
        //role questions
        {
            message: "what is the title of the role?",
            type: "input",
            name: "role_title",
            when: (ans) => ans.operation === 'add a role',
            
        },
        {
            message: "what is the salary of the role?",
            type: "input",
            name: "role_salary",
            when: (ans) => ans.operation === 'add a role',
        },
        {
            message: "what department does the role fall into?",
            type: "list",
            name: "role_department",
            choices: async function returnDepts(){
                const deptList = await getDepartments();
                return deptList;
            },
            when: (ans) => ans.operation === 'add a role',
        },
        //employee questions
        {
            message: "what is the employees first name?",
            type: "input",
            name: "employee_first_name",
            when: (ans) => ans.operation === 'add new employee',
        },
        {
            message: "what is the employees last name?",
            type: "input",
            name: "employee_last_name",
            when: (ans) => ans.operation === 'add new employee',
        },
        {
            message: "what role does the employee have?",
            type: "list",
            name: "employee_role",
            choices: async function returnRoles(){
                const roles = await getRoles();
                // console.log(roles);

                let choices = [];
                for (let index = 0; index < roles.length; index++) {

                    const role = roles[index];
                    choices.push(role.title);
                    
                }
                return choices;
            },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            when: (ans) => ans.operation === 'add new employee',
        },
    ]).then(async (ans) => {
        switch(ans.operation){
            case "view all departments":
                const departments = await getDepartments();
                console.table(departments);
                break;
                
            case "add department":
                const department = await addDepartment(ans.department_name);
                console.table("successfully added new role");
                break;

            case "view all roles":
                const roles = await getRoles();
                console.table(roles);
                break;

            case "add a role":
                const roleTitle = ans.role_title;
                const roleSalary = ans.role_salary;
                const roleDept = ans.role_department;
                const deptId = await getDepartmentId(roleDept);
                console.log(deptId);
                if (!deptId) {
                    throw new Error("couldnt add new role");
                }await addRole(roleTitle, roleSalary, deptId);
                console.table("successfully added!");
                break;

            case "view all employees":
                const employees = await getEmployees();
                console.table(employees);
                break;

            case "add new employee":
                const firstName = ans.employee_first_name;
                const lastName = ans.employee_last_name;
                
                const employeeRole = await getRoleByTitle(ans.employee_role);
                // console.log(employeeRole);
                if (!employeeRole) {
                    throw new Error("couldnt add new employee");
                }
                await addEmployee(firstName, lastName, employeeRole.id);
                console.log("successfully added new employee");
                break;


            case "exit":
                process.exit(0);
                break;
        }

        await main();
    })

}

main();
// create CLI to manage employees

// view all departments

// view all roles
// view all employees
// add a department

// add a role, add an employee, and update an employee role