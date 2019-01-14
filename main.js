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

  const addASign = function () {
   resultField.textContent += this.textContent;
  }

  const countThis = function () {
   let operators = [];
   let numbers = [];
   let toCount = resultField.textContent;
   if (toCount) {
    console.log(toCount, typeof toCount);
    resultField.textContent = "";
    // for (let i = 0; i < toCount.length; i++) {
    //  if (toCount[i] == "*" || toCount[i] == "/" || toCount[i] == "+" || toCount[i] == "-") {
    //   console.log('operator');
    //  } else {
    //   console.log('cyfra');
    //  }
    // }
    let toCountArray = [...toCount];

    for (let i = 0; i < toCountArray.length; i++) {
     if (toCountArray[i] === "*" || toCountArray[i] === "/" || toCountArray[i] === "+" || toCountArray[i] === "-") {
      operators.push(toCountArray[i]);
     } else {
      numbers.push(toCountArray[i]);
     }
     console.log(`operators ${operators}, numbers${numbers}, tocountarray ${toCountArray}`);
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
