(function() {
  var words = ['яблоко', 'конь', 'машина', 'собака', 'работа', 'коса', 'солнце', 'лгунья',
    'леденец', 'самолет', 'компьютер', 'красота', 'аббатство', 'абсент', 'жевание', 'желтозём',
    'миллиметр', 'припас', 'находчивость', 'ликёр', 'обвязывание', 'катастрофа',
    'ратуша', 'забвение', 'наследование', 'метка', 'тинейджер', 'смысл', 'сейсмолог',
    'квартирант', 'наставление', 'распорядительница', 'осетрина','минускул', 'подзащитный',
    'невменяемость', 'топор', 'зажим', 'осанка', 'каста', 'пристанище', 'сексопатолог',
    'тракторист', 'микрокалькулятор', 'жидкость', 'товарооборот', 'летопись', 'жеребьёвка',
    'том', 'осторожность', 'расположенность', 'принцип', 'торшер', 'тирания',
    'натяжение', 'сновидение', 'мечник', 'селитра', 'регистратура', 'собеседник', 'сатира',
    'подкрепление', 'санкция', 'сапожник', 'подзаголовок', 'мерин', 'редкость',
    'заготовление', 'завязка', 'реверсивность', 'расцветка', 'кафетерий','реверберация',
    'менеджмент', 'жеребятина', 'принцесса', 'первобытность','первокурсник','карлик',
    'заведующий', 'ортодоксальность', 'оазис', 'насвистывание','металлообработка',
    'лжеучёный', 'карта', 'коралл'];

  var randomWord, encryptWord, mistakeCount, turn;

  function init() {
    mistakeCount = 0;
    turn = 0;
    turnCount.innerHTML = turn;
    mistakes.innerHTML = mistakeCount;
    randomWord = getRandomWord(words);
    encryptWord = encryptWord(randomWord);
    text.innerHTML = encryptWord;

    submitBtn.addEventListener('click', clickHandler);
  }

  function clickHandler(e) {
    e.preventDefault();
    if (mistakeCount >= 6) {
      submitBtn.disabled = true;
      loose.innerHTML = "Вы проиграли! Правильный ответ: " + randomWord;
      loose.classList.toggle('invisible');
    }
    if(!!input.value && input.value !== " ") {
      var inSym = input.value.toLowerCase();
      encryptWord = guessTheWord(encryptWord, randomWord, inSym);
      text.innerHTML = encryptWord;
      input.value = '';
    }
    turn++;
    turnCount.innerHTML = turn;
    mistakes.innerHTML = mistakeCount;
  }

  function getRandomWord(words) {
    var index = Math.floor(0 + Math.random() * words.length);
    console.log(index, words[index]);
    return words[index];
  }

  function encryptWord(word) {
    var newWord = word
    .split('')
    .map(function(symbol) {
      return "*";
    });

    return newWord.join(' ');
  }

  function guessTheWord(encWord, word, inSym) {
    var newArr = [];
    var result = [];

    word.split("").forEach(function(item, i) {
      if(item === inSym) newArr.push(i);
    });

    if (newArr.length !== 0) {
      encWord.split(' ').forEach(function(item, i) {
        if (newArr.indexOf(i) != -1) {
          result.push(word.split('')[i]);
        } else {
          result.push(item);
        }
      })
      return result.join(' ');
    } else {
      mistakeCount++;
      drawHangman(mistakeCount);
      return encWord
    }
  }

  function drawHangman(count) {

    var pic = [
      [' ', ' ', ' ', '-', '-', ' ', ' ', ' '],
      [' ', ' ', '', '| ', ' |', ' ', ' ', ' '],
      [' ', ' ', ' ', '-', '-', ' ', ' ', ' '],
      [' ', ' ', ' ', ' |', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', '/|\\', '', ' ', ' ', ' '],
      [' ', ' ', ' /', '|', '\\', ' ', ' ', ' '],
      [' ', ' ', ' ', ' |', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' |', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', '_|_', ' ', ' ', ' ', ' '],
      [' ', ' ', ' /', ' ', '\\ ', ' ', ' ', ' '],
      [' ', ' ', '/', ' ', ' ', '\\ ', ' ', ' '],
      [' ', ' /', ' ', ' ', ' ', '\\', ' ', ' '],
    ];

    if (count) {
      hangImage.innerHTML = pic.map(function(arr) {
        return arr.join(' ');
      }).slice(0,count*2).join('\n');
    }
}

  init();
})();