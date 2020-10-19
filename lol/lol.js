function findSynonymsSpecialities(input) {
  if (input.match(/терапевт|участков/gi)!== null) return ["терапевт", "участковый врач", "участковый", "участковый терапевт"];
  if (input.match(/стоматолог|зубно|дантист/gi) !== null) return ["стоматолог"];
  if (input.match(/офтальмолог|глазно|окулист/gi) !== null) return ["офтальмолог"];
  if (input.match(/эндокринолог/gi) !== null) return ["эндокринолог"];
  if (input.match(/уролог/gi) !== null) return ["уролог"];
  if (input.match(/физиотерапевт/gi) !== null) return ["физиотерапевт"];
  if (input.match(/невролог|невропатолог/gi) !== null) return ["невролог", "невропатолог"];
  if (input.match(/пульмонолог/gi) !== null) return ["пульмонолог", "пульманолог"];
  if (input.match(/лор|отоларинголог|оториноларинголог|ларинголог|/gi) !== null) return ["лор", "лоринголог", "ларинголог", "отолоринголог", "отоларинголог", "оториноларинголог", "оторинолоринголог"];
  else return [];
}

/*
принимаемые аргументы
1.массив строк,
2.объект (в котором будет произведен поиск),
3.строка (ключ, по которому будет происходить сравнение)
4.result = []
*/
function isDoctorAvailable(synonyms, objectResponse, keyName, result) {
  if (typeof objectResponse === "object") {
    for(key in objectResponse) {
      if(objectResponse[key].hasOwnProperty(keyName)) {
        for(i = 0; i < synonyms.length; i++) {
          var reg = new RegExp(objectResponse[key][keyName], "i");
          if(reg.test(synonyms[i])) result.push(objectResponse[key]);
        }
      }
      if(result.length === 0) isDoctorAvailable(synonyms, objectResponse[key], keyName, result);
    }
  }
}

var a = {
  "eaResult": {
    "Body": {
      "getSpecialitiesInfoResponse": {
        "medicalSpeciality": [
          {
            "code": 603,
            "name": "Оториноларинголог"
          },
          {
            "code": 200,
            "name": "Участковый врач"
          },
          {
            "code": 2,
            "name": "Уролог"
          },
          {
            "code": 9,
            "name": "Невролог",
            "onlyByRefferal": true
          }
        ]
      }
    },
    "Header": ""
  },
  "polisNum": "7755610833000058",
  "dateBirthFromPolis": "1983-04-16"
};

var res = [];

var s = findSynonymsSpecialities("лор");

isDoctorAvailable(s, a, 'name', res);

var b = {
  "result1": {
    "result2": {
      "result3": {
        "result4": [
            {
                "result5" :
              [
                {
                  "code": 603,
                  "name": "Оториноларинголог"
                },
                {
                  "code": 200,
                  "name": "Участковый врач"
                },
                {
                  "code": 2,
                  "name": "Уролог"
                },
                {
                  "code": 9,
                  "name": "Невролог",
                  "inner": {
                         "deepKey": "deep"
                  }
                }
              ]
            }
        ]
      }
    }
  }
};

//привести объект b к нормальному виду
var arr = [];
arr.push(b.result1.result2.result3.result4[0].result5);
var res2 = [];
isDoctorAvailable(['deep value'], b, 'deepKey', res2);

/*date markers*/

console.log("======================850-1=====================");
definitions = [
"эта", 
"текущая", 
"настоящая"
];

for (i = 0; i < definitions.length; i++) {
    console.log(definitions[i] + " неделя");    
} 

console.log("======================850-2=====================");
definitions = [
"на этой",
"на текущей",
"на настоящей",
"на следующей", 
"на грядущей", 
"на будующей"
];

for (i = 0; i < definitions.length; i++) {
    console.log(definitions[i] + " неделе");    
} 

console.log("======================850-3=====================");
definitions = [
"за", 
"за эту", 
"в", 
"в эту",
"за настоящую",
"в настоящую",
"за текущую",
"в текущую"
];

for (i = 0; i < definitions.length; i++) {
    console.log(definitions[i] + " неделю");    
}

console.log("======================850-4=====================");
definitions = [
"в конце", 
"к концу", 
"до конца"
];

for (i = 0; i < definitions.length; i++) {
    console.log(definitions[i] + " этой недели");    
}

