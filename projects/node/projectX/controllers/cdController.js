const { v4: uuidv4 } = require("uuid");
const converToIndividualDates = require("../utills/convertToIndividualDates");
const locationMappingController = require("./mapping/locationMapping");
const dateMappingController = require("./mapping/dateMapping");
const ethnicityMappingController = require("./mapping/ethnicity");
const genderMappingController = require("./mapping/gender");
const photoMappingController = require("./mapping/photoMapping");
const skillsMappingController = require("./mapping/skill");
const Project = require("../models/mainModels/project");
const Role = require("../models/mainModels/role");
const LocationMap = require("../models/mappingModels/locationMap");
const DateMap = require("../models/mappingModels/dateMap");
const GenderMap = require("../models/mappingModels/genderMap");
const EthnicityMap = require("../models/mappingModels/ethnicityMap");
const deleteFileFromS3 = require("../utills/deleteFileFromS3");
const SkillMap = require("../models/mappingModels/skillMap");
const Photo = require("../models/mappingModels/photos");

exports.createProject = async (req, res) => {
  const {
    payload: { email, userId },
    file,
  } = req;
  const {
    projectName,
    internalProjectName,
    projectType,
    union,
    projectDescription,
    showContactInfoToTalent,
    showNetworkToTalent,
    showCastingAssociateToTalent,
    showCastingAssistantToTalent,
    showContactNumberToTalent,
    showContactEmailToTalent,
    cdNameContactInfo,
    castingAssociateContactInfo,
    castingAssistantContactInfo,
    castingPhoneNumberContactInfo,
    castingEmailContactInfo,
    networkCreativeTeam,
    castingAssociateCreativeTeam,
    castingAssistantCreativeTeam,
    contactPhoneNumberCreativeTeam,
    contactEmailCreativeTeam,
    showWorkInfoToTalent,
    showAuditionInfoToTalent,
    workRequirements,
    projectSynopsis,
    projectAdditionalDetails,
    additionalFileLink,
    isPublished,
    isActive,
    auditionLocations,
    workLocations,
    auditionFromDate,
    auditionToDate,
    auditionDate,
    workFromDate,
    workToDate,
    workDate,
  } = JSON.parse(req.body.json);

  try {
    const existProject = await Project.findOne({ projectName });
    if (existProject && existProject.createdBy == userId)
      throw Error("Project already exist");
    const projectId = uuidv4();
    const newProject = new Project({
      projectId: projectId,
      createdBy: userId,
      projectName,
      projectType,
      union,
      internalProjectName,
      projectDescription,
      showContactInfoToTalent,
      showNetworkToTalent,
      showCastingAssociateToTalent,
      showCastingAssistantToTalent,
      showContactNumberToTalent,
      showContactEmailToTalent,
      cdNameContactInfo,
      castingAssociateContactInfo,
      castingAssistantContactInfo,
      castingPhoneNumberContactInfo,
      castingEmailContactInfo,
      networkCreativeTeam,
      castingAssociateCreativeTeam,
      castingAssistantCreativeTeam,
      contactPhoneNumberCreativeTeam,
      contactEmailCreativeTeam,
      showAuditionInfoToTalent,
      showWorkInfoToTalent,
      workRequirements,
      projectSynopsis,
      projectAdditionalDetails,
      isPublished,
      additionalFileLink: file.location,
      isActive,
    });
    for (let i = 0; i < auditionLocations.length; i++) {
      if (
        !(await locationMappingController.add(
          projectId,
          auditionLocations[i],
          "audition"
        ))
      )
        throw Error("Error adding locations!");
    }

    for (let i = 0; i < workLocations.length; i++) {
      if (
        !(await locationMappingController.add(
          projectId,
          workLocations[i],
          "work"
        ))
      )
        throw Error("Error adding locations!");
    }

    let auditionIndividualDates = [];
    if (auditionDate !== undefined) auditionIndividualDates.push(auditionDate);
    auditionIndividualDates = [
      ...converToIndividualDates(
        new Date(auditionFromDate),
        new Date(auditionToDate)
      ),
    ];
    for (let i = 0; i < auditionIndividualDates.length; i++) {
      const result = await dateMappingController.add(
        auditionIndividualDates[i].toISOString(),
        projectId,
        "audition"
      );
      if (!result) throw Error("Error adding dates!");
    }

    let workIndividualDates = [];
    if (workDate !== undefined) workDate.push(workDate);
    workIndividualDates = [
      ...converToIndividualDates(new Date(workFromDate), new Date(workToDate)),
    ];
    for (let i = 0; i < workIndividualDates.length; i++) {
      const result = await dateMappingController.add(
        workIndividualDates[i].toISOString(),
        projectId,
        "work"
      );

      if (!result) throw Error("Error adding dates!");
    }
    await newProject.save();
    res.status(201).send({ status: "Success!", message: "Project created!" });
  } catch (error) {
    res.status(401).send({ status: "Failed!", message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const {
    payload: { email, userId },
    body: { projectId },
  } = req;
  try {
    const existProject = await Project.findOne({
      projectId,
      createdBy: userId,
    });
    if (!existProject) throw Error("Project does not exist");
    await deleteFileFromS3(existProject.additionalFileLink);
    const projectRoles = await Role.find(
      { projectId },
      { _id: 0, roleId: 1, slidesUrl: 1 }
    );
    const role_ids = [];
    projectRoles.map(async (obj) => {
      role_ids.push(obj.roleId);
      await deleteFileFromS3(obj.slidesUrl);
    });
    await LocationMap.deleteMany({
      entityid: { $in: [projectId, ...role_ids] },
    });
    await DateMap.deleteMany({ entityid: { $in: [projectId, ...role_ids] } });
    await GenderMap.deleteMany({ entityid: { $in: [...role_ids] } });
    await EthnicityMap.deleteMany({ entityid: { $in: [...role_ids] } });
    await SkillMap.deleteMany({ entityid: { $in: [...role_ids] } });
    const photosObject = await Photo.find(
      { entityid: { $in: [projectId, ...role_ids] } },
      { _id: 0, url: 1 }
    );
    await Photo.deleteMany({ entityid: { $in: [projectId, ...role_ids] } });
    photosObject.map(async (obj) => {
      await deleteFileFromS3(obj.url);
    });
    await Role.deleteMany({ projectId });
    const deletedProject = await Project.findOneAndDelete({ projectId });
    res.status(201).send({
      status: "Success!",
      message: "Project Deleted!",
      deletedProject,
    });
  } catch (error) {
    res.status(401).send({ status: "Failed!", message: error.message });
  }
};

exports.createRole = async (req, res) => {
  const {
    projectId,
    roleName,
    roleType,
    internalRoleName,
    intendToPublishRole,
    releaseRoleToBillbord,
    payingRole,
    roleRate,
    roleAgeInYear,
    roleAgeFrom,
    roleAgeTo,
    roleGenderSpecified,
    roleEthnicAppearanceSpecified,
    roleEthnicity,
    TalentsRequired,
    roleDescription,
    involveSexualSituations,
    involveNudity,
    showAuditionLocationToTalent,
    AuditionNotes,
    showWorkLocation,
    workRequirements,
    submissionDueBy,
    submissionNote,
    askPhoto,
    askVideo,
    askAudio,
    roleLocations,
    auditionLocations,
    workLocations,
    auditionFromDate,
    auditionToDate,
    auditionDate,
    workFromDate,
    workToDate,
    workDate,
    ethnicity,
    gender,
    skills,
  } = JSON.parse(req.body.json);
  const {
    files: { file, photos },
    payload: { email, userId },
  } = req;
  const location = file[0].location;

  const roleId = uuidv4();
  try {
    const newRole = new Role({
      roleId,
      projectId,
      roleName,
      roleType,
      internalRoleName,
      intendToPublishRole,
      releaseRoleToBillbord,
      payingRole,
      roleRate,
      roleAgeInYear,
      roleAgeFrom,
      roleAgeTo,
      roleGenderSpecified,
      roleEthnicAppearanceSpecified,
      roleEthnicity,
      TalentsRequired,
      roleDescription,
      involveSexualSituations,
      involveNudity,
      showAuditionLocationToTalent,
      AuditionNotes,
      showWorkLocation,
      workRequirements,
      submissionDueBy,
      submissionNote,
      askPhoto,
      askVideo,
      askAudio,
      slidesUrl: location,
    });
    const existProject = await Project.findOne({ projectId });
    if (!existProject) throw Error("Project does not exist");
    if (existProject.createdBy != userId)
      throw Error("Project does not belongs to this user");
    if (roleLocations) {
      for (let index = 0; index < roleLocations.length; index++) {
        if (
          !(await locationMappingController.add(
            roleId,
            roleLocations[index],
            "role"
          ))
        )
          throw Error("Error adding locations!");
      }
    }

    if (auditionLocations) {
      for (let index = 0; index < auditionLocations.length; index++) {
        if (
          !(await locationMappingController.add(
            roleId,
            auditionLocations[index],
            "audition"
          ))
        )
          throw Error("Error adding locations!");
      }
    }
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        if (!(await photoMappingController.add(roleId, photos[i].location)))
          throw Error("Error adding photos!");
      }
    }
    if (workLocations) {
      for (let index = 0; index < workLocations.length; index++) {
        if (
          !(await locationMappingController.add(
            roleId,
            workLocations[index],
            "work"
          ))
        )
          throw Error("Error adding locations!");
      }
    }

    if (ethnicity) {
      for (let index = 0; index < ethnicity.length; index++) {
        if (!(await ethnicityMappingController.add(roleId, ethnicity[index])))
          throw Error("Error adding ethnicity!");
      }
    }

    if (gender) {
      for (let index = 0; index < gender.length; index++) {
        if (!(await genderMappingController.add(roleId, gender[index])))
          throw Error("Error adding gender!");
      }
    }
    if (skills) {
      for (let index = 0; index < skills.length; index++) {
        if (!(await skillsMappingController.add(roleId, skills[index])))
          throw Error("Error adding skills!");
      }
    }

    let auditionIndividualDates = [];
    if (auditionDate !== undefined) auditionIndividualDates.push(auditionDate);
    auditionIndividualDates = [
      ...converToIndividualDates(
        new Date(auditionFromDate),
        new Date(auditionToDate)
      ),
    ];
    for (let index = 0; index < auditionIndividualDates.length; index++) {
      const result = await dateMappingController.add(
        auditionIndividualDates[index].toISOString(),
        roleId,
        "audition"
      );
      if (!result) throw Error("Error adding dates!");
    }

    let workIndividualDates = [];
    if (workDate !== undefined) workDate.push(workDate);
    workIndividualDates = [
      ...converToIndividualDates(new Date(workFromDate), new Date(workToDate)),
    ];
    for (let index = 0; index < workIndividualDates.length; index++) {
      const result = await dateMappingController.add(
        workIndividualDates[index].toISOString(),
        roleId,
        "work"
      );
      if (!result) throw Error("Error adding dates!");
    }
    await newRole.save();
    res.send({ status: "Success!", message: "Role created!" });
  } catch (error) {
    res.send({ status: "Failed!", message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  const {
    payload: { email, userId },
    body: { roleId, projectId },
  } = req;

  try {
    let deletedRoles;
    if (roleId) {
      const existRole = await Role.findOne({ roleId });
      if (!existRole) throw Error("Role does not exist");
      const parentProject = await Project.find({
        projectId: existRole.projectId,
      });
      if (parentProject.createdBy !== userId)
        throw Error("Role does not belongs to this CD");
      await deleteFileFromS3(existRole.slidesUrl);
      await DateMap.deleteMany({ entityid: roleId });
      await GenderMap.deleteMany({ entityid: roleId });
      await EthnicityMap.deleteMany({ entityid: roleId });
      await SkillMap.deleteMany({ entityid: roleId });
      const photosObject = await Photo.find(
        { entityid: roleId },
        { _id: 0, url: 1 }
      );
      await Photo.deleteMany({ entityid: roleId });
      photosObject.map(async (obj) => {
        await deleteFileFromS3(obj.url);
      });
      deletedRoles = await Role.findOneAndDelete({ projectId });
    } else if (projectId) {
      const existProject = await Project.findOne({
        projectId,
        createdBy: userId,
      });
      if (!existProject) throw Error("Project does not exist");
      const projectRoles = await Role.find(
        { projectId },
        { _id: 0, roleId: 1, slidesUrl: 1 }
      );
      const role_ids = [];
      projectRoles.map(async (obj) => {
        role_ids.push(obj.roleId);
        await deleteFileFromS3(obj.slidesUrl);
      });
      await DateMap.deleteMany({ entityid: { $in: role_ids } });
      await GenderMap.deleteMany({ entityid: { $in: role_ids } });
      await EthnicityMap.deleteMany({ entityid: { $in: role_ids } });
      await SkillMap.deleteMany({ entityid: { $in: role_ids } });
      const photosObject = await Photo.find(
        { entityid: { $in: role_ids } },
        { _id: 0, url: 1 }
      );
      await Photo.deleteMany({ entityid: { $in: role_ids } });
      photosObject.map(async (obj) => {
        await deleteFileFromS3(obj.url);
      });
      deletedRoles = await Role.deleteMany({ projectId });
    } else {
      res.status(401).send({
        status: "Failed!",
        message: "RoleId or ProjectId is required",
      });
    }

    res.status(201).send({
      status: "Success!",
      message: "Role Deleted!",
      deletedRoles,
    });
  } catch (error) {
    res.status(401).send({ status: "Failed!", message: error.message });
  }
};

exports.viewProject = async (req, res) => {
  const {
    payload: { email, userId },
    query: { detailed, projectId },
  } = req;
  try {
    const existProject = await Project.find({
      createdBy: userId,
    });
    if (existProject == []) throw Error("No project has been created");
    let projects;
    if (detailed) {
      // projects = await Project.aggregate([
      //   {
      //     $match: {
      //       createdBy: userId,
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       createdBy: 1,
      //       projectName: 1,
      //       internalProjectName: 1,
      //       projectType: 1,
      //       union: 1,
      //       projectDescription: 1,
      //       cdNameContactInfo: 1,
      //       castingAssociateContactInfo: 1,
      //       castingAssistantContactInfo: 1,
      //       castingPhoneNumberContactInfo: 1,
      //       castingEmailContactInfo: 1,
      //       networkCreativeTeam: 1,
      //       castingAssociateCreativeTeam: 1,
      //       castingAssistantCreativeTeam: 1,
      //       contactPhoneNumberCreativeTeam: 1,
      //       contactEmailCreativeTeam: 1,
      //       workRequirements: 1,
      //       projectSynopsis: 1,
      //       projectAdditionalDetails: 1,
      //       additionalFileLink: 1,
      //       isPublished: 1,
      //       isActive: 1,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "projecttypes",
      //       localField: "projectType",
      //       foreignField: "projectTypeId",
      //       as: "projectType",
      //       pipeline: [
      //         {
      //           $project: {
      //             _id: 0,
      //             projectTypeValue: 1,
      //             projectTypeId: 1,
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "unions",
      //       localField: "union",
      //       foreignField: "unionId",
      //       as: "union",
      //       pipeline: [
      //         {
      //           $project: {
      //             _id: 0,
      //             unionValue: 1,
      //             unionId: 1,
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$projectName",
      //       creativeTeam: {
      //         $push: {
      //           networkCreativeTeam:'$networkCreativeTeam',
      //           castingAssociateCreativeTeam:'$castingAssociateCreativeTeam',
      //           castingAssistantCreativeTeam:'$castingAssistantCreativeTeam',
      //           contactPhoneNumberCreativeTeam:'$contactPhoneNumberCreativeTeam',
      //           contactEmailCreativeTeam:'$contactEmailCreativeTeam',
      //         },
      //       },
      //     },
      //   },
      // ]);
      projects = await Project.aggregate([
        {
          $match: {
            createdBy: userId,
          },
        },
        {
          $lookup: {
            from: "locationmaps",
            localField: "projectId",
            foreignField: "entityid",
            as: "locations",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  entityid: 1,
                  locationId: 1,
                  entityType: 1,
                },
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "locationId",
                  foreignField: "locationId",
                  as: "locationNames",
                  pipeline: [
                    {
                      $project: {
                        _id: 0,
                        locationValue: 1,
                      },
                    },
                  ],
                },
              },
              {
                $project: {
                  entityType: 1,
                  "locationNames.locationValue": 1,
                },
              },
              {
                $group: {
                  _id: "$entityType",
                  locations: {
                    $push: "$locationNames.locationValue",
                  },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "datemaps",
            localField: "projectId",
            foreignField: "entityid",
            as: "projectAuditionDates",
            pipeline: [
              {
                $match: {
                  entityType: "audition",
                },
              },
              {
                $group: {
                  _id: "$entityType",
                  firstDate: { $min: "$individualDate" },
                  lastDate: { $max: "$individualDate" },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "datemaps",
            localField: "projectId",
            foreignField: "entityid",
            as: "projectWorkDates",
            pipeline: [
              {
                $match: {
                  entityType: "work",
                },
              },
              {
                  $group: {
                      _id: "$entityType",
                      firstDate: { $min: "$individualDate" },
                      lastDate: { $max: "$individualDate" },
                  },
              },
            ],
          },
        },
      ]);
    } else {
      projects = await Project.aggregate([
        {
          $match: {
            createdBy: userId,
          },
        },
        {
          $project: {
            _id: 0,
            projectName: 1,
            internalProjectName: 1,
            projectDescription: 1,
            union: 1,
            projectType: 1,
          },
        },
        {
          $lookup: {
            from: "projecttypes",
            localField: "projectType",
            foreignField: "projectTypeId",
            as: "projectType",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  projectTypeValue: 1,
                  projectTypeId: 1,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "unions",
            localField: "union",
            foreignField: "unionId",
            as: "union",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  unionValue: 1,
                  unionId: 1,
                },
              },
            ],
          },
        },
      ]);
    }
    res.status(200).send({ status: "Success", data: projects });
  } catch (error) {
    res.status(403).send({ status: "Failed", error: error.message });
  }
};
