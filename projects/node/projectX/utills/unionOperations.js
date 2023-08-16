const Union = require('../models/lookupModels/union');
module.exports=async(fieldValue,operationType,fieldId)=>{
    try {
        if(operationType == 'create'){
            const existField = await Union.findOne({unionValue :fieldValue.toLowerCase()});
            console.log(existField);
            if(existField) throw Error('Field is already created');
            const newUnion = new Union({
                unionValue: fieldValue
            })
            const result = await newUnion.save();
            if(!result) throw Error('Not able to create field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'update'){
            const result = await Union.findOneAndUpdate({unionId:fieldId},{unionValue:fieldValue.toLowerCase()});
            if(!result) throw Error('Not able to update field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'delete'){
            const result = await Union.findOneAndDelete({unionId:fieldId});
            if(!result) throw Error('Not able to delete field');
            return {status:'Success',data:result}
        }
        else if (operationType == "view") {
            let result;
            if (fieldId) {
              result = await Union.find(
                { unionId: fieldId },
                {
                  _id: 0,
                  unionId: 1,
                  unionValue: 1,
                }
              );
            } else {
              result = await Union.find(
                {},
                {
                  _id: 0,
                  unionId: 1,
                  unionValue: 1,
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