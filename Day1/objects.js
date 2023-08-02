
const person = {
    name: "Raj",
    place: "Surat",
    height: 150,
    weight: 50,
    // NOT A VALID SYNTAX
    // bmi: () => {
    //     return this.weight * this.height;
    // }
    bmi() {
        return this.weight * this.height;
    }
}


console.log(person);
console.log(person.name);
console.log(person.bmi())

const calcBmi = person.bmi;
console.log(calcBmi()); // NaN because calcBmi will not have access to height & weight



// spread operator for object
const buttonStyle = {
    color: 'red',
    fontSize: 23
}
const greenButton = {...buttonStyle, color: "green"}
console.log(buttonStyle)
console.log(greenButton)

console.log("------------- 1")

// Rest Operator

function sum(a,b,c,d){
    return a+b+c+d;
}
console.log(sum(1,1,1,1));
console.log(sum(1,1,1,1,1,1,1,1)); // NOTE: this will not give error

function sum2(...args){
    return args.reduce((total, curr)=>total+curr, 0);
}
console.log(sum2(1,1,1,1,1,1,1,1,1));
console.log(sum2(1,1,1,1,"1",1,1,1,1));

console.log("------------- 2")


// Destructuring
// const printAbout = (name, age) => {
//     console.log(`name is ${name} and age is ${age}`);
// }

// const student = {
//     name: "Raj",
//     age: 21,
// }

// printAbout(student.name, student.age);


const printAbout = ({name, age}) => {
    console.log(`name is ${name} and age is ${age}`);
}

const student = {
    name: "Raj",
    age: 21,
}

printAbout(student);
printAbout({name: "samir", age: 22});

const studentName = student.name;
console.log(studentName)
const {name} = student;
console.log(name);

console.log("------------- 3")

const talentsystems = {
    numberOfEmployee: 214,
    address: {
        city: "Ahmedabad", state: "gujarat"
    }
}

const {numberOfEmployee, address: {city, state}} = talentsystems;
console.log(numberOfEmployee);
console.log(city);
console.log(state);




