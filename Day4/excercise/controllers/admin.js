const User = require('../models/user');
exports.createCD = async (req, res) => {
  const {
    body: { email, password, about, age },
    payload: { userType }
  } = req;
  try {
    if (userType != "admin") {
      const err = new Error("Not Authenticated");
      err.statusCode = 401;
      throw err;
    }
    const existUser = await User.findOne({ email });
    if (existUser) throw Error("Email already exist");
    const newUser = new User({ email, password, about, age, userType: "cd" });
    const result = await newUser.save();
    if (!result) throw Error("Cannot create user");
    delete(result.password);
    res.status(201).send({ msg: "CD created ", data: result });
  } catch (error) {
    res.status(500).send({ msg: "Error ", error: error.message });
  }
};
