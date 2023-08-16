const ProjectType = require('../models/lookupModels/projectType');
module.exports=async(fieldValue,operationType,fieldId)=>{
    try {
        if(operationType == 'create'){
            const existField = await ProjectType.findOne({projectTypeValue :fieldValue.toLowerCase()});
            console.log(existField);
            if(existField) throw Error('Field is already created');
            const newProjectType = new ProjectType({
                projectTypeValue: fieldValue
            })
            const result = await newProjectType.save();
            if(!result) throw Error('Not able to create field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'update'){
            const result = await ProjectType.findOneAndUpdate({projectTypeId:fieldId},{projectTypeValue:fieldValue.toLowerCase()});
            if(!result) throw Error('Not able to update field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'delete'){
            const result = await ProjectType.findOneAndDelete({projectTypeId:fieldId});
            if(!result) throw Error('Not able to delete field');
            return {status:'Success',data:result}
        }
        else if (operationType == "view") {
            let result;
            if (fieldId) {
              result = await ProjectType.find(
                { projectTypeId: fieldId },
                {
                  _id: 0,
                  projectTypeId: 1,
                  projectTypeValue: 1,
                }
              );
            } else {
              result = await ProjectType.find(
                {},
                {
                  _id: 0,
                  projectTypeId: 1,
                  projectTypeValue: 1,
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
