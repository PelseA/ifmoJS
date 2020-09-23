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
возвращаемое значение boolean:
false - ни одного слова из массива синонимов не найдено в значениях объекта
true - найдено
*/
function isDoctorAvailable(synonyms, objectResponse, keyName) {
  if (typeof objectResponse === "object") {
    for(key in objectResponse) {
      if (key.toLowerCase() == keyName.toLowerCase()) {
        for(i = 0; i < synonyms.length; i++) {
          if(String(synonyms[i]).trim().toLowerCase() === String(objectResponse[key]).trim().toLowerCase()) {
            //console.log(String(synonyms[i]).trim().toLowerCase() === String(objectResponse[key]).trim().toLowerCase());
            return true;
          }
        }
      }
      isDoctorAvailable(synonyms, objectResponse[key], keyName);
    }
  }
  return false;
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

var synonyms = findSynonymsSpecialities('лор');

isDoctorAvailable([9], a, 'code');
isDoctorAvailable(synonyms, a, 'name');

/*
Не работает функция isDoctorAvailable()
я ожидаю, что сработает условие на 28 строке и функция вернет true.
но она возвращает false.
в закомментированном console.log действительно true => я уверена, что функция должна завершиться и вернуть true.
что я думаю по этому поводу:
1.каким-то образом функция заканчивает свое выполнение с false раньше, чем закончится итерация.
2.я допустила логическую ошибку
3.может, это замыкание?
4


*/
