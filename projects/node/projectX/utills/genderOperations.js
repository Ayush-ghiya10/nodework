const Gender = require('../models/lookupModels/gender');
module.exports=async(fieldValue,operationType,fieldId)=>{
    try {
        if(operationType == 'create'){
            const existField = await Gender.findOne({genderValue :fieldValue.toLowerCase()});
            console.log(existField);
            if(existField) throw Error('Field is already created');
            const newGender = new Gender({
                genderValue: fieldValue
            })
            const result = await newGender.save();
            if(!result) throw Error('Not able to create field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'update'){
            const result = await Gender.findOneAndUpdate({genderId:fieldId},{genderValue:fieldValue.toLowerCase()});
            if(!result) throw Error('Not able to update field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'delete'){
            const result = await Gender.findOneAndDelete({genderId:fieldId});
            if(!result) throw Error('Not able to delete field');
            return {status:'Success',data:result}
        }
        else if (operationType == "view") {
            let result;
            if (fieldId) {
              result = await Gender.find(
                { genderId: fieldId },
                {
                  _id: 0,
                  genderId: 1,
                  genderValue: 1,
                }
              );
            } else {
              result = await Gender.find(
                {},
                {
                  _id: 0,
                  genderId: 1,
                  genderValue: 1,
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