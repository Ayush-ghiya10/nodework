const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {v4:uuidv4} = require('uuid');
const projectSchema = Schema(
  {
    projectId: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
      ref: "User",
    },
    projectName: {
      type: String,
      required: true,
    },
    internalProjectName: {
      type: String,
    },
    projectType: {
      type: String,
      required: true,
    },
    union: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
    },
    showContactInfoToTalent: {
      type: Boolean,
      required: true,
      default: false,
    },
    showNetworkToTalent: {
      type: Boolean,
      required: true,
      default: true,
    },
    showCastingAssociateToTalent: {
      type: Boolean,
      required: true,
      default: true,
    },
    showCastingAssistantToTalent: {
      type: Boolean,
      required: true,
      default: true,
    },
    showContactNumberToTalent: {
      type: Boolean,
      required: true,
      default: true,
    },
    showContactEmailToTalent: {
      type: Boolean,
      required: true,
      default: true,
    },
    cdNameContactInfo: {
      type: String,
      required: true,
    },
    castingAssociateContactInfo: {
      type: String,
      required: true,
    },
    castingAssistantContactInfo: {
      type: String,
      required: true,
    },
    castingPhoneNumberContactInfo: {
      type: String,
      required: true,
    },
    castingEmailContactInfo: {
      type: String,
      required: true,
    },
    networkCreativeTeam: {
      type: String,
      required: true,
    },
    castingAssociateCreativeTeam: {
      type: String,
      required: true,
    },
    castingAssistantCreativeTeam: {
      type: String,
      required: true,
    },
    contactPhoneNumberCreativeTeam: {
      type: String,
      required: true,
    },
    contactEmailCreativeTeam: {
      type: String,
      required: true,
    },
    showWorkInfoToTalent: {
        type:Boolean,
        required:true,
        default:true
    },
    showAuditionInfoToTalent: {
        type:Boolean,
        required:true,
        default:true
    },
    workRequirements: {
        type:String,
    },
    projectSynopsis: {
      type: String,
    },
    projectAdditionalDetails: {
      type: String,
    },
    additionalFileLink: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Project',projectSchema);