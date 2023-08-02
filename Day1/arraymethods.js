

// Entries

const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
console.log(iterator1.next().value);
console.log(iterator1.next().value);
console.log(iterator1.next().value);

for (const [index, element] of array1.entries()) {
    console.log(index, element);
}


console.log()
console.log("=========== 1")
console.log()



// fill method
const array2 = [1, 2, 3, 4];
// The fill() method changes all elements in an array to a static value,


// fill(value)
// fill(value, start)
// fill(value, start, end)
// fill(value, start=0, end=array.length) (value can be number,string etc)

console.log(array2.fill(6));
console.log(array2.fill(5, 1));
console.log(array2.fill(0, 2, 4));

console.log()
console.log("=========== 2")
console.log()

// find method: returns the first element in the provided array that satisfies the provided testing function

const array3 = [5, 12, 8, 130, 44];
const found = array3.find(element => element > 10);
console.log(found);

function testFunction(num){
    return num > 10;
}
const value = array3.find(testFunction);
console.log(value);

console.log()
console.log("########### 3")
console.log()


const array4 = [1,4,9,16]
const resultArray = array4.map(x => x+1);
console.log(resultArray);


console.log()
console.log("########### 4")
console.log()

const array5 = [
    {
        name: "Raj",
        age: 20
    },
    {
        name: "Samir",
        age: 22
    }
]

// Below thing is also important to server from backend to maintain same format for mobile & web & desktop
const listOfString = array5.map(
    eachObj => `My name is ${eachObj.name} and age is ${eachObj.age}`
    );

for (let each of listOfString)
    console.log(each)

const listOfNewObjectToProvideToFrontend = array5.map(
    eachObj => {
        return {   name: eachObj.name,
            age: eachObj.age,
            message: `My name is ${eachObj.name} and age is ${eachObj.age}`}}
    );

console.log(listOfNewObjectToProvideToFrontend)

console.log()
console.log("########### 5")
console.log()

const array6 = [1,2,3,4,5];
// const array6 = [1,21,3,41,5];
const even = (element) => element % 2 === 0;
console.log(array6.some(even));

console.log()
console.log("########### 6")
console.log()

const marks = [34,56,67,78,89];
const allpassed = marks.every(mark => mark >= 35);
console.log(allpassed);

console.log()
console.log("^^^^^^^^^^^ 7")
console.log()

const array7 = [1,2,3,4,5,6,7,8,9];
const even_nums = array7.filter((num) => num % 2 === 0)
console.log(even_nums)

console.log()
console.log("^^^^^^^^^^^ 8")
console.log();

let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits.slice());
console.log(fruits.slice(1,4));
console.log(fruits.slice(-3,-1));

console.log();
console.log("^^^^^^^^^^^ 9");
console.log();

fruits = ["Banana", "Orange", "Apple", "Mango"];
let deletedElement = fruits.splice(fruits.indexOf("Orange"), 1, "Leamon", "kiwi");
// fruits.splice(2, fruits.indexOf("Orange"), "leamon", "kiwi");
console.log(fruits);
console.log(deletedElement);

console.log()
console.log("^^^^^^^^^^^ 10")
console.log()

const array8 = [1,2,3,4];
const array9 = [5,6,7,8];
console.log(array8.concat(array9));
console.log(array8);

console.log()
console.log("%%%%%%%%%%% 11")
console.log()

const numbers = [10,20,30,40,50]
const total = numbers.reduce((total, currentValue)=>{
    total += currentValue;
    return total;
}, 1000);
console.log("Total is", total);

console.log()
console.log("%%%%%%%%%%% 12")
console.log()


console.log()
console.log("%%%%%%%%%%% 13")
console.log()








