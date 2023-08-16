const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');

exports.signup = async (req, res) => {
    const { body: { email, password, displayName, lat, lon } } = req;

    try {
        const user = await User.findOne({ email });
        if (user) throw Error("Email already exists");

        const locationData = {
            type: "Point",
            coordinates: [Number(lon), Number(lat)],
        };

        const newUser = new User({
            userId: uuidv4(),
            password,
            email,
            displayName,
            location: locationData,
        });
        const result = await newUser.save();
        if (!result) throw Error("Error creating user!");

        res.send({ status: "Success!", message: "User Created!", result });
    } catch (e) {
        return res.send({ status: "Failed!", message: e.message });
    }
};

exports.listClose = async (req, res) => {
    const { body: { radius, lat, lon } } = req

    const distanceMeters = Number(radius) * 1609
    const distanceMultiplier = 0.000621371

    const geoNear = {
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [Number(lon), Number(lat)],
            },
            maxDistance: distanceMeters,
            spherical: true,
            distanceField: "distance",
            distanceMultiplier: distanceMultiplier,
        },
    }

    try {
        const users = await User.aggregate([
            geoNear,
            {
                $project: { _id: 0, email: 1, distance: 1 }
            },
            {
                $sort: { distance: 1 }
            }
        ])

        res.send({ status: "Success!", data: users })
    } catch (error) {
        return res.send({ status: "Failed!", message: error.message });
    }
}
