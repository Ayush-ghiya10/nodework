const fs = require("fs");
const path = require("path");
const pathToData = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "projects.json"
);

const getProjectsFromFile = (cb) => {
  fs.readFile(pathToData, (err, fileContent) => {
    if (err) cb([]);
    else cb(JSON.parse(fileContent));
  });
};

const updateProjectFromFile =(id,title,description,cb)=>{
  getProjectsFromFile((data) => {
    let objectIndex = data.findIndex((element) => element.id === id);
    if (objectIndex == -1) {return cb(false)};
    
    if (title) data[objectIndex].title = title;
    if (description) data[objectIndex].description = description;
    fs.writeFile(pathToData, JSON.stringify(data), (err) => {
      if (err) cb(false);
      else cb(data[objectIndex]);
    });
  });
}

const deleteProjectFromFile = (id,cb)=>{
  getProjectsFromFile((data)=>{
    let objectIndex = data.findIndex(element=>element.id === id);
    let deletedObject = data[objectIndex];
    if(objectIndex == -1) return cb(false);
    data = data.filter(element=>element.id !== id);
    fs.writeFile(pathToData, JSON.stringify(data), (err) => {
      if (err) cb(false);
      else cb(deletedObject);
    });
  })
}

module.exports = class Project {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
  save(cb) {
    getProjectsFromFile((data) => {
      data.push(this);
      fs.writeFile(pathToData, JSON.stringify(data), (err) => {
        if (err) cb(false);
        else cb(this);
      });
    });
  }
  static update(id,title,description,cb){
    updateProjectFromFile(id,title,description,cb);
  }

  static delete(id,cb){
    deleteProjectFromFile(id,cb);
  }

  static fetchAll(cb) {
    getProjectsFromFile(cb);
  }
};
