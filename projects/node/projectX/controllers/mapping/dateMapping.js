const DateMap = require('../../models/mappingModels/dateMap');
const {v4:uuidv4} = require('uuid');
exports.add = async(individualDate,entityid,entityType)=>{
    try {
        const newDateMap =  new DateMap({
            uid:uuidv4(),
            entityid,
            individualDate,
            entityType
        });
        await newDateMap.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
}