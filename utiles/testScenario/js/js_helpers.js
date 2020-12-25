function setStates() {
    sessionData.previousState = sessionData.state;
}

function setAttempt(n) {
    if (sessionData.statesCounters == null) {
        sessionData.statesCounters = [];
    }
    var stateCounter = null;
    for (var i = 0; i < sessionData.statesCounters.length; i++) {
        if (sessionData.statesCounters[i] === sessionData.previousState) {
            stateCounter = sessionData.statesCounters[i];
            break;
        }
    }
    if (!stateCounter) {
        stateCounter = {
            name: sessionData.prevoiusState,
            maxAttempts: n,
            madeAttempts: 0
        };
        sessionData.statesCounters.push(stateCounter);
    }
}

function isAccValid(acc) {
    if(!acc) return null;
    acc = acc.replace(/\D+/g,'');
    if(acc.length > 10) return 'moreThan10';
    else if(acc.length < 10) return 'lessThan10';
    else return [acc];
}

function verbaliseDateNoTime(date) {
  date = new Date(date);
    var month = {
        "0":"января",
        "1":"февраля",
        "2":"марта",
        "3":"апреля",
        "4":"мая",
        "5":"июня",
        "6":"июля",
        "7":"августа",
        "8":"сентября",
        "9":"октября",
        "10":"ноября",
        "11":"декабря"
    }
    var day = {
        "1":"первого",
        "2":"второго",
        "3":"третьего",
        "4":"четвёртого",
        "5":"пятого",
        "6":"шестого",
        "7":"седьмого",
        "8":"восьмого",
        "9":"девятого",
        "10":"десятого",
        "11":"одиннадцатого",
        "12":"двенадцатого",
        "13":"тринадцатого",
        "14":"четырнадцатого",
        "15":"пятнадцатого",
        "16":"шестнадцатого",
        "17":"семнадцатого",
        "18":"восемнадцатого",
        "19":"девятнадцатого",
        "20":"двадцатого",
        "21":"двадцать первого",
        "22":"двадцать второго",
        "23":"двадцать третьего",
        "24":"двадцать четвёртого",
        "25":"двадцать пятого",
        "26":"двадцать шестого",
        "27":"двадцать седьмого",
        "28":"двадцать восьмого",
        "29":"двадцать девятого",
        "30":"тридцатого",
        "31":"тридцать первого"
    }
    return day[date.getDate()] + " "+ month[date.getMonth()];
}

function balanceToRubles(balance) {
if (!balance) return "0 руб. 00 коп"
if (balance){ 
    if (balance === 0){
        return "0 руб. 00 коп"
    } else {
        balance = (Math.abs(balance).toFixed(2))
        var dotIndex = balance.match( /\./i ).index
        objectForSum = {
          ruble: balance.slice(0, dotIndex) + " руб. ",
          penny: balance.slice(dotIndex + 1, balance.length) + " копеек"
        }
     return objectForSum.ruble + objectForSum.penny
 }
 }
}

function convertMonth(inputDate) {
    var months = {
        'января': 1,
        'февраля': 2,
        'марта': 3,
        'апреля': 4,
        'мая': 5,
        'июня': 6,
        'июля': 7,
        'августа': 8,
        'сентября': 9,
        'октября': 10,
        'ноября': 11,
        'декабря': 12
    };
    var month = inputDate.getMonth() < 11 ? inputDate.getMonth() + 2 : 1;
    var converted = "";
    for (var key in months) {
        if (months[key] == month) {
            converted = key;
        }
    }
    return converted;
}


