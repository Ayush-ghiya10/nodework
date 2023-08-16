const Skill = require('../models/lookupModels/skill');
module.exports=async(fieldValue,operationType,fieldId)=>{
    try {
        if(operationType == 'create'){
            const existField = await Skill.findOne({skillValue :fieldValue.toLowerCase()});
            console.log(existField);
            if(existField) throw Error('Field is already created');
            const newSkill = new Skill({
                skillValue: fieldValue
            })
            const result = await newSkill.save();
            if(!result) throw Error('Not able to create field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'update'){
            const result = await Skill.findOneAndUpdate({skillId:fieldId},{skillValue:fieldValue.toLowerCase()});
            if(!result) throw Error('Not able to update field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'delete'){
            const result = await Skill.findOneAndDelete({skillId:fieldId});
            if(!result) throw Error('Not able to delete field');
            return {status:'Success',data:result}
        }
        else if (operationType == "view") {
            let result;
            if (fieldId) {
              result = await Skill.find(
                { skillId: fieldId },
                {
                  _id: 0,
                  skillId: 1,
                  skillValue: 1,
                }
              );
            } else {
              result = await Skill.find(
                {},
                {
                  _id: 0,
                  skillId: 1,
                  skillValue: 1,
                }
              );
            }
            if (!result) throw Error("Not able to fetch field");
            return { status: "Success", data: result };
          }
    } catch (error) {
        return {status:'Failed',message:error.message};
    }
    
}