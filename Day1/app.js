


// functions
function sum(num1, num2){
    return num1 + num2;
}
console.log(sum(4,5));

// arrow function
const sum1 = (num1, num2) => {
    return num1+num2;
}
console.log(sum1(4,5));

const sum2 = (num1, num2) => num1+num2;
console.log(sum2(4,5));


// template string (we use backticks ``)
console.log(`${3 + 5} is the sum of 3 & 5`)


const BASE_URL = "http://api.cn.com/";
const USER_NAME = "raj";

const LOGIN = `${BASE_URL}login?username=${USER_NAME}`
console.log(BASE_URL)
console.log(LOGIN)