/*формирование адреса: 
ТЗ - в адресе нет индекса и нет города
дополнительно - название улиц названы в правильном порядке, не содержат сокращений, которые не сможет озвучить бот
если указан только город - говрим только название города в формате "город Москва" 
сокращения для шоссе и переулка озвучивается не корректно - для подстаховки и удобства работы с регулярными выражениям все сокращения для улиц расшифрованы 
если есть в номере дома буквы - отделять, для согласных подставлять Э/А гласные удваивать - напр. АА, реализация пока для 4-х первых букв в алфавите
если есть название населенного пункта, но нет улицы назваем населенный пункт и номер дома/ квартиры
*/
function formAddress(address) {
    if (!address) return ''
    // если есть полный адрес - избавляемся от индекса и города
    var regTown = /([А-я]+|[А-я]+(-|\s)[А-я]+)\s(г|п|с|дер|д|пос)([,.]?)\s|(\s|^)(г|п|с|дер|д|пос)([,.]?)\s((завода)\s[А-я]+|[А-я]+(\s(им\.|имени)\s(((\d+|[А-я]+)\s)?[А-я]+))?|[А-я]+-([А-я]+\s))/gi;
    var resultAddress = address.replace(/\(.+\)/g, '').replace(regTown, '');

    var town = address.match(regTown);

    resultAddress = resultAddress.replace(/,/gi, '').replace(/\s{2,}/gi, ' ');
    //проверяем, есть ли сокращения для улиц, если нет - добавляем
    resultAddress = addStreet(resultAddress);
    // избавляемся от сокращений
    resultAddress = replaceExceptions(resultAddress);
    // формирование корректного порядка слов в названии улицы
    resultAddress = swapStreetName(resultAddress);
    resultAddress = separateNumSym(resultAddress);
    // избавляемся от лишних пробелов по краям
    resultAddress = resultAddress.toLowerCase().trim();
    //удаляем лишние пробелы перед финальным return
    resultAddress = resultAddress.replace(/,/gi, '').replace(/\s{2,}/gi, ' ');
    //фрмируем название населенного пункта, если названия улицы нет
    if(resultAddress.match(/^улица\sд\./gi)) {
        resultAddress = resultAddress.replace('улица', townForm(town[town.length-1])).trim()
    }
    return resultAddress;
}
// замена сокращений у населенных пунктов
function townForm(town) {
    var mapShorts = [
        [/(\s|^)(п.)([,.]?)\s/, ' поселение '],
        [/(\s|^)(пос)([,.]?)\s/, ' посёлок '],
        [/(\s|^)с([,.]?)\s/, ' село '],
        [/(\s|^)дер([,.]?)\s/, ' деревня ']
    ];
    for (var i = 0; i < mapShorts.length; i++) {
        town = town.replace(mapShorts[i][0], mapShorts[i][1]);
    }
    return town
}
function addStreet(address) {
    if(!address.match(/(\s|^)((ул|пер|б-р|бульв|пр-д|пр-к?т|просп|ш|шоссе|пр|наб|усадьба|мкр(-н)?)([,.]?)\s)/gi)) {
        address = address.replace(/((д\.?\s?\d+)[А-я]?(\s|$))/gi, 'ул. $1')
        return address;
    } else  {
        return address;
    }
}
// отделяем номер дома/корпуса/литеры от буквы, чтобы зачитался весь адрес в голосе - весь алфавит кроме Ь Ъ Й
function separateNumSym(address) {
    address = address.replace(/\s{2,}/gi, ' ')
        //удвоение гласных
        .replace(/((д\.?\s?\d+)|(корпус|литера)\s)([ауоыиэяюёе])/gi, '$1 $4$4')
        //согласная +
        .replace(/((д\.?\s?\d+)|(корпус|литера)\s)([цтпзжбвгд])/gi, '$1 $4э')
        //согласная + "а"
        .replace(/((д\.?\s?\d+)|(корпус|литера)\s)([щшхк])/gi, '$1 $4а')
        //"э" + согласная
        .replace(/((д\.?\s?\d+)|(корпус|литера)\s)([срнмфл])/gi, '$1 э$4')
        //"че"
        .replace(/((д\.?\s?\d+)|(корпус|литера)\s)(ч)/gi, '$1 $4е')
        .replace(/\s{2,}/gi, ' ');
    return address
}
//преобраования исключений  - расшифровка сокращений в названиях улиц и преобразование до валидного названия
function replaceExceptions(address) {
    var mapExceptions = [
        [/(\s|^)ул\. звездная\s/gi, 'Звездная улица, '],
        [/(\s|^)40 лет октября ул\.?\s/gi, 'улица сорока лет октября, ']
    ];
    for (var i = 0; i < mapExceptions.length; i++) {
        address = address.replace(mapExceptions[i][0], mapExceptions[i][1]);
    }
    //сразу избавляемся от сокращений
    return replaceShorts(address)
}
// замена сокращений
function replaceShorts(address) {
    var mapShorts = [
        [/(\s|^)ул([,\.]?)\s/, ' улица, '],
        [/(\s|^)пер([,\.]?)\s/, ' переулок, '],
        [/(\s|^)ш([,\.]?)\s/, ' шоссе, '],
        [/(\s|^)(пр-к?т|просп|пр)([,\.]?)\s/, ' проспект, '],
        [/(\s|^)пр-д([,\.]?)\s/, ' проезд, '],
        [/(\s|^)(б-р|бульв)([,\.]?)\s/, ' бульвар, '],
        //корпус/строение, корпус/литера - приводим к одному последнему слову
        [/(\s|^)корп\.стр\./, ' строение '],
        [/(\s|^)корп\.литер/, ' литера '],
        //сокращение корп. с буквами озвучивается неправильно - всегда переводим в полную форму
        [/(\s|^)(корп|к)\./, ' корпус '],
        [/(\s|^)мкр(-н)?\.?/, ' микрорайон, '],
        [/(\s|^)наб\./, ' набережная, ']
    ];
    for (var i = 0; i < mapShorts.length; i++) {
        address = address.replace(mapShorts[i][0], mapShorts[i][1]);
    }
    return address
}
// перестановка слов улица/проспект и названия в зависимости от названия улицы
function swapStreetName(address) {
    if (!address.match(/,/)) return address; 
    else {
        // поиск подстроки из которой можно определить куда ставить слова улица проспект и тд
        var lastNameStreet = address.match(/,/).index;
        var streetWords = address
        .slice(0, lastNameStreet)
        //создание массива
        .split(' ');
        // если последнее слово из массива есть, то работаем дальше, если нет, значит финальное названи уже сформировано
        if (streetWords && ['улица', 'переулок', 'шоссе', 'проспект', 'бульвар', 'проезд'].indexOf(streetWords[streetWords.length - 1]) !== -1) {
            // если последние предпоследнее слово имеет окончание прилагательных, то выходим - финальное название сформировано
            if (['ая', 'ое', 'ий', 'ый', 'яя'].indexOf(streetWords[streetWords.length - 2].slice(-2)) !== -1 || ['ой', 'ин'].indexOf(streetWords[streetWords.length - 2].slice(-2)) !== -1 && (address.match(/проезд|проспект|бульвар|переулок/gi))) {
                return address;
            } else {
                //если условия выше не срабтали, переносим (улица|переулок|шоссе|проспект|бульвар|проезд|набережная|усадьба) в начало названия
                address = address.replace(/(.*\s)(улица|переулок|шоссе|проспект|бульвар|проезд|набережная|усадьба)/gi, '$2 $1');
            }
        }
    }
    return address;
}

