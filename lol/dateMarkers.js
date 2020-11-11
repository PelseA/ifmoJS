/*
Множество фраз (маркеры даты) для unverbaliseDateMonth() 

Указание строк вида "======850-1=====" приблизительны
*/
var count = 0;

console.log("======================850-1=====================");
definitions = [
"эта", 
"текущая", 
"настоящая"
];

for (i = 0; i < definitions.length; i++) {
	count+=1;
    console.log(count + ") " + definitions[i] + " неделя");    
} 

console.log("======================850-2=====================");
definitions = [
"на этой",
"на текущей",
"на настоящей",
"на следующей", 
"на грядущей", 
"на будущей"
];

for (i = 0; i < definitions.length; i++) {
    count+=1;
    console.log(count + ") " + definitions[i] + " неделе");    
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
    count+=1;
    console.log(count + ") " + definitions[i] + " неделю");    
}

console.log("======================850-4=====================");
definitions = [
"в конце", 
"к концу", 
"до конца"
];

for (i = 0; i < definitions.length; i++) {
    count+=1;
    console.log(count + ") " + definitions[i] + " этой недели");    
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
        count+=1;
    	console.log(count + ") " + definitions[i] + " " + daysMasculine[j]);   
    } 
}

definitions = [
"в будущее", 
"в следующее", 
"в грядущее"
];

var daysOther = [
"воскресенье",
"воскресение"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < daysOther.length; j++) {
        count+=1;
    	console.log(count + ") " + definitions[i] + " " + daysOther[j]);   
    } 
}

definitions = [
"в будущую", 
"в следующую",
"в грядущую"
];

var daysFeminine = [
"среду",
"пятницу",
"субботу"
];

for (i = 0; i < definitions.length; i++) {
    for (j = 0; j < daysFeminine.length; j++) {
        count+=1;
    	console.log(count + ") " + definitions[i] + " " + daysFeminine[j]);   
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
"на будущей"
];

for (i = 0; i < days.length; i++) {
    for (j = 0; j < definitions.length; j++) {
        count+=1;
    	console.log(count + ") " + days[i] + " " + definitions[j] + " неделе");   
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
        count+=1;
    	console.log(count + ") " + numbers[i] + " " + days[j]);   
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
        count+=1;
    	console.log(count + ") " + phrase);
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
        count+=1;
    	console.log(count + ") " + definitions[i] + " " + months[j]);   
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
        count+=1;
    	console.log(count + ") " + definitions[i] + " " + months[j]);   
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
    count+=1;
    console.log(count + ") " + days[i]);   
} 

console.log("======================963-2=====================");
//TODO Вопрос: не предусмотрена для диапозона через [11-13] дней?
count+=1;
    console.log(count + ") " + "в ближайший день");   
count+=1;
    console.log(count + ") " + "в ближайшие дни");   
count+=1;
    console.log(count + ") " + "на ближайших днях");   
count+=1;
    console.log(count + ") " + "в ближайшие два три дня");   
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
    count+=1;
    console.log(count + ") " + "в ближайшие " + daysCount[i]);   
}

count+=1;
console.log(count + ") " + "через день");  

daysCount.unshift("один день");
for (i = 0; i < daysCount.length; i++) {
    count+=1;
    console.log(count + ") " + "через " + daysCount[i]);   
}

console.log("======================963-3=====================");

count+=1;
console.log(count + ") " + "в ближайшую неделю");   
count+=1;
console.log(count + ") " + "на ближайшей неделе");   
count+=1;
console.log(count + ") " + "в ближайшие две три недели"); 

var weeksCount = [
    "две недели",
    "три недели",
];
for (i = 0; i < weeksCount.length; i++) {
    count+=1;
    console.log(count + ") " + "в ближайшие " + weeksCount[i]);   
}

count+=1;
console.log(count + ") " + "через неделю");

weeksCount.unshift("одну неделю");
for (i = 0; i < weeksCount.length; i++) {
    count+=1;
    console.log(count + ") " + "через " + weeksCount[i]);   
}

count+=1;
console.log(count + ") " + "через месяц");  

var monthsCount = [
    "один месяц",
    "два месяца",
    "три месяца",
    "четыре месяца",
    "пять месяцев",
    "шесть месяцев"
];
for (i = 0; i < monthsCount.length; i++) {
    count+=1;
    console.log(count + ") " + "через " + monthsCount[i]);   
}
count+=1;
    console.log(count + ") " + "через полгода");  
count+=1;
    console.log(count + ") " + "через полгодочка");  
count+=1;
    console.log(count + ") " + "через полгодика");     
count+=1;
    console.log(count + ") " + "через год");     
count+=1;
    console.log(count + ") " + "через один год");     
count+=1;
    console.log(count + ") " + "через годик");     
count+=1;
    console.log(count + ") " + "через один годик");     
count+=1;
    console.log(count + ") " + "через годочек");     
count+=1;
    console.log(count + ") " + "через один годочек");     

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
        count+=1;
    	console.log(count + ") " + terms[i] + " " + definitions[j] + " недели");
    }
}

definitions = ["этого", "текущего", "настоящего", "следующего", "будущего", "грядущего"];

for(i = 0; i < terms.length; i++) {
    for(j = 0; j < definitions.length; j ++) {
        count+=1;
    	console.log(count + ") " + terms[i] + " " + definitions[j] + " месяца");
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

count+=1;
    console.log(count + ") " + "в течение дня");
count+=1;
    console.log(count + ") " + "в течение одного дня");
count+=1;
    console.log(count + ") " + "в течение этого дня");
count+=1;
    console.log(count + ") " + "в течение суток");
count+=1;
    console.log(count + ") " + "в течение одних суток");
count+=1;
    console.log(count + ") " + "в течение этих суток");
for(i = 0; i < numbers.length; i++) {
    for(j = 0; j < period.length; j ++) {
        count+=1;
    	console.log(count + ") " + "в течение " + numbers[i] + " " + period[j]);
    }
}

//месяцев
for(i = 0; i <= 6; i++) {
    count+=1;
    console.log(count + ") " + "около " + numbers[i] + " месяцев");
}
for(i = 0; i <= 6; i++) {
    count+=1;
    console.log(count + ") " + "в течение " + numbers[i] + " месяцев");
}
count+=1;
    console.log(count + ") " + "в течение полугода");

console.log("======================963-6=====================");

count+=1;
    console.log(count + ") " + "в ближайшее время");
count+=1;
    console.log(count + ") " + "в ближайшем времени");
count+=1;
    console.log(count + ") " + "в ближайшее будущее");
count+=1;
    console.log(count + ") " + "в ближайшем будущем");
count+=1;
    console.log(count + ") " + "в ближайшие сроки");
count+=1;
    console.log(count + ") " + "в ближайшие дни");
count+=1;
    console.log(count + ") " + "в максимально короткие сроки");
count+=1;
    console.log(count + ") " + "в максимально короткое время");
count+=1;
    console.log(count + ") " + "на днях");
count+=1;
    console.log(count + ") " + "на неделе");
count+=1;
    console.log(count + ") " + "скоро");
count+=1;
    console.log(count + ") " + "сейчас");
count+=1;
    console.log(count + ") " + "через минуту");
count+=1;
    console.log(count + ") " + "через час");
count+=1;
    console.log(count + ") " + "через полчаса");


