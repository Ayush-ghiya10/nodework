const SkillMap = require('../../models/mappingModels/skillMap');
const {v4:uuidv4} = require('uuid');
exports.add = async(entityid,skillId)=>{
    try {
        const newSkillMap =  new SkillMap({
            uid:uuidv4(),
            entityid,
            skillId
        });
        await newSkillMap.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
}