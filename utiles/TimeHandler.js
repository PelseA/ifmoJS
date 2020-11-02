//https://www.youtube.com/watch?v=VrayPysaeGY

/*
если не озвучили время суток(дня, вечера),
если требуется уточнение времени суток (в общепринятых употреблениях).
прием может быть круглосуточным или нет.
Если мы работаем со строкой "Запишите меня на прием в три часа". Если компания
работает в круглосуточном режиме, то потребуется уточнить, "дня" или "ночи".
Вопрос "А врач принимает в восемь?" требует уточнения "утра" или "вечера".
Взависимости от режима требуется уточнение определенного времени. Например, не
требуется уточнять "в три часа дня" или "в три часа ночи", если режим работы
дневной.
*/
/*
Какое время требует уточнения  ?
дня/ночи : одиннадцать(?), двенадцать, час, два, три, четыре
утра/вечера : пять, шесть, семь, восемь, девять, десять, одиннадцать(?)
Какое время не требует уточнения?
Полдень, полночь, с 13 до 24.
*/

class TimeHandler {
    static DAY = 'дня';
    static NIGHT = 'ночи';
    static EVENING = 'вечера';
    static MORNING = 'утра';

    constructor(start, end) {//числа или ничего, если круглосуточно
        this._start = Number(start) || 0;
        this._end = Number(end) || 0;
    }
    get start() { return this._start; }

    get end() { return this._end;  }

    //передаваемый аргумент - строка, например 'одиннадцать'
    #prepareTime(desiredTime) {
        if(/двенадцать/i.test(string)) return [12, 0];
        if(/час/i.test(string)) return [13, 1];
        if(/два/i.test(string)) return [14, 2];
        if(/три/i.test(string)) return [15, 3];
        if(/четыре/i.test(string)) return [16, 4];
        if(/пять/i.test(string)) return [17, 5];
        if(/шесть/i.test(string)) return [18, 6];
        if(/семь/i.test(string)) return [19, 7];
        if(/восемь/i.test(string)) return [20, 8];
        if(/девять/i.test(string)) return [21, 9];
        if(/десять/i.test(string)) return [22, 10];
        if(/одиннадцать/i.test(string)) return [23, 11];
        return null;
    }

    isNeedSpecify(desiredTime) {
        if(!desiredTime) return null;
        if(this.#checkInclusion(desiredTime)) {
            if(desiredTime === [12, 0] || desiredTime === [13, 1] || desiredTime === [14, 2]
                || desiredTime === [15, 3] || desiredTime === [16, 4] ) {
                return [TimeHandler.DAY, TimeHandler.NIGHT];
            }
            if(desiredTime === [17, 5] || desiredTime === [18, 6] || desiredTime === [19, 7]
                || desiredTime === [20, 8] || desiredTime === [21, 9] || desiredTime === [22, 10]
                || desiredTime === [23, 11] ) {
                return [TimeHandler.MORNING, TimeHandler.EVENING];
            }
        }
    }

    /*desiredTime - это массив*/
    #checkInclusion(desiredTime) {
        if(!desiredTime) return null;
        var allHours = this.#allHours;
        return (allHours.includes(desiredTime[0]) && allHours.includes(desiredTime[1]));
    }

    #allHours() {
        var allHours = [];
        for(i = this._start; i < 24; i++) {
            allHours.push(i);
        }
        if(this._end !== 0) {
            for(i = 0; i <= this._end; i++) {
                allHours.push(i);
            }
        }
        return allHours;
    }

}

