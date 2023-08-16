const RoleType = require('../models/lookupModels/roleType');
module.exports=async(fieldValue,operationType,fieldId)=>{
    try {
        if(operationType == 'create'){
            const existField = await RoleType.findOne({roleTypeValue :fieldValue.toLowerCase()});
            console.log(existField);
            if(existField) throw Error('Field is already created');
            const newRoleType = new RoleType({
                roleTypeValue: fieldValue
            })
            const result = await newRoleType.save();
            if(!result) throw Error('Not able to create field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'update'){
            const result = await RoleType.findOneAndUpdate({roleTypeId:fieldId},{roleTypeValue:fieldValue.toLowerCase()});
            if(!result) throw Error('Not able to update field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'delete'){
            const result = await RoleType.findOneAndDelete({roleTypeId:fieldId});
            if(!result) throw Error('Not able to delete field');
            return {status:'Success',data:result}
        }
        else if (operationType == "view") {
            let result;
            if (fieldId) {
              result = await RoleType.find(
                { roleTypeId: fieldId },
                {
                  _id: 0,
                  roleTypeId: 1,
                  roleTypeValue: 1,
                }
              );
            } else {
              result = await RoleType.find(
                {},
                {
                  _id: 0,
                  roleTypeId: 1,
                  roleTypeValue: 1,
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