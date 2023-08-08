const User = require('../models/user');
exports.register = async(req,res)=>{
    const {
        body: { email, password, displayName },
      } = req;
    
      try {
        const existUser = await User.findOne({ email });
        if (existUser) throw Error("Email already exist");
        const newUser = new User({ email, password,displayName });
        const result = await newUser.save();
        if (!result) throw Error("Cannot create user");
        res.status(201).send({ msg: "User created " });
      } catch (error) {
        res.status(500).send({ msg: "Error ", error: error.message });
      }

}