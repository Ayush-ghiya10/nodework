const User = require("../models/user");


exports.signup = async (req, res) => {
  let {
    body: { email, displayName, lat, lon },
  } = req;

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("Email already exists");

    const locationData = {
      type: "Point",
      coordinates: [Number(lon), Number(lat)],
    };

    const newUser = new User({
      email,
      displayName,
      location: locationData,
    });
    const result = await newUser.save();
    if (!result) throw Error("Could not create user.");
    // send a welcome email

    return res.json({ status: "success", message: "user created", result });
  } catch (e) {
    return res
      .status(403)
      .send({ status: "failed", message: e.message, error: e });
  }
};

exports.list = async (req, res) => {
  const result = await User.aggregate([
    {
      $match: { email: "aesha@star.com" },
    },
    {
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "createdBy",
        pipeline: [
          {
            $match: {
              projectId: { $in: ["6", "10"] },
            },
          },
          {
            $project: {
              _id: 0,
              projectId: 1,
              title: 1,
            },
          },
        ],
        as: "projects",
      },
    },
    {
      $project: {
        displayName: 1,
        email: 1,
        projects: 1,
      },
    },
  ]);
  res.json(result);
};

exports.listCloseOnes = async (req, res) => {
  const milesRadius = Number(req.body.milesRadius);
  const lat = req.body.lat;
  const lon = req.body.lon;
  const distanceMeters = Number(milesRadius) * 1609; // convert miles into meters
  const distanceMultiplier = 0.000621371; // Distance will be return as miles
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
  };

  console.log(JSON.stringify(geoNear));
  const users = await User.aggregate([
    geoNear,
    {
      $project: {
        _id: 0,
        userId: 1,
        displayName: 1,
        distance: 1,
      },
    },
    {
      $sort: {
        distance: 1,
      },
    },
  ]);
  // console.log(users);
  res.json(users);
};