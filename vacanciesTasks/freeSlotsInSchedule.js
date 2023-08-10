/*Тестовое задание:
Доктор принимает с 9 утра до 9 вечера.
Часть времени у него занята: приемы, обед, уборка кабинета.
busy = [
	{'start' : '10:30','stop' : '10:50'},
	{'start' : '18:40','stop' : '18:50'},
	{'start' : '14:40','stop' : '15:50'},
	{'start' : '16:40','stop' : '17:20'},
	{'start' : '20:05','stop' : '20:20'}
]
Требуется сформировать список свободных окон по 30 минут.
*/
/**
 * @return Array массив с объектами, {"start": Number <количество минут>, "stop": Number <количество минут>}
 * @param Array slotsInHrs - массив с занятыми слотами {"start": "hh:mm", "stop": "hh:mm"}
 * @param Number startDayHr - начало рабочего дня, число, 9, если 9:00
 * */
function convertSlotsToMinutes(slotsInHrs, startDayHr = 9) {
	let i, startHrs, stopHrs, startMns, stopMns;
	let slotsInMinutes = [];
	let convertedSlots = {};
	for (i = 0; i < slotsInHrs.length; i++) {
		startHrs = Number(slotsInHrs[i].start.substring(0, slotsInHrs[i].start.search(':')));
		stopHrs = Number(slotsInHrs[i].stop.substring(0, slotsInHrs[i].stop.search(':')));
		startMns =  Number(slotsInHrs[i].start.substring(slotsInHrs[i].start.search(':') + 1, slotsInHrs.length));
		stopMns =  Number(slotsInHrs[i].stop.substring(slotsInHrs[i].stop.search(':') + 1, slotsInHrs.length));
		//начало раб дня при конвертации в минуты станет нулем
		convertedSlots = {
			"start" : (startHrs - startDayHr) * 60 + startMns,
			"stop" : (stopHrs - startDayHr) * 60 + stopMns,
		};
		slotsInMinutes.push(convertedSlots);
	}
    //сортировка по "stop"
	slotsInMinutes.sort(function(a, b) {
		return a.stop - b.stop;
	});
	return slotsInMinutes;
}

/**
 * @param String str
 * @return String
 * */
function addZeroIfOneChar(str) {
	return str.length === 1 ? '0' + str : str;
}

function convertSlotsToHrs(slotsInMinutes, startDayHr = 9) {
	let i, startHrs, stopHrs, startMns, stopMns;
	let slotsInHrs = [];
	let convertedSlots = {};
	const strStartHr = addZeroIfOneChar(String(startDayHr));
	for (i = 0; i < slotsInMinutes.length; i++) {
		if (slotsInMinutes[i].start < 60) {
			startHrs = strStartHr;
			startMns = addZeroIfOneChar(String(slotsInMinutes[i].start));
		} else {
			startHrs = addZeroIfOneChar(String(Math.floor(slotsInMinutes[i].start / 60) + startDayHr));
			startMns = addZeroIfOneChar(String(slotsInMinutes[i].start - (startHrs - startDayHr) * 60));
		}
		if (slotsInMinutes[i].stop < 60) {
			stopHrs = strStartHr;
			stopMns = addZeroIfOneChar(String(slotsInMinutes[i].stop));
		}	else {
			stopHrs = addZeroIfOneChar(String(Math.floor(slotsInMinutes[i].stop / 60) + startDayHr));
			stopMns = addZeroIfOneChar(String(slotsInMinutes[i].stop - (stopHrs - startDayHr) * 60));
		}
		convertedSlots = {
			"start": startHrs + ':' + startMns,
			"stop": stopHrs + ':' + stopMns,
		}
		slotsInHrs.push(convertedSlots);
	}
	return slotsInHrs;
}

/**
 * @param Array busySlotsInMns
 * @param Number finishTimeMns завершение рабочего дня (приведенное к минутам)
 * @return Array
 * */
function getFreeRanges(busySlotsInMns, finishTimeMns) {
	let i;
	let potentialSlots = [];
	let convertedSlots = {};
	for (i = 0; i < busySlotsInMns.length; i++) {
		if (i === 0 && busySlotsInMns[i].start > 0) {
			convertedSlots = {
				"start": 0,
				"stop": busySlotsInMns[i].start,
			}
			potentialSlots.push(convertedSlots);
		}
		if (i ===  busySlotsInMns.length - 1) {
			if (busySlotsInMns[i].stop < finishTimeMns) {
				convertedSlots = {
					"start": busySlotsInMns[i].stop,
					"stop": finishTimeMns,
				}
				potentialSlots.push(convertedSlots);
			}
		} else {
			convertedSlots = {
				"start": busySlotsInMns[i].stop,
				"stop": busySlotsInMns[i + 1].start,
			}
			potentialSlots.push(convertedSlots);
		}
	}
	return potentialSlots;
}

/**
 * @param Array freeRanges
 * @param Number durationInMns продолжительность приема в минутах
 * @return Array
 * */
function getFreeSlots(freeRanges, durationInMns) {
	let i, start;
	let freeSlots = [];
	let convertedSlots = {};
	for (i = 0; i < freeRanges.length; i++) {
		start = freeRanges[i].start;
		while (start < freeRanges[i].stop && (start + durationInMns) <= freeRanges[i].stop) {
			convertedSlots = {
				"start": start,
				"stop": start + durationInMns,
			}
			freeSlots.push(convertedSlots);
			start += durationInMns;
		}
	}
	return freeSlots;
}

let busy = [
	{"start": "10:30", "stop": "10:50"}, //90-110
	{"start": "18:40", "stop": "18:50"}, //580-590
	{"start": "14:40", "stop": "15:50"}, //340-410
	{"start": "16:40", "stop": "17:20"}, //460-500
	{"start": "20:05", "stop": "20:20"}, //665-680
]
const finishTimeMns = 720;
let slots = convertSlotsToMinutes(busy, 9);
slots = getFreeRanges(slots, finishTimeMns);
slots = getFreeSlots(slots, 30);
slots = convertSlotsToHrs(slots, 9);
console.log('Свободные слоты: ', slots);
