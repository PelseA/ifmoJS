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
        if(/двенадцать/i.test(desiredTime)) return [12, 0];
        if(/час/i.test(desiredTime)) return [13, 1];
        if(/два/i.test(desiredTime)) return [14, 2];
        if(/три/i.test(desiredTime)) return [15, 3];
        if(/четыре/i.test(desiredTime)) return [16, 4];
        if(/пять/i.test(desiredTime)) return [17, 5];
        if(/шесть/i.test(desiredTime)) return [18, 6];
        if(/семь/i.test(desiredTime)) return [19, 7];
        if(/восемь/i.test(desiredTime)) return [20, 8];
        if(/девять/i.test(desiredTime)) return [21, 9];
        if(/десять/i.test(desiredTime)) return [22, 10];
        if(/одиннадцать/i.test(desiredTime)) return [23, 11];
        return null;
    }

    isNeedSpecify(desiredTime) {
        if(!desiredTime) return null;
        desiredTime = this.#prepareTime(desiredTime);
        if(!desiredTime) return null; //эта вторая такая же проверка не нравится
        if(this.#checkInclusion(desiredTime)) {
            if((desiredTime[0] === 12 &&  desiredTime[1] === 0) 
            	|| (desiredTime[0] === 13 &&  desiredTime[1] === 1) 
            	|| (desiredTime[0] === 14 &&  desiredTime[1] === 2)
                || (desiredTime[0] === 15 &&  desiredTime[1] === 3) 
                || (desiredTime[0] === 16 &&  desiredTime[1] === 4)) {
                return [TimeHandler.DAY, TimeHandler.NIGHT];
            }
            if((desiredTime[0] === 17 && desiredTime[1] === 5)
            	|| (desiredTime[0] ===18 && desiredTime[1] === 6) 
            	|| (desiredTime[0] ===19 && desiredTime[1] === 7)
                || (desiredTime[0] ===20 && desiredTime[1] === 8)
                || (desiredTime[0] ===21 && desiredTime[1] === 9) 
                || (desiredTime[0] ===22 && desiredTime[1] === 10)
                || (desiredTime[0] ===23 && desiredTime[1] === 11) ) {
                return [TimeHandler.MORNING, TimeHandler.EVENING];
            }
        }
        return false;
    }

    /*desiredTime - это массив*/
    #checkInclusion(desiredTime) {
        if(!desiredTime) return null;
        var hours = this.#allHours();
        return (hours.includes(desiredTime[0]) && hours.includes(desiredTime[1]));
    }

    #allHours() {
        var hours = [];
        for(var i = this._start; i < 24; i++) {
            hours.push(i);
        }
        if(this._end !== 0) {
            for(var i = 0; i <= this._end; i++) {
                hours.push(i);
            }
        }
        console.log(hours);
        return hours;
    }

}