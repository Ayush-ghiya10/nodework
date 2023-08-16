const Ethnicity = require("../models/lookupModels/ethnicity");
module.exports = async (fieldValue, operationType, fieldId) => {
  try {
    if (operationType == "create") {
      const existField = await Ethnicity.findOne({
        ethnicityValue: fieldValue.toLowerCase(),
      });
      console.log(existField);
      if (existField) throw Error("Field is already created");
      const newEthnicity = new Ethnicity({
        ethnicityValue: fieldValue,
      });
      const result = await newEthnicity.save();
      if (!result) throw Error("Not able to create field");
      return { status: "Success", data: result };
    } else if (operationType == "update") {
      const result = await Ethnicity.findOneAndUpdate(
        { ethnicityId: fieldId },
        { ethnicityValue: fieldValue.toLowerCase() }
      );
      if (!result) throw Error("Not able to update field");
      return { status: "Success", data: result };
    } else if (operationType == "delete") {
      const result = await Ethnicity.findOneAndDelete({ ethnicityId: fieldId });
      if (!result) throw Error("Not able to delete field");
      return { status: "Success", data: result };
    } else if (operationType == "view") {
      let result;
      if (fieldId) {
        result = await Ethnicity.find(
          { ethnicityId: fieldId },
          {
            _id: 0,
            ethnicityId: 1,
            ethnicityValue: 1,
          }
        );
      } else {
        result = await Ethnicity.find(
          {},
          {
            _id: 0,
            ethnicityId: 1,
            ethnicityValue: 1,
          }
        );
      }
      if (!result) throw Error("Not able to fetch field");
      return { status: "Success", data: result };
    }
  } catch (error) {
    return { status: "Failed", message: error.message };
  }
};