console.log("======================855-1=====================");
definitions = [
"в будущий", 
"в следующий", 
"в грядущий"
];

var daysMasculine = [
"понедельник",
"вторник",
"четверг"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < daysMasculine.length; j++) {
        console.log(definitions[i] + " " + daysMasculine[j]);   
    } 
}

var daysOther = [
"воскресенье",
"воскресение"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < daysOther.length; j++) {
        console.log(definitions[i] + " " + daysOther[j]);   
    } 
}

definitions = [
"в будущую", 
"в следующую",
"в грядующую"
];

var daysFeminine = [
"среду",
"пятницу",
"субботу"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < daysFeminine.length; j++) {
        console.log(definitions[i] + " " + daysFeminine[j]);   
    } 
}

console.log("======================855-2=====================");

var days = [
"в понедельник",
"во вторник",
"в среду",
"в четверг",
"в пятницу",
"в субботу",
"в воскресенье",
"в воскресение"
];

definitions = [
"на этой",
"на текущей",
"на настоящей",
"на следующей", 
"на грядущей", 
"на будующей"
];

for (i = 0; i < days.length; i++) {
    for (j = 0; j < definitions.length; j++) {
        console.log(days[i] + " " + definitions[j] + " неделе");   
    } 
}

console.log("==========859-1==до преобразования с replaceDayOfWeek()========");
var numbers = [
"тридцать первого",
"тридцатого",
"двадцать девятого",
"двадцать восьмого",
"двадцать седьмого",
"двадцать шестого",
"двадцать пятого",
"двадцать четвертого",
"двадцать четвёртого",
"двадцать третьего",
"двадцать второго",
"двадцать первого",
"двадцатого",
"девятнадцатого",
"восемнадцатого",
"семнадцатого",
"шестнадцатого",
"пятнадцатого",
"четырнадцатого",
"тринадцатого",
"двенадцатого",
"одиннадцатого",
"десятого",
"девятого",
"восьмого",
"седьмого",
"шестого",
"пятого",
"четвертого",
"четвёртого",
"третьего",
"второго",
"первого"
];

var days = [
"в понедельник",
"во вторник",
"в среду",
"в четверг",
"в пятницу",
"в субботу",
"в воскресенье",
"в воскресение",
"сегодня",
"завтра"
];

for (i = 0; i < numbers.length; i++) {
    for (j = 0; j < days.length; j++) {
        console.log(numbers[i] + " " + days[j]);   
    } 
}

console.log("==========859-2=после преобразования с replaceDayOfWeek()==========");

var terms = [
"в первой половине",
"ближе к первой половине",
"во второй половине",
"ближе ко второй половине",
"в первой декаде",
"во второй декаде",
"в третьей декаде",
"в конце",
"к концу",
"ближе к концу",
"в начале",
"ближе к началу",
"в середине",
"к середине",
"ближе к середине"
];
var months = [
"января",
"февраля",
"марта",
"апреля",
"мая",
"июня",
"июля",
"августа",
"сентября",
"октября",
"ноября",
"декабря", 
"месяца",
"этого месяца"
];

for(i = 0; i < terms.length; i++) {
    for(k = 0; k < months.length; k ++) {
         phrase = terms[i] + ' ' + months[k];
         console.log(phrase);
    }
}

console.log("======================940-1=====================");
definitions = [
"в будущем", 
"в следующем", 
"в грядущем",
"в"
];

var months = [
"январе",
"феврале",
"марте",
"апреле",
"мае",
"июне",
"июле",
"августе",
"сентябре",
"октябре",
"ноябре",
"декабре", 
"месяце"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < months.length; j++) {
        console.log(definitions[i] + " " + months[j]);   
    } 
}

console.log("======================940-2=====================");
definitions = [
"ближе к следующему", 
"ближе к грядущему", 
"ближе к будущему",
"ближе к",
"к"
];

var months = [
"январю",
"февралю",
"марту",
"апрелю",
"маю",
"июню",
"июлю",
"августу",
"сентябрю",
"октябрю",
"ноябрю",
"декабрю", 
"месяцу"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < months.length; j++) {
        console.log(definitions[i] + " " + months[j]);   
    } 
}

console.log("======================963-1=====================");

days = [
"в понедельник",
"во вторник",
"в среду",
"в четверг",
"в пятницу",
"в субботу",
"в воскресенье",
"в воскресение",
"сегодня",
"завтра",
"сейчас"
]; 
for (i = 0; i < days.length; i++) {
    console.log(days[i]);   
} 