function verbaliseAcc(acc) {
  if(!acc) return '';
  return '<say-as type=\"number:digit\">' + acc.slice(0,3) + ' ' + acc.slice(3,6) + ' ' + acc.slice(6,8) + ' ' + acc.slice(8,10) + '</say-as>' ;
}

/*
дефис озвучивается между цифрами, комбинация цифр 3 + остаток, озвучиваются аббревиатуры 
исключения 
- цифры с дефисом, например 18-12345 - озвучиваем без тегов
- аббревиатуру КТ озвучиваем без тегов
- аббревиатуру АВ озвучиваем без тегов с "Э" на конце = АВЭ  

*/
function verbaliseCountNumber(input) {
    if (input) {
        input = input.trim().replace(/\s/g,'');

        input = input.replace(/(\d)(\-)?([а-яА-Я])/g,'$1 $3');
        input = input.replace(/([а-яА-Я])(\-)?(\d)/g,'$1 $3');
        if(input.match(/(кт|ав)/gi)) {
            input = input.match(/(кт)/gi) ? input : input.replace(/(ав)/gi,' $1Э ').toUpperCase();
        } else {
            input =  input.replace(/([а-яА-Я]+)/g,' <say-as interpret-as=\"characters\">$1</say-as> ');
        }
        input = !input.match(/(\d+)(-)(\d+)/gi) ? insertSpaces(input).replace(/(^|\s)(\d\d{0,2}([\d\s]+\d)?)/g,' <say-as type=\"number:digit\">$2</say-as>') : input;
        input = input.trim().replace(/\s{2,}/g,' ');
    }
    return input;
}

