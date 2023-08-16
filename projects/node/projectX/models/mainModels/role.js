const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleSchema = Schema(
  {
    roleId: {
      type: String,
    },
    projectId: {
      type: String,
      ref: "Project",
    },
    roleName: {
      type: String,
      required: true,
    },
    internalRoleName: {
      type: String,
    },
    roleType: {
      type: String,
      ref: "RoleType",
    },
    intendToPublishRole: {
      type: Boolean,
      required: true,
      default: true,
    },
    releaseRoleToBillbord: {
      type: Boolean,
      required: true,
      default: true,
    },
    payingRole: {
      type: Boolean,
      required: true,
      default: true,
    },
    roleRate: {
      type: String,
    },
    roleAgeInYear: {
      type: Boolean,
      required: true,
      default: true,
    },
    roleAgeFrom: {
      type: Number,
      required: true,
    },
    roleAgeTo: {
      type: Number,
      required: true,
    },
    roleGenderSpecified: {
      type: Boolean,
      required: true,
      default: false,
    },
    roleEthnicAppearanceSpecified: {
      type: Boolean,
      required: true,
      default: false,
    },
    roleEthnicity: {
      type: String,
    },
    TalentsRequired: {
      type: Number,
      required: true,
    },
    roleDescription: {
      type: String,
      required: true,
    },

    slidesUrl: {
      type: String,
    },
    involveSexualSituations: {
      type: Boolean,
      required: true,
      default: false,
    },
    involveNudity: {
      type: Boolean,
      required: true,
      default: false,
    },
    showAuditionLocationToTalent: {
      type: Boolean,
      required: true,
      default: true,
    },
    AuditionNotes: {
      type: String,
    },
    showWorkLocation: {
      type: Boolean,
      required: true,
      default: false,
    },
    workRequirements: {
      type: String,
    },
    submissionDueBy: {
      type: Date,
      required: true,
    },
    submissionNote: {
      type: String,
    },
    askPhoto: {
      type: Boolean,
      default: false,
    },
    askVideo: {
      type: Boolean,
      default: false,
    },
    askAudio: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Role',roleSchema);
