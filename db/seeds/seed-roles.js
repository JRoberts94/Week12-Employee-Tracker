const {faker} = require('@faker-js/faker');
const { addRole } = require('../../operations/roles');

//fake seeds to fill sql
async function seedRoles(num = 10){

    for (let index = 0; index < num; index++) {
        
        await addRole(faker.commerce.noun())
        
    }

}



module.exports = {
    seedRoles,
}