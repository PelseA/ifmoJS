state: techStates
    title: технические стейты

    state: noMatchWelcome
        title: noMatch
        script:
            setStates();
        q: *, fromState = /welcome
        extend: /hitCount/hitCountMain
        responseData:
            incompletetimeout=1500ms
            completetimeout=1000ms
            wav=true
        if: requestData.resultStatus && requestData.resultStatus === 'noinput'
            a: MOEK_GreetingNoInput.wav
            a: MOEK_GreetingNoInput_1.wav
            a: MOEK_GreetingNoInput_2.wav
        else:
            a: MOEK_GreetingNoMatch.wav
            a: MOEK_GreetingNoMatch_1.wav
            a: MOEK_GreetingNoMatch_2.wav
        go: /welcome

    state: getPUList
        title: получение ифнворамции по счетчикам
        script:
            tempData.isFailedAddress = true;
        externalCall: GetDeviceList
            user_id=$userAcc
            ifSuccess:
                script:
                    sessionData.totalDebt = 0
                    if (eaResult && eaResult.counters && eaResult.user_address) {
                        tempData.isFailedAddress = false;
                        sessionData.address = removeEscapingQuotes(eaResult.user_address);
                        sessionData.countersArray = eaResult.counters;
                        sessionData.countersAmount = sessionData.countersArray.length;
                        if (sessionData.countersArray && sessionData.countersArray[0] && sessionData.countersArray[0].vl_debt) {
                            sessionData.totalDebt = sessionData.countersArray[0].vl_debt;

                        }
                    } else {
                        if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].requestHome = 'operatorNotAvailable';
                    }
        if: tempData.isFailedAddress
            script:
                if (Array.isArray(sessionData.resultStatus) && sessionData.resultStatus[sessionData.rsCounter].requestHome != 'operatorNotAvailable') sessionData.resultStatus[sessionData.rsCounter].requestHome = 'operatorError';
            go!: /techStates/Operator
        if: sessionData.countersAmount === 0
            script:
                if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].requestHome = 'operatorNoLS';
            responseData:
                wav=true
            a: MOEK_NoPU.wav &&
            go!: /techStates/Operator
        stepBack

    state: setMetersMethod
        title: передача показний по счетчикам
        script:
            sessionData.dateforMeters = new Date();
            tempData.isFailed = true;
            tempData.dateForAnswer = convertMonth(sessionData.dateforMeters);
            if (sessionData.meters) tempData.meters = typeof sessionData.meters === "object" ? sessionData.meters.$numberLong : String(sessionData.meters);
        externalCall: setMeters
            counter_id=$counterId
            date=$dateforMeters
            vl_indicator=$meters
            ifSuccess:
                script:
                    tempData.isFailed = false;
        if: tempData.isFailed
            script:
                if (Array.isArray(sessionData.resultStatus) && sessionData.PUId) sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].transferData = 'operatorError';
            go!: /techStates/Operator
        else:
            script:
                if (Array.isArray(sessionData.resultStatus) && sessionData.PUId) sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].transferData = 'success';
            extend: /techStates/counterCycle
            if: sessionData.isEnd
                a: <prosody rate="0.90">Спасибо, <emphasis level="nucleus">ваши</emphasis> показания приняты! Ждем следующую подачу показаний – до 25 $dateForAnswer.</prosody> &&
                go!: /techStates/ejectQ
            else:
                responseData:
                    wav=true
                a: MOEK_IndisOk.wav &&
                go!: /metersOneMore
        stepBack

    state: counterCycle
        title: цикл для предоставления названий счетчика
        script:
            sessionData.isEnd = true;
            if(sessionData.countersAmount > 1) {
                if(sessionData.count !== sessionData.countersAmount-1) {
                    ++sessionData.count
                    if(sessionData.countersArray)sessionData.counterId = sessionData.countersArray[sessionData.count].counter_id;

                    sessionData.PUId = 'PU' + String(sessionData.count+1);
                    sessionData.isEnd = false;
                }                 
            }
        stepBack

    state: Operator
        title: связать с оператором
        script:
            setStates();
            if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].operator = 'init';
        responseData:
            wav=true
        if: tempData.backToContext
            a: MOEK_CantTransferBack.wav
        else:
            if: tempData.addressIncorrect
                a: MOEK_NoAdress.wav
            else:
                a: MOEK_CantTransfer.wav

        state: Operator-noMatch
            title: связать с операторм - noMatch
            q: * 
            extend: /hitCount/hitCountMain
            responseData:
               wav=true
            if: requestData.resultStatus && requestData.resultStatus === 'noinput'
                a: MOEK_CantTransferNoInput.wav
                a: MOEK_CantTransferNoInput_1.wav
                a: MOEK_CantTransferNoInput_2.wav
            else:
                a: MOEK_CantTransferNoMatch.wav
                a: MOEK_CantTransferNoMatch_1.wav
                a: MOEK_CantTransferNoMatch_2.wav
            go: ..

        state: Operator-уes
            title: связать с операторм - да
            q: * (да|конечно|ага|угу|ок*|ok*|валяй*|yes|окей|оки|оу-кей|хорошо|можно|давай*|не (против|возража*)|пожалуй*|переговор*) [можете|можешь] *
            q: [$oneWord] (можете|можешь|хочу|$connecting|давай*|можно|не (против|возража*)) [$oneWord]
            q: * {(отчего|почему) * (не ($chat|*консультир*)|нет)} *
            q: * {(был* (б|бы)) (неплох*|здоров*|крут*|хорош*|прекрасн*|нелишн*|благодарн*|благодарен|не(лишн*|плох*)|полезн*)} * 
            q: * {будет (неплох*|здоров*|крут*|хорош*|прекрасн*|нелишн*|не (лишн*|плох*)|полезн*)} *
            q: * {(буду|будем) [$oneWord] (признательн*|благодарн*|благодарен|признателен)} *
            q: * {(можете|можешь|хочу|давай*|можно|не (против|возража*)|соедини*|соединяй*|готов*|{(был* (б|бы)) (неплох*|здоров*|крут*|хорош*|прекрасн*|не (лишн*|плох*)|нелишн*|полезн*)}|{будет (неплох*|здоров*|крут*|хорош*|прекрасн*|нелишн*|не (лишн*|плох*)|полезн*)}) * ($chat|*консультир*)} * 
            q: [$oneWord] (да|конечно|ага|угу|ок*|ok*|валяй|yes|окей|оки|оу-кей|хорошо) [можете|можешь|хочу] [$oneWord]
            q: * ([$agree|мож*|$need] (*говорить|переведи*|переводи*|перевести|соедини*)) *
            script:
                if (Array.isArray(sessionData.resultStatus) && !tempData.statusNoChange) sessionData.resultStatus[sessionData.rsCounter].operator = 'successYes';
                sessionData.phone2call = '8688907';
            responseData:
                wav=true
                nextAction = goto_url
                url=$phone2call
            a: MOEK_Operator.wav

        state: Operator-no
            title: связать с оператором - нет
            q: * ($refuse|ничем|никак)[не (может*|можешь)] *
            q: * $refuse [не (можете|можешь)|$thanks] *
            q: * $refuse [не (можете|можешь)|$thanks] $bye *
            q: [$thanks|{большое спасибо}] $bye
            q: [$oneWord] (не|нет) [$oneWord] (можете|можешь|хочу|надо|нужн*|нужд*|$connecting) [$oneWord]
            q: {([это] (все|всё)) $thanks} [$bye]
            q: [$oneWord] {$thanks * ((никак*|нет) проблем*|достаточн*|нормальн*)}
            q: [$oneWord] $thanks [$oneWord]
            q: * {[все|всё] (хорошо|замечательно|отлично|прекрасно|супер|правильно|ясно|понятно|ясненько|понятненько|понял|поняла) * $thanks [$bye]}
            q: ([это] (все|всё) [$bye])
            q: {([это] (все|всё)) $thanks} [$bye]
            q: * {(все|всё|спасибо|$thanks|$refuse) * (помог*|помощ*|ничем*)} [$oneWord|$bye]
            q: * [все|всё] (ясно|понятно|ясненько|понятненько|понял|поняла) [$thanks] 
            q: {(спасиб*|спс*|благодар*|ok|ок|ладно|Thank* [you]|сенк*|сеньк*|сэнк*|сэньк*|хорошо|ясно* спасиб*|ясно*|нет вапросов*|нет вопросов*) * (мне|вам|тебе)}
            q: {(спасиб*|спс*|благодар*|ok|ок|ладно|Thank* [you]|сенк*|сеньк*|сэнк*|сэньк*|хорошо|ясно* спасиб*|ясно*|нет вапросов*|нет вопросов*)}
            q: {[$oneWord] (спасиб*|спс*|благодар*)}
            q: {[огромн*|*больш*|очень] (хорош*|отличн*|спасиб*|приятн*|супер|рад*|молодец|благодар*|помогл*)}
            q: {[мне] (понятн*|ясн*) [все|всё]}
            q: [огромн*|*больш*|очень] (спасиб*|благодар*) * (помощ*|ответ*|консультаци*)
            q: * {((буду|будем) [$oneWord] (признательн*|благодарн*|благодарен|признателен)) * (не (перевед*|перевод*|соедин*|свяжи*|будете|будешь|будем|продолж*)|отстан*|отпусти*|разойдем*|оставим|остановим*|прекрати*|сброс*|уйдет*|перестан*|уйдем|уйдешь|уйдете)} *
            q: * {(не $need) * (перевед*|соедини*|соединяй|соединяйте|свяжи*|перевод*|перенести|перенеси|переключ*|нужн*|нужен|связать*|связь|можно|помощь|переведи*|дай*|позови*|*говорить|соединять|переводить|перебивай*) * $operator} *
            q: * {(не (перевед*|соедини*|соединяй|соединяйте|свяжи*|перевод*|перенести|перенеси|переключ*|нужн*|нужен|связать*|связь|можно|помощь|переведи*|дай*|позови*|*говорить|соединять|переводить|перебивай*)) * $operator} *
            q: * {(не $need) * $operator} *
            q: * $refuse $refuse *
            script:
                if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].operator = 'successNo';
            responseData:
                wav=true
                nextAction=end_of_call
            a: MOEK_Bye.wav

    state: ejectQ
        title: остались еще вопросы
        script:
            setStates();
            if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].anyQuestion = 'init';
        responseData:
            wav=true
        a: MOEK_AnyQuestion.wav
        #a: У Вас остались какие-либо вопросы?

        state: ejectQ-noMatch
            title: связать с операторм - noMatch
            q: * 
            extend: /hitCount/hitCountMain
            responseData:
               wav=true
            if: requestData.resultStatus && requestData.resultStatus === 'noinput'
                a: MOEK_AnyQuestionNoInput.wav
                a: MOEK_AnyQuestionNoInput_1.wav
                a: MOEK_AnyQuestionNoInput_2.wav
            else:
                a: MOEK_AnyQuestionNoMatch.wav
                a: MOEK_AnyQuestionNoMatch_1.wav
                a: MOEK_AnyQuestionNoMatch_2.wav
            go: ..

        state: ejectQ-yes
            title: остались еще вопросы - да
            q: * (да|конечно|ага|угу|ок*|ok*|валяй*|yes|окей|оки|оу-кей|хорошо|можно|давай*|не (против|возража*)|остал*|остаются) [можете|можешь] *
            q: {[да] (остал*|остав*)}
            q: [$oneWord] (можете|можешь|хочу|$connecting|давай*|можно|не (против|возража*)) [$oneWord]
            q: * {(отчего|почему) * (не ($chat|*консультир*)|нет)} *
            q: * {(был* (б|бы)) (неплох*|здоров*|крут*|хорош*|прекрасн*|нелишн*|благодарн*|благодарен|не(лишн*|плох*)|полезн*)} * 
            q: * {будет (неплох*|здоров*|крут*|хорош*|прекрасн*|нелишн*|не (лишн*|плох*)|полезн*)} *
            q: * {(буду|будем) [$oneWord] (признательн*|благодарн*|благодарен|признателен)} *
            q: * {(можете|можешь|хочу|давай*|можно|не (против|возража*)|соедини*|соединяй*|готов*|{(был* (б|бы)) (неплох*|здоров*|крут*|хорош*|прекрасн*|не (лишн*|плох*)|нелишн*|полезн*)}|{будет (неплох*|здоров*|крут*|хорош*|прекрасн*|нелишн*|не (лишн*|плох*)|полезн*)}) * ($chat|*консультир*)} * 
            q: [$oneWord] (да|конечно|ага|угу|ок*|ok*|валяй|yes|окей|оки|оу-кей|хорошо) [можете|можешь|хочу] [$oneWord]
            script:
                if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].anyQuestion = 'successYes';
            go!: /techStates/Operator/Operator-уes

        state: ejectQ-no
            title: остались еще вопросы - нет
            q: * ($refuse|ничем|никак)[не (может*|можешь)] *
            q: * $refuse [не (можете|можешь)|$thanks] *
            q: * $refuse [не (можете|можешь)|$thanks] $bye *
            q: [$thanks|{большое спасибо}] $bye
            q: [$oneWord] (не|нет) [$oneWord] (можете|можешь|хочу|надо|нужн*|нужд*|$connecting|остал*) [$oneWord]
            q: {([это] (все|всё)) $thanks} [$bye]
            q: [$oneWord] {$thanks * ((никак*|нет) проблем*|достаточн*|нормальн*)}
            q: [$oneWord] $thanks [$oneWord]
            q: * {[все|всё] (хорошо|замечательно|отлично|прекрасно|супер|правильно|ясно|понятно|ясненько|понятненько|понял|поняла) * $thanks [$bye]}
            q: ([это] (все|всё) [$bye])
            q: {([это] (все|всё)) $thanks} [$bye]
            q: * {(все|всё|спасибо|$thanks|$refuse) * (помог*|помощ*|ничем*)} [$oneWord|$bye]
            q: * [все|всё] (ясно|понятно|ясненько|понятненько|понял|поняла) [$thanks] 
            q: {(спасиб*|спс*|благодар*|ok|ок|ладно|Thank* [you]|сенк*|сеньк*|сэнк*|сэньк*|хорошо|ясно* спасиб*|ясно*|нет вапросов*|нет вопросов*) * (мне|вам|тебе)}
            q: * [$refuse] (спасиб*|спс*|благодар*|ok|ок|ладно|Thank* [you]|сенк*|сеньк*|сэнк*|сэньк*|хорошо|ясно* спасиб*|ясно*|нет вапросов*|нет вопрос*|[это] (все|всё)) *
            q: {[$oneWord] (спасиб*|спс*|благодар*)}
            q: {[огромн*|*больш*|очень] (хорош*|отличн*|спасиб*|приятн*|супер|рад*|молодец|благодар*|помогл*)}
            q: {[мне] (понятн*|ясн*) [все|всё]}
            q: [огромн*|*больш*|очень] (спасиб*|благодар*) * (помощ*|ответ*|консультаци*)
            q: * {((буду|будем) [$oneWord] (признательн*|благодарн*|благодарен|признателен)) * (не (перевед*|перевод*|соедин*|свяжи*|будете|будешь|будем|продолж*)|отстан*|отпусти*|разойдем*|оставим|остановим*|прекрати*|сброс*|уйдет*|перестан*|уйдем|уйдешь|уйдете)} *
            q: * {(не $need) * (перевед*|соедини*|соединяй|соединяйте|свяжи*|перевод*|перенести|перенеси|переключ*|нужн*|нужен|связать*|связь|можно|помощь|переведи*|дай*|позови*|*говорить|соединять|переводить|перебивай*) * $operator} *
            q: * {(не (перевед*|соедини*|соединяй|соединяйте|свяжи*|перевод*|перенести|перенеси|переключ*|нужн*|нужен|связать*|связь|можно|помощь|переведи*|дай*|позови*|*говорить|соединять|переводить|перебивай*)) * $operator} *
            q: * {(не $need) * $operator} *
            q: * [спасиб*] $bye *
            script:
                if (Array.isArray(sessionData.resultStatus)) sessionData.resultStatus[sessionData.rsCounter].anyQuestion = 'successNo';
            responseData:
                wav=true
                nextAction=end_of_call
            a: MOEK_ThnksBye.wav
           # a: Спасибо за обращение. Всего доброго!