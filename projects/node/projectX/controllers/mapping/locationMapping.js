const LocationMap = require('../../models/mappingModels/locationMap');
const {v4:uuidv4} = require('uuid');
exports.add = async(entityid,auditionLocation,entityType)=>{
    try {
        const newLocationMap =  new LocationMap({
            uid:uuidv4(),
            entityid,
            locationId:auditionLocation,
            entityType
        });
        await newLocationMap.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
}