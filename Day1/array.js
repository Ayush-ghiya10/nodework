

const hobbies = ["Dancing", "Singing", "Eating"];
hobbies.push("Playing");
// console.log(hobbies);


// const myHobbies = hobbies;
// myHobbies.push("Reading");
// console.log(myHobbies);
// console.log(hobbies);

const myHobbies = hobbies.slice();
myHobbies.push("Reading");
console.log(myHobbies);
console.log(hobbies);

console.log("==============");

// spread operator for array
const baseHobbies = ["Dancing", "Singing", "Eating"];
const rajHobbies = [...baseHobbies, 'fooseballing'];
console.log(baseHobbies)
console.log(rajHobbies)


// Distructuring operator for array
const cars = ["Ford", "Mercedez", "TATA", "KIA"];
const [,mercedez,,kia] = cars;
console.log(mercedez, kia);

