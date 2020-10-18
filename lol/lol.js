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
//var prepositions = ["к", "в"];
var terms = [
"в первой половине",
"во второй половине",
"в первой декаде",
"во второй декаде",
"в третьей декаде",
"к концу",
"в конце",
"в начале",
"в середине",
"к середине"
];
var definitions = ["этого", "текущего", "следующего", "будущего"];
var periods = ["недели", "месяца", "года"];

var phrase;
for(i = 0; i < terms.length; i++) {
    for(j = 0; j < definitions.length; j ++) {
        for(k = 0; k < periods.length; k ++) {
            phrase = terms[i] + ' ' + definitions[j] + ' ' + periods[k];
            console.log(phrase);
        }
    }
}
console.log("===========================================");
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
"декабря"
];

for(i = 0; i < terms.length; i++) {
    for(k = 0; k < months.length; k ++) {
         phrase = terms[i] + ' ' + months[k];
         console.log(phrase);
    }
}
console.log("===========================================");
definitions = ["этой(-м)", "текущей(-м)", "следующей(-м)", "будущеЙ(-м)"];
periods = ["неделе", "месяце", "году"];
for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < periods.length; j++) {
        console.log("На/в " + definitions[i] + " " + periods[j]);
    }
}
