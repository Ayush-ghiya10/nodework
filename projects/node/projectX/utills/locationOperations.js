const Location = require('../models/lookupModels/location');
module.exports=async(fieldValue,operationType,fieldId)=>{
    try {
        if(operationType == 'create'){
            const existField = await Location.findOne({locationValue :fieldValue.toLowerCase()});
            console.log(existField);
            if(existField) throw Error('Field is already created');
            const newLocation = new Location({
                locationValue: fieldValue
            })
            const result = await newLocation.save();
            if(!result) throw Error('Not able to create field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'update'){
            const result = await Location.findOneAndUpdate({locationId:fieldId},{locationValue:fieldValue.toLowerCase()});
            if(!result) throw Error('Not able to update field');
            return {status:'Success',data:result}
        }
        else if(operationType == 'delete'){
            const result = await Location.findOneAndDelete({locationId:fieldId});
            if(!result) throw Error('Not able to delete field');
            return {status:'Success',data:result}
        }
        else if (operationType == "view") {
            let result;
            if (fieldId) {
              result = await Location.find(
                { locationId: fieldId },
                {
                  _id: 0,
                  locationId: 1,
                  locationValue: 1,
                }
              );
            } else {
              result = await Location.find(
                {},
                {
                  _id: 0,
                  locationId: 1,
                  locationValue: 1,
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