console.log("======================963-2=====================");
//TODO Вопрос: не предусмотрена для диапозона через [11-13] дней?
console.log("в ближайший день");   
console.log("в ближайшие дни");   
console.log("на ближайших днях");   
console.log("в ближайшие два три дня");   
var daysCount = [
    "два дня",
    "три дня",
    "четыре дня", 
    "пять дней",
    "шесть дней",
    "семь дней",
    "восемь дней",
    "девять дней",
    "десять дней",
    "четырнадцать дней"
];
for (i = 0; i < daysCount.length; i++) {
    console.log("в ближайшие " + daysCount[i]);   
}

console.log("через день");  
daysCount.unshift("один день");
for (i = 0; i < daysCount.length; i++) {
    console.log("через " + daysCount[i]);   
}

console.log("======================963-3=====================");

console.log("в ближайшую неделю");   
console.log("на ближайшей неделе");   
console.log("в ближайшие две три недели");  
var weeksCount = [
    "две недели",
    "три недели",
];
for (i = 0; i < weeksCount.length; i++) {
    console.log("в ближайшие " + weeksCount[i]);   
}

console.log("через неделю");  
weeksCount.unshift("одну неделю");
for (i = 0; i < weeksCount.length; i++) {
    console.log("через " + weeksCount[i]);   
}

console.log("через месяц");  
var monthsCount = [
    "один месяц",
    "два месяца",
    "три месяца",
    "четыре месяца",
    "пять месяцев",
    "шесть месяцев"
];
for (i = 0; i < monthsCount.length; i++) {
    console.log("через " + monthsCount[i]);   
}
console.log("через полгода");  
console.log("через полгодочка");  
console.log("через полгодика");     
console.log("через год");     
console.log("через один год");     
console.log("через годик");     
console.log("через один годик");     
console.log("через годочек");     
console.log("через один годочек");     

console.log("======================963-4=====================");
var terms = [
"в первой половине",
"ближе к первой половине",
"во второй половине",
"ближе ко второй половине",
"в течение",
"во второй декаде",
"в третьей декаде",
"в конце",
"к концу",
"ближе к концу",
"в начале",
"ближе к началу",
"в середине",
"к середине",
"ближе к середине", 
"около"
];
var definitions = ["этой", "текущей", "настоящей", "следующей", "будущей", "грядущей"];

for(i = 0; i < terms.length; i++) {
    for(j = 0; j < definitions.length; j ++) {
        console.log(terms[i] + " " + definitions[j] + " недели");
    }
}

definitions = ["этого", "текущего", "настоящего", "следующего", "будущего", "грядущего"];

for(i = 0; i < terms.length; i++) {
    for(j = 0; j < definitions.length; j ++) {
        console.log(terms[i] + " " + definitions[j] + " месяца");
    }
}

console.log("======================963-5=====================");
numbers = [
"двух",
"трех",
"трёх",
"четырех",
"четырёх",
"пяти",
"шести",
"семи",
"восьми",
"девяти",
"десяти",
"одиннадцати",
"двенадцати",
"тринадцати",
"четырнадцати",
"пятнадцати",
"двадцати",
"тридцати"
];
period = ["дней", "суток"];

console.log("в течение дня");
console.log("в течение одного дня");
console.log("в течение этого дня");
console.log("в течение суток");
console.log("в течение одних суток");
console.log("в течение этих суток");
for(i = 0; i < numbers.length; i++) {
    for(j = 0; j < period.length; j ++) {
        console.log("в течение " + numbers[i] + " " + period[j]);
    }
}

//месяцев
for(i = 0; i <= 6; i++) {
    console.log("около " + numbers[i] + " месяцев");
}
for(i = 0; i <= 6; i++) {
    console.log("в течение " + numbers[i] + " месяцев");
}
console.log("в течение полугода");

console.log("======================963-6=====================");

console.log("в ближайшее время");
console.log("в ближайшем времени");
console.log("в ближайшее будущее");
console.log("в ближайшем будущем");
console.log("в ближайшие сроки");
console.log("в ближайшие дни");
console.log("в максимально короткие сроки");
console.log("в максимально короткое время");
console.log("на днях");
console.log("на неделе");
console.log("скоро");
console.log("сейчас");
console.log("через минуту");
console.log("через час");
console.log("через полчаса");


