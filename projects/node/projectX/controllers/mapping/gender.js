const GenderMap = require('../../models/mappingModels/genderMap');
const {v4:uuidv4} = require('uuid');
exports.add = async(entityid,genderId)=>{
    try {
        const newGenderMap =  new GenderMap({
            uid:uuidv4(),
            entityid,
            genderId
        });
        await newGenderMap.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
}