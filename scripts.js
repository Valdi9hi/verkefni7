/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;
let code = true;
"use strict";
/**
 * Byrja forrit.
 */
function start() {
  'use strict';
  do{
    var input = spurning();
      if (input === 'kóða') {
        let par = dulspurning(input);
        alert(`Niðurstaða:\r\n ${encode(par.strengur,par.n)}`);
      } else if (input === 'afkóða') {
          let par = dulspurning(input);
        alert(`Niðurstaða:\r\n ${decode(par.strengur,par.n)}`);
      } else {
          alert(`Veit ekki hvaða aðgerð ${input} er. Reyndu aftur.`);
          start();
      }
  } while (confirm('Viltu halda áfram?'))
}
 
function spurning(){
  let svar = prompt('Hvort viltu kóða eða afkóða streng');
  return `${svar}`
}

function dulspurning(input){
  let n = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');
  if (n > -1 && n < 33){
    let strengur = prompt(`Hvaða streng viltu ${input}?`);
    var invalid = [];
    for (var i = 0 ;i < strengur.length-1; i++) {
      console.log(LETTERS.indexOf(strengur[i]));
      if (LETTERS.indexOf(strengur[i]) === -1) {
        invalid.push(strengur[i]);
      }
    }
    if (strengur !== null || invalid.length === 0 ){
      return {
        strengur,
        n,
      }
    } else {
        alert(`Þú gafst upp stafi sem ekki er hægt að ${input}: ${invalid.join(', ')}. Reyndu aftur.`);
        start();
    }
  } else {
    alert(`${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
    start();
  } 
}
// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let Caesar = LETTERS.slice(n, LETTERS.length)+LETTERS.slice(0,n-1);
  let code = '';
  for (var i = 0; i < str.length; i++) {
    code += Caesar[LETTERS.indexOf(str[i])];
    console.log(code);
  }
  return code;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let Caesar = LETTERS.slice(n, LETTERS.length)+LETTERS.slice(0,n-1);
  let code = '';
  console.log(Caesar)
  for (var i = 0; i < str.length; i++) {
    code += LETTERS[Caesar.indexOf(str[i])];
    console.log(code);
  }
  return code;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
