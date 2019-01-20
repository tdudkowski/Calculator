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
    finalArr = Number(finalArr);
    console.log('wynik: ' + finalArr);
    resultField.textContent = parseFloat(finalArr.toFixed(5));
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

  // HANDLE_DOTS - CZY TO JEST NADAL POTRZEBNE?
  const handleDots = function (finalArr) {

    for (let i = 0; i < finalArr.length; i++) { // dlaczego tu odliczałem co 2? przecież na 0 może być operator

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
        console.log(finalArr[i])
        if (finalArr[i].length > 1) { // jeżeli jest więcej niż jeden operator
          if ((finalArr[i])[1] === '-') { // jeśli drugi ze znaków to minus
            finalArr[i + 1] = finalArr[i + 1] * -1; // następna liczba staje się ujemna
            finalArr[i] = finalArr[i].slice(0, 1); // wybrany zostaje pierwszy znak
          } else {
            finalArr[i] = finalArr[i].slice(1); // wybrany zostaje drugi znak
          }
        }
      }
      finalArr.shift(); // usunięcie niepotrzebnego pierwszego stringu
    } else { // pierwszy string to nie operator
      console.log('na poczatku nie operator');
      for (let i = 0; i < finalArr.length; i += 2) { // zawsze nieparzysta liczba elementów
        console.log(finalArr[i])
        if (i < finalArr.length - 1 && finalArr[i + 1].length > 1) { // jeżeli jest więcej niż jeden operator
          if ((finalArr[i + 1])[1] === '-') { // jeśli drugi znak poprzedzającego stringu to minus
            finalArr[i + 2] = -(finalArr[i + 2]); // następna liczba staje się ujemna
            finalArr[i + 1] = finalArr[i + 1].slice(0, 1);
          } else {
            finalArr[i + 1] = finalArr[i + 1].slice(1); // w obu było (-1) dlaczego?
          }
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
    finalArr = []; // tablica
    while (toCountArray.includes('x')) {
      let terminus = toCountArray.indexOf('x'); // znalezienie pozycji najbliższego ixa
      let nextEl = toCountArray.splice(0, terminus); // odcięcie od zera do terminusa
      toCountArray.splice(0, 1); // usunięcie ixa
      nextEl = nextEl.toString(); // zamiana znakow na string
      nextEl = nextEl.replace(/,/g, ''); // usunięcie przecinków
      finalArr.push(nextEl); // umieszczenie kolejnych stringów w tablicy
    }

    // usuwa ostatni string jeśli jest to operator lub sama tylko kropka
    let test2 = (finalArr[finalArr.length - 1]);
    if (operators.includes((test2)[0]) || test2.length == 1 && test2 == ".") { // czy ostatni string to operator lub kropka
      finalArr.pop(); // jeżeli tak to usuwa go
    }

    for (let i = 0; i < finalArr.length; i++) {
      // usuwa string operatórow jeżeli następny string to też operator - czy to jest potrzebne?
      if (operators.includes((finalArr[i])[0]) && operators.includes((finalArr[i + 1])[0])) {
        console.log('usunalem string operatorow ' + i + finalArr[i] + finalArr[i + 1])
        finalArr.splice(i, 1);
      }
      // ucina kropki z przodu liczby
      while ((finalArr[i])[0] == ".") {
        finalArr[i] = finalArr[i].substr(1);
      } // zamienia string cyfr na liczbę (czyli usuwa wszystko za wystąpieniem drugiej kropki)
      if (!operators.includes((finalArr[i])[0])) {
        finalArr[i] = parseFloat(finalArr[i]);
      }
    }

    if (finalArr.length < 3) return console.log('za mało stringów');
    console.log('2. makeACount finalArr ' + finalArr);
    makeANumbers(finalArr);
  }

  // COUNT_THIS OPRACOWANIE INPUTU
  const countThis = function () {
    let toCount = resultField.textContent;
    if (toCount) {
      resultField.textContent = "";
      let toCountArray = [...toCount]; // zmiana na tablicę

      const operators = ['+', '-', '*', '/'];

      for (let i = 0; i < toCountArray.length; i++) {
        while (toCountArray[i] == "." && toCountArray[i + 1] == ".") { // usunięcie wielokrotnych wystąpień kropek
          toCountArray.splice(i, 1);
          console.log('czy to dziala');
          i--;
        }

        // jeśli pozostała jedna kropka pomiędzy operatorami jest usunięta
        if (toCountArray[i] == '.' && operators.includes(toCountArray[i - 1]) && operators.includes(toCountArray[i + 1]) || toCountArray[i] == '.' && toCountArray.length == i) {
          console.log('USUWAM pomiędzy operatorami ' + toCountArray[i]);
          toCountArray.splice(i, 1);
        }

        // kasowanie wszystkich operatorów w ciągu poza dwoma ostatnimi
        while (operators.includes(toCountArray[i]) && operators.includes(toCountArray[i + 1]) && operators.includes(toCountArray[i + 2])) { // usunięcie wielokrotnych wystąpień kropek
          toCountArray.splice(i, 1);
          console.log('obcinanie operatorów od max 2');
          i--;
        }
      }

      if (toCountArray[0] == '.') { // usunięcie kropki na początku
        console.log('USUWAM pierwszy' + toCountArray[1]);
        toCountArray.splice(0, 2);
      }

      for (let i = 0; i < toCountArray.length; i++) { // dodanie terminatorów pomiędzy ciągami operatorów i cyfr
        if (operators.includes(toCountArray[i]) && !(operators.includes(toCountArray[i + 1]))) { // dodanie x po operatorach
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        }
        if (operators.includes(toCountArray[i + 1]) && !(operators.includes(toCountArray[i]))) { // dodanie x po numerach
          toCountArray.splice(i + 1, 0, 'x');
          i++;
        }
      }

      if (toCountArray[toCountArray.length - 1] != 'x') { // dodanie x na końcu - sprawdzić czy potrzebne!
        toCountArray.push('x');
      }

      console.log('1. toCountArray ' + toCountArray);
      if (toCountArray.length > 0) {
        makeACount(toCountArray); // input
      } else {
        console.log('nic nie zostało!');
      }
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