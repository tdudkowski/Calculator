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

  // HANDLE_DOTS USUWA NADMIERNE KROPKI I OSTATNI CIĄG JEŚLI TO OPERATOR
  const handleDots = function (finalArr) {

    // usuwa kropki
    for (let i = 0; i < finalArr.length; i++) { // dlaczego tu odliczałem co 2? przecież na 0 może być operator
      // 1. kropki z początku
      while ((finalArr[i])[0] === ".") { // ucina kropki z przodu
        finalArr[i] = finalArr[i].substr(1);
      }

      // usuwa NaN - działa?
      if (typeof finalArr[i] === 'number' && isNaN(finalArr[i])) {
        finalArr.splice(i - 1, 2);
        console.log('usunąłem NaN?')
      }
    }
    console.log('4. handleDots finalArr ' + finalArr);
    handleMultiplication(finalArr);
  }

  // MAKE_A_NUMBERS
  const makeANumbers = function (finalArr) {
    // OPERATORY NA POCZĄTKU
    let test1 = (finalArr[0])[0]; // czy pierwszy string to operator
    if (operators.includes(test1)) { // pierwszy string to operator
      if (finalArr[0] === '-') {
        finalArr[1] = -(finalArr[1]); // pierwsza liczba staje się ujemna jeżeli przed nią jest minus
      }
      for (let i = 0; i < finalArr.length; i += 2) { // parzysta liczba stringów
        finalArr[i + 1] = parseFloat(finalArr[i + 1]); // zamiana co drugiego stringu na liczbę
        if (finalArr[i].length > 1) {
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

    // FINAL
    let txtToShowInH4 = finalArr.toString().replace(/,/g, '');
    showCounting.textContent = txtToShowInH4; // prezentacja działania
    console.log('3. makeANumbers finalArr ' + finalArr);
    handleDots(finalArr);
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

    // usuwa ostatni string jeśli jest to operator
    let test2 = (finalArr[finalArr.length - 1])[0];
    if (operators.includes(test2)) { // czy ostatni string to operator
      finalArr.pop(); // jeżeli to operator to usuwa go
    }
    // usuwa string operatórow jeżeli następny string to też operator

    console.log(finalArr);
    for (let i = 0; i < finalArr.length - 1; i++) {
      if (operators.includes((finalArr[i])[0]) && operators.includes((finalArr[i + 1])[0])) {
        console.log('usunalem string operatorow ' + i + finalArr[i] + finalArr[i + 1])
        finalArr.splice(i, 1);
      }
    }

    console.log('2. makeACount finalArr ' + finalArr);
    makeANumbers(finalArr);
  }

  // COUNT_THIS OPRACOWANIE INPUTU
  const countThis = function () {
    let operators = [];
    let toCount = resultField.textContent;
    if (toCount) {
      resultField.textContent = "";
      let toCountArray = [...toCount]; // zmiana na tablicę

      const operators = ['+', '-', '*', '/'];
      let y = 0;
      let x = operators.includes(toCountArray[y + 1]);
      let z = (toCountArray[0] == '.' && operators.includes(toCountArray[1]));
      console.log(z, x, toCountArray[1]);

      for (let i = 0; i < toCountArray.length; i++) {
        while (toCountArray[i] == "." && toCountArray[i + 1] == ".") { // usunięcie wielokrotnych wystąpień kropek
          toCountArray.splice(i, 1);
          console.log('czy to dziala');
        }
        // jeśli pozostała jedna kropka pomiędzy operatorami jest usunięta
        if (toCountArray[i] == '.' && toCountArray[i - 1] == 'x') {
          toCountArray.splice(i - 1, 2);
          console.log('USUWAM pomiędzy operatorami ' + toCountArray[i]);
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

      if (toCountArray[0] == '.' && toCountArray[1] == 'x') {
        console.log('USUWAM pierwszy' + toCountArray[1]);
        toCountArray.splice(0, 2);
      }

      if (toCountArray[toCountArray.length - 1] != 'x') { // dodanie x na końcu
        toCountArray.push('x');
      }
      console.log('1. toCountArray ' + toCountArray);
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