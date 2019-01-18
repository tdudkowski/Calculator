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
  const resultField = document.getElementById('result');
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
    if (finalArr.includes('-')) {
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
    if (finalArr.includes('+')) {
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
      if (finalArr[actionPoint + 1] == 0) return console.log('dzielenie przez zero jest nielegalne');
      let result = finalArr[actionPoint - 1] / finalArr[actionPoint + 1];
      finalArr.splice(actionPoint - 1, 3, result);
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

  const makeANumbers = function (finalArr) {
    let test = (finalArr[0])[0];
    if (operators.includes(test)) {
      for (let i = 1; i < finalArr.length; i += 2) {
        finalArr[i - 1] = finalArr[i - 1].substr(finalArr[i - 1].length - 2);
        finalArr[i] = parseFloat(finalArr[i]);
        if ((finalArr[i - 1])[1] === '-') {
          finalArr[i] = -(finalArr[i]);
          finalArr[i - 1] = finalArr[i - 1].slice(-1);
        }
        console.log('operator first: ' + i, operators);
        finalArr[i - 1] = finalArr[i - 1].slice(-1);
      }
    } else {
      for (let i = 0; i < finalArr.length - 1; i += 2) {
        finalArr[i + 1] = finalArr[i + 1].substr(finalArr[i + 1].length - 2);
        finalArr[i] = parseFloat(finalArr[i]);
        if ((finalArr[i + 1])[1] === '-') {
          finalArr[i + 2] = -(finalArr[i + 2]);
          finalArr[i + 1] = finalArr[i + 1].slice(-1);
        }
        finalArr[i + 1] = finalArr[i + 1].slice(-1);
      }
    }
    let txtToShowInH4 = finalArr.toString().replace(/,/g, '');
    showCounting.textContent = txtToShowInH4; // prezentacja działania
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

    makeANumbers(finalArr);
  }

  const countThis = function () {
    let flag = true;
    let operators = [];
    let numbers = [];
    let toCount = resultField.textContent;
    if (toCount) {
      resultField.textContent = "";
      let toCountArray = [...toCount];

      const operators = ['+', '-', '*', '/'];
      for (let i = 0; i < toCountArray.length; i++) {
        if (operators.includes(toCountArray[i]) && !(operators.includes(toCountArray[i + 1]))) {
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        } else if (operators.includes(toCountArray[i + 1]) && !(operators.includes(toCountArray[i]))) {
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        } else {}
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