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
      let result = parseFloat(finalArr[actionPoint - 1]) - parseFloat(finalArr[actionPoint + 1]);
      finalArr.splice(actionPoint - 1, 3, result);
    }
    console.log('wynik: ' + finalArr);
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

  // MAKE_A_NUMBERS
  const makeANumbers = function (finalArr) {
    // OPERATORY NA POCZĄTKU
    let test1 = (finalArr[0])[0]; // czy pierwszy string to operator
    if (operators.includes(test1)) { // pierwszy string to operator
      if (finalArr[0] === '-') {
        finalArr[1] = -(finalArr[1]); // pierwsza liczba staje się ujemna}
        console.log('tylko jeden znak i jest to minus' + finalArr[1]);
      }
      for (let i = 0; i < finalArr.length; i += 2) { // parzysta liczba stringów
        finalArr[i + 1] = parseFloat(finalArr[i + 1]); // zamiana co drugiego stringu na liczbę
        if (finalArr[i].length >= 2) {
          finalArr[i] = finalArr[i].substr(-2); // obcięcie do dwóch ostatnich znaków jeżeli jest ich więcej
          // console.log('elo' + finalArr[i], finalArr[i].length)
          if ((finalArr[i])[1] === '-') { // jeśli drugi ze znaków to minus
            finalArr[i + 1] = finalArr[i + 1] * -1; // następna liczba staje się ujemna
            finalArr[i] = finalArr[i].slice(0, 1); // wybrany zostaje pierwszy znak
          } else {
            finalArr[i] = finalArr[i].slice(1); // wybrany zostaje drugi znak
          }
        }
      }
      finalArr.shift();
    } else { // pierwszy string to nie operator
      console.log('na poczatku nie operator');
      for (let i = 0; i < finalArr.length; i += 2) { // zawsze nieparzysta liczba elementów
        finalArr[i] = parseFloat(finalArr[i]);
        if (i < finalArr.length - 1) {
          finalArr[i + 1] = finalArr[i + 1].substr(-2); // obcięcie ostatnich dwóch znaków z operatorów
        }
        if (i < finalArr.length - 1 && (finalArr[i + 1])[1] === '-') {
          finalArr[i + 2] = -(finalArr[i + 2]);
          finalArr[i + 1] = finalArr[i + 1].slice(-1);
        }
        if (i < finalArr.length - 1) {
          finalArr[i + 1] = finalArr[i + 1].slice(-1);
        }
      }
    }

    // NaN
    // finalArr.forEach((element, index) => { // usunięcie każdego NaN i poprzedzającego go stringa z operatorami
    //   if (typeof element === 'number' && isNaN(element)) {
    //     finalArr.splice(index - 1, 2);
    //     console.log('DELETED!' + element, finalArr);
    //   }
    // });

    // FINAL
    let txtToShowInH4 = finalArr.toString().replace(/,/g, '');
    showCounting.textContent = txtToShowInH4; // prezentacja działania
    console.log('po makeANumbers ' + finalArr);
    handleMultiplication(finalArr);
  }

  // HANDLE_DOTS USUWA OSTATNI CIĄG JEŚLI TO OPERATOR
  const handleDots = function (finalArr) {
    let test2 = (finalArr[finalArr.length - 1])[0]; // czy ostatni string to operator
    if (operators.includes(test2)) {
      finalArr.pop(); // jeżeli to operator to usuwa go
    }

    // KROPKI
    for (let i = 0; i < finalArr.length; i++) {
      while ((finalArr[i])[0] === ".") { // ucina kropki z przodu
        finalArr[i] = finalArr[i].substr(1);
      }
      // znaleźć drugie wystąpienie kropki i odcięcie wszystkiego !
      let j = 0;
      while (j < 2) {
        let startDelete = finalArr[i].indexOf(".");
        if (j == 1 && startDelete > j) {
          finalArr[i].length = startDelete;
        }
        j++;
      }
      // NaN
      if (typeof finalArr[i] === 'number' && isNaN(finalArr[i])) {
        finalArr.splice(i - 1, 2);
      }
    }
    console.log('przed makeANumbers ' + finalArr);
    makeANumbers(finalArr);
  }

  // MAKE_A_COUNT UTWORZENIE TABLICY ZE STRINGAMI LICZBA/OPERATOR
  const makeACount = function (toCountArray) {
    let finalArr = []; // tablica
    while (toCountArray.includes('x')) {
      let terminus = toCountArray.indexOf('x');
      let nextEl = toCountArray.splice(0, terminus);
      toCountArray.splice(0, 1);
      nextEl = nextEl.toString();
      nextEl = nextEl.replace(/,/g, ''); // usunięcie przecinków
      finalArr.push(nextEl); // umieszczenie kolejnych stringów w tablicy
    }
    if (finalArr.length == 1) return;
    console.log('przed handleDots ' + finalArr);
    handleDots(finalArr);
  }

  // COUNT_THIS OPRACOWANIE INPUTU
  const countThis = function () {
    let operators = [];
    let toCount = resultField.textContent;
    if (toCount) {
      resultField.textContent = "";
      let toCountArray = [...toCount]; // zmiana na tablicę

      const operators = ['+', '-', '*', '/'];
      for (let i = 0; i < toCountArray.length; i++) {
        while (toCountArray[i] == "." && toCountArray[i + 1] == ".") { // usunięcie wielokrotnych wystąpień kropek
          toCountArray.splice(i, 1);
        }
        if (operators.includes(toCountArray[i]) && !(operators.includes(toCountArray[i + 1]))) { // dodanie x po operatorach
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        }
        if (operators.includes(toCountArray[i + 1]) && !(operators.includes(toCountArray[i]))) { // dodanie x po numerach
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        }
      }
      if (toCountArray[toCountArray.length - 1] != 'x') { // dodanie x na końcu
        toCountArray.push('x');
      }
      makeACount(toCountArray); // input

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