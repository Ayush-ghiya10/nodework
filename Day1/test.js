// const chatList = [
//     {name: 'Ghiya', age:11 },
//     {name: 'Jatin', age:12 },
//     {name: 'Ayush', age:10},
//     {name: 'raj', age:15 },
//     {name: 'Pratham', age:16},
// ]

// const msgArray=chatList.map((chat)=> `My name is ${chat.name} and my age is ${chat.age}`)

// console.log(msgArray);



const fruits = ["Banana","Orange","Apple","Mango"];
// fruits.splice(1,1);
fruits.splice(fruits.indexOf("Orange"),1);
console.log(fruits);
