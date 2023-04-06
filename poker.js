const suits = ["пики", "черви", "бубни", "крести"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  // Создаем колоду 52 карты
  let carddeck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      carddeck.push(ranks[j] + " " + suits[i]);
    }
  }

  // Создаем стол из 5 карт
  let bord = [];
  while (bord.length < 5) {
    for (let i = 0; i < 5; i++) {
      bord[i] = carddeck[Math.floor(Math.random() * carddeck.length)];
      bord = bord.filter((val, index) => bord.indexOf(val) === index);
    }
  }
  console.log("На столе: " + bord.join(', '))

  let bordsplit = [];
  let countpeaks = 0;
  let countheart = 0;
  let countclubs = 0;
  let countdiamonds = 0;

  for (let i = 0; i < bord.length; i++) {
    bordsplit[i] = bord[i].split(' ');
    bordsplit[i][1] === "пики" ? countpeaks++ :
      bordsplit[i][1] === "черв" ? countheart++ :
        bordsplit[i][1] === "треф" ? countclubs++ :
          bordsplit[i][1] === "бубн" ? countdiamonds++ :
            false;
  }

  bordsplit = bordsplit.flat(Infinity);
  // Комбинации "пара", "две пары", "сет", "фулл хаус", "карэ"
  let bordrank = [];
  for (let i = 0; i < bordsplit.length; i++) {
    if (i % 2 == 0) {
      bordrank.push(bordsplit[i]);
    }
  }

  let duble = bordrank.filter((val, index) => bordrank.indexOf(val) !== index);

  if (duble.length == 1) {
    let pair = "Пара " + duble[0];
    console.log(pair);
  } else if (duble.length == 2 && duble[0] !== duble[1]) {
    let twopair = "Две пары " + duble[0] + ", " + duble[1];
    console.log(twopair);
  } else if (duble.length == 2 && duble[0] == duble[1]) {
    let set = "Сет " + duble[0];
    console.log(set);
  } else if (duble.length == 3 && (duble[0] !== duble[1] || duble[1] !== duble[2])) {
    let fullhouse = "Фулл хаус"
    console.log(fullhouse);
  } else if (duble.length == 3 && duble[0] == duble[1] && duble[1] == duble[2]) {
    let fourofakind = "Карэ " + duble[0];
    console.log(fourofakind)
  }

  // Комбинации "стрит", "стрит флеш", "флеш", "флеш рояль", "старшая карта"
  let countstraigth = 1;
  let duplestraigth = ranks.filter(val => bordrank.includes(val));
  let straigth1 = ["7", "8", "9", "10", "J"];
  let straigth2 = ["8", "9", "10", "J", "Q"];
  let straigth3 = ["9", "10", "J", "Q", "K"];
  let straigth4 = ["10", "J", "Q", "K", "A"];
  let straigth5 = ["A", "2", "3", "4", "5"];

  for (let i = 0; i < duplestraigth.length; i++) {
    if (duplestraigth[i + 1] - duplestraigth[i] == 1) {
      countstraigth++;
    }
  }

  straigth1 = duplestraigth.filter(val => straigth1.includes(val))
  straigth2 = duplestraigth.filter(val => straigth2.includes(val))
  straigth3 = duplestraigth.filter(val => straigth3.includes(val))
  straigth4 = duplestraigth.filter(val => straigth4.includes(val))
  straigth5 = duplestraigth.filter(val => straigth5.includes(val))
  let straigth = ' ';

  if (straigth4.length == 5 && (countpeaks == 5 || countheart == 5 || countclubs == 5 || countdiamonds == 5)) {
    let royalflush = "Флеш рояль";
    console.log(royalflush);
  } else if ((countstraigth == 5 || straigth1.length == 5 || straigth2.length == 5 || straigth3.length == 5) &&
    (countpeaks == 5 || countheart == 5 || countclubs == 5 || countdiamonds == 5)) {
    let flushstraigth = "Стрит флеш от " + duplestraigth[0] + " до " + duplestraigth[duplestraigth.length - 1];
    console.log(flushstraigth);
  } else if (countpeaks == 5 || countheart == 5 || countclubs == 5 || countdiamonds == 5) {
    let flush = "Флеш";
    console.log(flush)
  } else if (countstraigth == 5 || straigth1.length == 5 || straigth2.length == 5 || straigth3.length == 5 || straigth4.length == 5) {
    straigth = "Стрит от " + duplestraigth[0] + " до " + duplestraigth[duplestraigth.length - 1];
    console.log(straigth);
  } else if (straigth5.length == 5) {
    straigth = "Стрит от " + duplestraigth[duplestraigth.length - 1] + " до " + duplestraigth[duplestraigth.length - 2];
    console.log(straigth);
  } else if (duble.length == 0) {
    if (bordsplit.indexOf(duplestraigth[duplestraigth.length - 1]) !== -1) {
      let highcard = "Старшая карта " + duplestraigth[duplestraigth.length - 1] + " " + bordsplit[bordsplit.indexOf(duplestraigth[duplestraigth.length - 1]) + 1];
      console.log(highcard)
    }
  }