const Photo = require('../../models/mappingModels/photos');
const {v4:uuidv4} = require('uuid');
exports.add = async(entityid,url)=>{
    try {
        const newPhoto =  new Photo({
            photoId:uuidv4(),
            entityid,
            url,
        
        });
        await newPhoto.save();
        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
}