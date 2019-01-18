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

  const addASign = function () {
    resultField.textContent += this.textContent;
  }


  const handleMinusing = function (finalArr) {
    console.log('ostatecznie: ' + finalArr);
  }

  const handleAdding = function (finalArr) {
    handleMinusing(finalArr);
  }

  const handleDivision = function (finalArr) {
    handleAdding(finalArr);
  }

  const handleMultiplication = function (finalArr) {
    handleDivision(finalArr);
  }

  const handleMinuses = function (finalArr) {
    handleMultiplication(finalArr);
  }

  const makeANumbers = function (finalArr) {
    let test = (finalArr[0])[0];
    if (operators.includes(test)) {
      for (let i = 1; i < finalArr.length; i += 2) {
        finalArr[i - 1] = finalArr[i - 1].substr(finalArr[i - 1].length - 2);
        console.log('co mamy: ' + finalArr[i - 1]);
        finalArr[i] = parseFloat(finalArr[i]);
        if ((finalArr[i - 1])[1] === '-') {
          finalArr[i] = -(finalArr[i]);
          finalArr[i - 1] = finalArr[i - 1].slice(-1);
          console.log('co mamy2: ' + finalArr[i - 1]);
        }
        console.log('operator first: ' + i, operators);
        finalArr[i - 1] = finalArr[i - 1].slice(-1);
        // finalArr.shift();
      }
    } else {
      for (let i = 0; i < finalArr.length - 1; i += 2) {
        finalArr[i + 1] = finalArr[i + 1].substr(finalArr[i + 1].length - 2);
        finalArr[i] = parseFloat(finalArr[i]);
        if ((finalArr[i + 1])[1] === '-') {
          finalArr[i + 2] = -(finalArr[i + 2]);
          finalArr[i + 1] = finalArr[i + 1].slice(-1);
        }
        console.log('else: ' + i, operators, finalArr[0]);
        finalArr[i + 1] = finalArr[i + 1].slice(-1);
      }
    }
    let txtToShowInH4 = finalArr.toString().replace(/,/g, '');
    showCounting.textContent = txtToShowInH4;
    handleMinuses(finalArr);
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
    // else {
    //   console.log('koniec')
    // }
    //.replace(/,/g, '')

    makeANumbers(finalArr);
  }

  const countThis = function () {
    let flag = true;
    let operators = [];
    let numbers = [];
    let toCount = resultField.textContent;
    if (toCount) {
      // console.log(toCount, typeof toCount);
      resultField.textContent = "";
      let toCountArray = [...toCount];

      // for (let i = 0; i < toCountArray.length; i++) {
      //   if (toCountArray[i] === "*" || toCountArray[i] === "/" || toCountArray[i] === "+" || toCountArray[i] === "-") {
      //     operators.push(toCountArray[i]);
      //   } else {
      //     numbers.push(toCountArray[i]);
      //   }
      // }
      // console.log(`operators: ${operators}, numbers: ${numbers}, tocountarray: ${toCountArray}`);
      // return toCountArray;

      // toCountArray.forEach(function (sign) {
      //   if (sign === "*" || sign === "/" || sign === "+" || sign === "-") {
      //     operators.push(sign);
      //     numbers.push('');
      //   } else {
      //     numbers.push(sign);
      //     operators.push('');
      //   }
      // });
      // console.log(`operators: ${operators}, numbers: ${numbers}, tocountarray: ${toCountArray}; ${typeof toCountArray[1]}`);

      // for (let i = 0; i < toCountArray.length; i++) {
      //   if ((toCountArray[i + 1] != "*" || toCountArray[i + 1] != "/" || toCountArray[i + 1] != "+" || toCountArray[i + 1] != "-") && (toCountArray[i] === "*" || toCountArray[i] === "/" || toCountArray[i] === "+" || toCountArray[i + 1] === "-")) {
      //     // operators.push(toCountArray[i]);
      //     console.log('mamy zmiane');
      //     toCountArray.splice(i + 1, 0, 'x');
      //     i++;
      //   } else if ((toCountArray[i] != "*" || toCountArray[i] != "/" || toCountArray[i] != "+" || toCountArray[i + 1] != "-") && (toCountArray[i + 1] === "*" || toCountArray[i + 1] === "/" || toCountArray[i + 1] === "+" || toCountArray[i + 1] === "-")) {
      //     console.log('mamy zmiane');
      //     toCountArray.splice(i + 1, 0, 'x');
      //     i++;
      //     // numbers.push(toCountArray[i]);
      //   } else {
      //     console.log('oho!')
      //   }
      // }
      // console.log(`operators: ${operators}, numbers: ${numbers}, tocountarray: ${toCountArray}`);
      const operators = ['+', '-', '*', '/'];
      for (let i = 0; i < toCountArray.length; i++) {
        if (operators.includes(toCountArray[i]) && !(operators.includes(toCountArray[i + 1]))) {
          // operators.push(toCountArray[i]);
          // console.log('mamy zmiane');
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        } else if (operators.includes(toCountArray[i + 1]) && !(operators.includes(toCountArray[i]))) {
          // console.log('mamy zmiane');
          toCountArray.splice(i + 1, 0, 'x');
          i++;
          // numbers.push(toCountArray[i]);
        } else {
          // console.log('kontynuacja')
        }
      }
      // console.log(`operators: ${operators}, numbers: ${numbers}, tocountarray: ${toCountArray}; ${typeof toCountArray}`);
      if (toCountArray[toCountArray.length - 1] != 'x') {
        toCountArray.push('x');
      }
      makeACount(toCountArray);
      // return toCountArray;

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