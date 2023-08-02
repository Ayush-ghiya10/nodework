const heroes = ["Ironman","Captain America","Thor"];
const villains = ["Thanos","Ultron","Kang"];


//First way to merge using spread operator
// const characters = [...heroes,...villains];

//Second way to merge using concat
const characters = heroes.concat(villains);

//Third way to merge using array.push method

heroes.push(...villains);