   const panelBtn = document.querySelectorAll('div.btn');
   const runBtn = document.getElementById('run');
   const resultField = document.querySelector('div#result>span');
   const clearBtn = document.getElementById('clear');
   const clearAllBtn = document.getElementById('clearall');
   const showCounting = document.querySelector('h4>span');
   const operators = ['+', '-', '*', '/'];
   let flag = false;

   // 8. SUBTRACTION AND SHOW THE RESULT
   const handleSubtraction = function (finalArr) {
     while (finalArr.includes('-')) {
       console.log('subtraction');
       let actionPoint = finalArr.indexOf('-');
       let result = parseFloat(finalArr[actionPoint - 1]) - parseFloat(finalArr[actionPoint + 1]);
       finalArr.splice(actionPoint - 1, 3, result);
     }
     finalArr = Number(finalArr);
     console.log('result: ' + finalArr);
     resultField.textContent = parseFloat(finalArr.toFixed(5));
     flag = true;
   }

   // 7. ADDITION
   const handleAddition = function (finalArr) {
     while (finalArr.includes('+')) {
       console.log('addition');
       let actionPoint = finalArr.indexOf('+');
       let result = parseFloat(finalArr[actionPoint - 1]) + parseFloat(finalArr[actionPoint + 1]);
       finalArr.splice(actionPoint - 1, 3, result);
     }
     handleSubtraction(finalArr);
   }

   // 6. DIVISION
   const handleDivision = function (finalArr) {
     while (finalArr.includes('/')) {
       console.log('division');
       let actionPoint = finalArr.indexOf('/');
       if (finalArr[actionPoint + 1] == 0) {
         resultField.textContent = '"Dividing by zero is illegal" - Al C.';
         flag = "true";
         return;
       };
       let result = finalArr[actionPoint - 1] / finalArr[actionPoint + 1];
       finalArr.splice(actionPoint - 1, 3, result.toFixed(5));
     }
     handleAddition(finalArr);
   }

   // 5. MULTIPLICATION
   const handleMultiplication = function (finalArr) {
     while (finalArr.includes('*')) {
       console.log('multiplication');
       let actionPoint = finalArr.indexOf('*');
       let result = finalArr[actionPoint - 1] * finalArr[actionPoint + 1];
       finalArr.splice(actionPoint - 1, 3, result);
     }
     handleDivision(finalArr);
   }

   // 4. MAKE_CLEAN_DATA CREATE A CALCULABLE ROW OF SIGNS, MOSTLY IT'S HANDLIG WITH MINUSES - SANITIZED DATA
   const makeCleanData = function (finalArr) {
     // OPERATORY NA POCZĄTKU
     let test1 = (finalArr[0])[0]; // if first string is an operator
     if (operators.includes(test1)) { // first string is an operator
       if (finalArr[0] === '-') {
         finalArr[1] = -(finalArr[1]); // first number become negative if has a minus before
       }
       for (let i = 0; i < finalArr.length; i += 2) { // even number of strings
         if (finalArr[i].length > 1) { // if there're more than one operator
           if ((finalArr[i])[1] === '-') { // if second sign is a minus
             finalArr[i + 1] = finalArr[i + 1] * -1; // next number become negative
             finalArr[i] = finalArr[i].slice(0, 1); // first sign is taken
           } else {
             finalArr[i] = finalArr[i].slice(1); // second sign is taken
           }
         }
       }
       finalArr.shift(); // removing first unneceseary string
     } else { // first string is not an operator
       for (let i = 0; i < finalArr.length; i += 2) { // always odd number of elements
         if (i < finalArr.length - 1 && finalArr[i + 1].length > 1) { // if there're more than one operator
           if ((finalArr[i + 1])[1] === '-') { // if second sign of previous string is a minus
             finalArr[i + 2] = -(finalArr[i + 2]); // next number become negative
             finalArr[i + 1] = finalArr[i + 1].slice(0, 1);
           } else {
             finalArr[i + 1] = finalArr[i + 1].slice(1);
           }
         }
       }
     }

     let txtToShowInH4 = finalArr.toString().replace(/,/g, '');
     showCounting.textContent = txtToShowInH4; // display calculations
     console.log('3. makeCleanData finalArr ' + finalArr);
     handleMultiplication(finalArr);
   }

   // 3. MAKE_A_STRINGS CREATE AN ARRAY OF STRINGS NUMBER/OPERATOR
   const makeAStrings = function (toCountArray) {
     finalArr = []; // array
     while (toCountArray.includes('x')) {
       let terminus = toCountArray.indexOf('x'); //  find position of the nearest x
       let nextEl = toCountArray.splice(0, terminus); // cut from zero to terminus
       toCountArray.splice(0, 1); // remove x
       nextEl = nextEl.toString(); // change signs into string
       nextEl = nextEl.replace(/,/g, ''); // removing commas
       finalArr.push(nextEl); // placing consecuting strings into an array
     }

     // removes last string if it's an operator or same dot only
     let test2 = (finalArr[finalArr.length - 1]);
     if (operators.includes((test2)[0]) || test2.length == 1 && test2 == ".") { // if last string is an operator or a dot
       finalArr.pop(); // removes if yes
     }

     for (let i = 0; i < finalArr.length; i++) {
       // removes string of the operators if the next string is also an operator - is it still needed?
       if (operators.includes((finalArr[i])[0]) && operators.includes((finalArr[i + 1])[0])) {
         finalArr.splice(i, 1);
       }

       // changing string of ciphers to a number (then it removes all from the second dot)
       if (!operators.includes((finalArr[i])[0])) {
         finalArr[i] = parseFloat(finalArr[i]);
       }
     }

     if (finalArr.length < 3) {
       console.log('too few strings');
       showCounting.textContent = 'none, not enough data to calculate';
       return;
     }
     console.log('2. makeAStrings finalArr ' + finalArr);
     makeCleanData(finalArr);
   }

   // 2. COUNT_THIS HANDLE INPUT
   const countThis = function () {
     let toCount = resultField.textContent;
     if (toCount) {
       resultField.textContent = "";
       let toCountArray = [...toCount]; // changing into an array

       const operators = ['+', '-', '*', '/'];
       const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

       // HANDLE DOTS
       for (let i = 0; i < toCountArray.length; i++) { // removing all dots not between ciphers
         while (toCountArray[i] == "." && !(numbers.includes(toCountArray[i - 1]) && numbers.includes(toCountArray[i + 1]))) {
           toCountArray.splice(i, 1);
         }
       }

       // HANDLE OPERATORS
       for (let i = 0; i < toCountArray.length; i++) { // removing all operators in a row (string) except two last
         while (operators.includes(toCountArray[i]) && operators.includes(toCountArray[i + 1]) && operators.includes(toCountArray[i + 2])) {
           toCountArray.splice(i, 1);
         }
       }

       // ADD A TERMINATORS
       for (let i = 0; i < toCountArray.length; i++) { // adding terminators between rows of an operators and a numbers
         if (operators.includes(toCountArray[i]) && !(operators.includes(toCountArray[i + 1]))) { // adding x after operators
           toCountArray.splice(i + 1, 0, 'x');
           i++;
         }
         if (operators.includes(toCountArray[i + 1]) && !(operators.includes(toCountArray[i]))) { // adding x after numbers
           toCountArray.splice(i + 1, 0, 'x');
           i++;
         }
       }

       if (toCountArray[toCountArray.length - 1] != 'x') { // adding x on the end
         toCountArray.push('x');
       }

       console.log('1. toCountArray ' + toCountArray);
       if (toCountArray.length > 0) {
         makeAStrings(toCountArray); // input
       } else {
         console.log('nothing left!');
         showCounting.textContent = 'none, nothing left!';
       }
     } else {
       console.log('no data in input');
       showCounting.textContent = 'none, no data in input';
     }
   }

   // 1. INPUT
   const addASign = function () {
     if (flag) {
       resultField.textContent = "";
       flag = false;
     }
     resultField.textContent += this.textContent;
   }

   // CLEAR
   const removeLast = () => {
     let toCount = resultField.textContent;
     toCount = toCount.slice(0, -1);
     resultField.textContent = toCount;
   }

   // CLEAR ALL
   const removeAll = () => {
     resultField.textContent = "";
   }

   // LISTENERS
   panelBtn.forEach(function (button) {
     button.addEventListener("click", addASign);
   });

   runBtn.addEventListener('click', countThis);
   clearBtn.addEventListener('click', removeLast);
   clearAllBtn.addEventListener('click', removeAll);