const hideCenterDigits = (number) => {
  // const hiddenNumber = number.replace(number.substring(2, 8), "******");

  //regex
  //(\d{2}) => capture first 2 digits
  //(\d+) => captures unlimited digits which are in decimal form
  // /g ==> global pattern
  const hiddenNumber = number.replace(
    /(\d{2})(\d+)(\d{2})/g,
    (match, start, middle, end) => {
      return start + "*".repeat(middle.length) + end;
    }
  );

  return hiddenNumber;
};
console.log(hideCenterDigits("7567579267"));





const nameString = "   ayush    m    ghiya   ";
const removeWhiteSpace = (fullName) => {
  // \s => captures all the white spaces
  // + => used to capture unlimited white space
  fullName = fullName.trim().replace(/\s+/g, " ");
  return fullName;
};
console.log(removeWhiteSpace(nameString));




const capitalizeName = (fullName) => {
  const nameArray = removeWhiteSpace(fullName).split(" ");
  for (let i = 0; i < nameArray.length; i++) {
    nameArray[i] =
      nameArray[i].charAt(0).toUpperCase() +
      nameArray[i].slice(1).toLowerCase();
  }
  const formattedName = nameArray.join(" ");
  return formattedName;
};
// console.log(capitalizeName(nameString));