//расстановка пробелов по принципу 'по 3 цифры + все остальное'
function insertSpaces(input) {
    if (input) return input.replace(/(\d{3}(?=(?:\d\d?)+(?!\d\d\d)))/g, "$1" + ' ');

}

function isInteger(num) {
    return (num ^ 0) === num;
}

function isMetersValid (indicator){
    sessionData.invalidValue = null;
    sessionData.lastIndicaton = sessionData.lastDat = null;
    var lastIndicaton = 0;
    if(sessionData.countersArray){
       lastIndicaton = (typeof sessionData.count === 'number') ? Number(sessionData.countersArray[sessionData.count].vl_last_indication) : Number(sessionData.countersArray[0].vl_last_indication);verbaliseDateNoTime(sessionData.countersArray[0].date_of_payment)
    }
    indicator = Number(indicator)
    if ((indicator - lastIndicaton) > 50) {
        sessionData.invalidValue = 'more';
        return indicator;
    } else if (lastIndicaton > indicator) {
        sessionData.invalidValue = 'less';
        sessionData.lastIndicaton = isInteger(lastIndicaton) ?  lastIndicaton : String(lastIndicaton.toFixed(2)).replace(/\./, ',');
        sessionData.lastDate = (typeof sessionData.count === 'number') ? verbaliseDateNoTime(sessionData.countersArray[sessionData.count].dt_last_indication) : verbaliseDateNoTime(sessionData.countersArray[0].dt_last_indication)
        return null;
    } 
    return indicator;
}

function getMeters(input) {
    var count = 0;
    var result = input.split(/[А-я]+/gi).filter(function (value) { return value.match(/\d+/) });
    if(result.length > 1) return null;
    result = String(result).replace(/[^(\d+|\.)]/gi, '');
    for (var i = 0; i < result.length; i++) {
        if(result[i].match(/\./gi)) {
            ++count
        }
    }
    if(count>= 2) return null;

    return isMetersValid(result);
}

function verbaliseMeters(meters) {
    var verbMeters = typeof meters === "object" ? meters.$numberLong : String(meters);
    verbMeters = verbMeters.replace(/\./gi, ',');
    return verbMeters;
}

function clearAllData() {
    if (sessionData.userAcc) sessionData.userAcc = null;
    if (sessionData.address) sessionData.address = null;
    if (sessionData.meters) sessionData.meters = null;
    if (sessionData.counterId) sessionData.counterId = null;
    if (sessionData.totalDebt) sessionData.totalDebt = null;
    if (sessionData.invalidValue) sessionData.invalidValue = null;
    if (sessionData.countersArray) sessionData.countersArray = null;
    if (sessionData.dateforMeters) sessionData.dateforMeters = null;
    if (sessionData.lastIndicaton) sessionData.lastIndicaton = null;
    if (sessionData.countersAmount) sessionData.countersAmount = null;
    if (sessionData.isCounterNotMentioned) sessionData.isCounterNotMentioned = null;
    if (sessionData.count) sessionData.count = null;
    if (sessionData.isEnd) sessionData.isEnd = null;

    if (sessionData.checkAccNumberAttempt) sessionData.checkAccNumberAttempt = null;
    if (sessionData.noMatch1Attempt) sessionData.noMatch1Attempt = null;
    if (sessionData.checkMetersAttempt) sessionData.checkMetersAttempt = null;
    if (sessionData.metersOverAttempt) sessionData.metersOverAttempt = null;

    if (sessionData.statesCounters) sessionData.statesCounters = null;
}

/* удалить экранирование и кавычки */
function removeEscapingQuotes(input) {
    return input.replace(/\"/g, '');
}