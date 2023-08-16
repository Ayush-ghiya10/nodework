const mongoose = require("mongoose");
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    displayName: { type: String },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});

module.exports = mongoose.model("User", userSchema);

/*

let geoNear = null;

  if (lat && lat != "" && lon && lon != "") {
    const distanceMeters = Number(milesRadius) * 1609; // convert miles into meters
    const distanceMultiplier = 0.000621371; // Distance will be return as miles

    geoNear = {
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
  }


  db.paging.aggregate([
    { "$geoNear": {
        "near": [106.606033,29.575897 ],
        "spherical": true,
        "distanceField": "distance",
        "distanceMuliplier": 6371,
        "maxDistance": 1/6371
    }},
    { "$sort": { "distance": 1, "createdate": -1 } },
    { "$skip": ( 2-1 ) * 2 },
    { "$limit": 5 }
])


*/