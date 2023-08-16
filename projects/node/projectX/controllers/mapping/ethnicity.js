const EthnicityMap = require('../../models/mappingModels/ethnicityMap');
const {v4:uuidv4} = require('uuid');
exports.add = async(entityid,ethnicityId)=>{
    try {
        const newEthnicityMap =  new EthnicityMap({
            uid:uuidv4(),
            entityid,
            ethnicityId
        });
        await newEthnicityMap.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
}