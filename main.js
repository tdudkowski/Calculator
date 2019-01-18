  const zeroBtn = document.getElementById('zero');
  const oneBtn = document.getElementById('one');
  const twoBtn = document.getElementById('two');
  const threeBtn = document.getElementById('three');
  const fourBtn = document.getElementById('four');
  const fiveBtn = document.getElementById('five');
  const sixBtn = document.getElementById('six');
  const sevenBtn = document.getElementById('seven');
  const eightBtn = document.getElementById('eight');
  const nineBtn = document.getElementById('nine');
  const plusBtn = document.getElementById('plus');
  const minusBtn = document.getElementById('minus');
  const multiplicationBtn = document.getElementById('multiplication');
  const divisionBtn = document.getElementById('division');
  const comaBtn = document.getElementById('coma');
  const runBtn = document.getElementById('run');
  const resultField = document.querySelector('div#result>span');
  const clearBtn = document.getElementById('clear');
  const clearAllBtn = document.getElementById('clearall');
  const showCounting = document.querySelector('h4>span');
  const operators = ['+', '-', '*', '/'];
  let flag = false;

  const addASign = function () {
    if (flag) {
      resultField.textContent = "";
      flag = false;
    }
    resultField.textContent += this.textContent;
  }

  const handleMinusing = function (finalArr) {
    while (finalArr.includes('-')) {
      console.log('mamy odejmowanie');
      let actionPoint = finalArr.indexOf('-');
      let result = finalArr[actionPoint - 1] - finalArr[actionPoint + 1];
      finalArr.splice(actionPoint - 1, 3, result);
    }
    console.log('ostatecznie: ' + finalArr);
    resultField.textContent = finalArr;
    flag = true;
  }

  const handleAdding = function (finalArr) {
    while (finalArr.includes('+')) {
      console.log('mamy dodawanie');
      let actionPoint = finalArr.indexOf('+');
      let result = parseFloat(finalArr[actionPoint - 1]) + parseFloat(finalArr[actionPoint + 1]);
      finalArr.splice(actionPoint - 1, 3, result);
    }
    handleMinusing(finalArr);
  }

  const handleDivision = function (finalArr) {
    while (finalArr.includes('/')) {
      console.log('mamy dzielenie');
      let actionPoint = finalArr.indexOf('/');
      if (finalArr[actionPoint + 1] == 0) return resultField.textContent = '"Dividing by zero is illegal" Al Capone';
      let result = finalArr[actionPoint - 1] / finalArr[actionPoint + 1];
      finalArr.splice(actionPoint - 1, 3, result.toFixed(5));
    }
    handleAdding(finalArr);
  }

  const handleMultiplication = function (finalArr) {
    while (finalArr.includes('*')) {
      console.log('mamy mnożenie');
      let actionPoint = finalArr.indexOf('*');
      let result = finalArr[actionPoint - 1] * finalArr[actionPoint + 1];
      finalArr.splice(actionPoint - 1, 3, result);
    }
    handleDivision(finalArr);
  }

  // MAKE A NUMBERS
  const makeANumbers = function (finalArr) {

    let test2 = (finalArr[finalArr.length - 1])[0]; // czy ostatni string to operator
    if (operators.includes(test2)) {
      finalArr.pop();
    }

    let test1 = (finalArr[0])[0]; // czy pierwszy string to operator
    if (operators.includes(test1)) { // pierwszy string to operator
      for (let i = 0; i < finalArr.length; i += 2) {
        finalArr[i] = finalArr[i].substr(finalArr[i].length - 2); // obcięcie do dwóch ostatnich znaków
        while ((finalArr[i + 1])[0] === ".") { // ucina kropki z przodu
          finalArr[i + 1] = finalArr[i + 1].substring(1);
        }
        // znaleźć drugie wystąpienie kropki i odcięcie wszystkiego !
        for (let j = 0; j < 2; j++) {
          let startDelete = finalArr[i + 1].indexOf('.');
          if (j = 1) {
            finalArr[i + 1].length = startDelete;
          }
        }

        finalArr[i + 1] = parseFloat(finalArr[i + 1]); // zamiana co drugiego na liczbę
        if ((finalArr[i])[1] === '-') { // jeśli drugi ze znaków to minus
          finalArr[i + 1] = -(finalArr[i + 1]); // następna liczba staje się ujemna
          finalArr[i] = finalArr[i].slice(0, 1);
        } else {
          finalArr[i] = finalArr[i].slice(1);
        }
      }
      finalArr.shift();
      console.log('jeden ' + finalArr);
    } else {
      for (let i = 0; i < finalArr.length; i += 2) {
        if (i < finalArr.length - 1) {
          finalArr[i + 1] = finalArr[i + 1].substr(finalArr[i + 1].length - 2);
        }
        while ((finalArr[i])[0] === ".") {
          finalArr[i] = finalArr[i].substring(1);
        }

        // znaleźć drugie wystąpienie kropki i odcięcie wszystkiego !
        for (let j = 0; j < 2; j++) {
          console.log(j, i)
          let startDelete = finalArr[i].indexOf('.');
          if (j == 1) {
            finalArr[i].length = startDelete;
            console.log('dwa czyzby? ' + startDelete, finalArr[i]);
          }
        }

        finalArr[i] = parseFloat(finalArr[i]);
        if (i < finalArr.length - 1 && (finalArr[i + 1])[1] === '-') {
          finalArr[i + 2] = -(finalArr[i + 2]);
          finalArr[i + 1] = finalArr[i + 1].slice(-1);
        }
        if (i < finalArr.length - 1) {
          finalArr[i + 1] = finalArr[i + 1].slice(-1);
        }
      }
      console.log('dwa ' + finalArr, finalArr.length);
    }

    let txtToShowInH4 = finalArr.toString().replace(/,/g, '');
    showCounting.textContent = txtToShowInH4; // prezentacja działania

    finalArr.forEach((element, index) => {
      if (element === NaN) {
        finalArr.splice(i, 1)
      }
    });

    handleMultiplication(finalArr);
  }

  const makeACount = function (toCountArray) {
    let finalArr = [];
    while (toCountArray.includes('x')) {
      let terminus = toCountArray.indexOf('x');
      let nextEl = toCountArray.splice(0, terminus);
      toCountArray.splice(0, 1);
      nextEl = nextEl.toString();
      nextEl = nextEl.replace(/,/g, '');
      finalArr.push(nextEl);
    }
    if (finalArr.length == 1) return;
    makeANumbers(finalArr);
  }

  const countThis = function () {
    let flag = true; // o co chodzi?
    let operators = [];
    let numbers = [];
    let toCount = resultField.textContent;
    if (toCount) {
      resultField.textContent = "";
      let toCountArray = [...toCount];

      const operators = ['+', '-', '*', '/'];
      for (let i = 0; i < toCountArray.length; i++) {
        while (toCountArray[i] == "." && toCountArray[i + 1] == ".") {
          toCountArray.splice(i, 1);
        }
        if (operators.includes(toCountArray[i]) && !(operators.includes(toCountArray[i + 1]))) {
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        }
        if (operators.includes(toCountArray[i + 1]) && !(operators.includes(toCountArray[i]))) {
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        }
      }
      if (toCountArray[toCountArray.length - 1] != 'x') {
        toCountArray.push('x');
      }
      makeACount(toCountArray);

    } else {
      console.log('nie wprowadzono danych');
    }
  }

  const removeLast = () => {
    let toCount = resultField.textContent;
    toCount = toCount.slice(0, -1);
    resultField.textContent = toCount;
  }

  const removeAll = () => {
    resultField.textContent = "";
  }

  zeroBtn.addEventListener('click', addASign);
  oneBtn.addEventListener('click', addASign);
  twoBtn.addEventListener('click', addASign);
  threeBtn.addEventListener('click', addASign);
  fourBtn.addEventListener('click', addASign);
  fiveBtn.addEventListener('click', addASign);
  sixBtn.addEventListener('click', addASign);
  sevenBtn.addEventListener('click', addASign);
  eightBtn.addEventListener('click', addASign);
  nineBtn.addEventListener('click', addASign);
  plusBtn.addEventListener('click', addASign);
  minusBtn.addEventListener('click', addASign);
  multiplicationBtn.addEventListener('click', addASign);
  divisionBtn.addEventListener('click', addASign);
  comaBtn.addEventListener('click', addASign);
  runBtn.addEventListener('click', countThis);
  clearBtn.addEventListener('click', removeLast);
  clearAllBtn.addEventListener('click', removeAll);