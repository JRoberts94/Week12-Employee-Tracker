const {faker} = require('@faker-js/faker');
const { addDepartment } = require('../../operations/departments');

//fake seeds to fill sql
async function seedDepartments(num = 10){

    for (let index = 0; index < num; index++) {
        
        await addDepartment(faker.commerce.department())
        
    }

}



module.exports = {
    seedDepartments,
}