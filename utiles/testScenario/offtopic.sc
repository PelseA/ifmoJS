state: offtopic
    title: offtopic

    state: repeat
        title: просьба повторить
        q: * (плохо [вас]|[ничего|совсем] не) (слышу|слышно|*слышал*) *, fromState = /
        q: * (повтори*|(еще|ещё) раз*) *, fromState = /
        q: * {((еще|ещё) раз*) * (скажи*|повтори*|можно|не понял*)} *, fromState = /
        q: * {[ничего|совсем] $dontUnderstand} *, fromState = /
        q: * {(говор*|*скажи*|*сказать|*сказал*) * (*громче*|громк*|тихо)} *, fromState = /
        q: {повтори* [пожалуйста]}, fromState = /
        q: * (что [что]|чего [чего]) [$oneWord] [$oneWord] (сказал*|говорите|говоришь) *, fromState = /
        q: (что [что]|чего [чего]), fromState = /
        go!: /offtopic/backToContext-common

#    state: greetings
#        title: приветствие на первом шаге
#        script:
#            setStates();
#        q: [$oneWord][$oneWord] {[алло][алло]$greeting} [$oneWord][$oneWord], fromState = /welcome
#        q: {[$oneWord] (алло|алле)}, fromState = /welcome
#        extend: /hitCount/hitCountMain
#        script:
#            tempData.repeatQuestion = true;
#        go!: /welcome

    state: hello
        title: отдельные случаи для алло на этапе ожидания
        q: (алло|алле), fromState = /
        script:
            if(sessionData.previousState && sessionData.previousState.match(/-wait/g)){
                tempData.wait = true;
            }
        go!: /offtopic/backToContext-common

    state: whoAreYou
        title: whoAreYou
        q: * {как (вас|тебя) (зовут|звать|называть)} *, fromState = /
        q: * (ваш*|тво*) имя *, fromState = /
        q: * (представьтесь|представься) *, fromState = /
        q: * {(кто|с кем) [я|мы] * (говорит|говорю|разговарива*|общаюсь|общаемся|ты|вы)} *, fromState = /
        q: * кто * ((со|с) ($me|нами)) * (разговарив*|говор*|рассказыв*) *, fromState = /
        q: * (кто|откуда) * (звонит|звоните|звонить) *, fromState = /
        q: * {(не (понима*|пойм*)) * {(кто|откуда) (вы|ты|это) (звони*|говори*)}} *, fromState = /
        q: [$oneWord] {(это $what) [$oneWord] ((кто|$what|кого) [бы|на] улиц*)}[$oneWord], fromState = /
        q: * {(кто|{кто что}) [$oneWord] $you [$oneWord] (такая|такой|такие)} *, fromState = /
        q: [$oneWord]{$you * (куда|откуда|от куда)}[$oneWord], fromState = /
        q: [$oneWord] {((кто|{кто что}|кого) [$oneWord] (это|эти)) [$oneWord] (такой|такая|такие)} [$oneWord], fromState = /
        q: [$oneWord] {(кто|{кто что}|кого) [$oneWord] (это|такой|такие|такая)} [$oneWord], fromState = /
        q: [$oneWord][$oneWord] {(не (понима*|пойм*)) * (кто|кого) это}[$oneWord], fromState = /
        responseData:
            wav=true
        a: Tek_WhoAreYou.wav &&
        go!: /offtopic/backToContext-common

    state: BrutalWords, noChangeState = false
        title: BrutalWords
        q: * {[$you|$robot|$robotName] * [жирн*] ($swearWordsNouns|козлы|козёл)} *, fromState = /
        q: * {(*соси *|дрочи*|драчи*|хуй*|нахуй|заеба*|пошли вы|пошла ты|хуев*|хуёв*|ебан*|охуел*|в баню) * [такой|такая|как]} *, fromState = /
        q: [$oneWord]{$you * (обалдел*|охуел*|офонарел*|охренел*)[(што|что|че|чё) ли]} [$oneWord], fromState = /
        q: * [$you] * (катись|(пошел|пошёл|пошла|иди) ты|(пошли*|идите*) вы|звездуй*|пиздуй*) *, fromState = /
        q: * {(гори|пошл*|(пошёл|пошел) (вы|ты)|звездуй*|пиздуй*|ехай*) * ($preposition0 (ад|аду|ада|адом|аде|адск*))} *, fromState = /
        q: * {$you * (охуел*|охренел*|ахуел*)} *, fromState = /
        q: {как* (*хуй*|хуи*|охуе*|ахуе*|прихуе*|хуё*|*хуев*|*хуя|*хуес*|*хуяр*|*хую|хер*)}, fromState = /
        q: {$what [за] (*хуй*|хуи*|охуе*|ахуе*|прихуе*|хуё*|*хуев*|*хуя|*хуес*|*хуяр*|*хую|хер*|*пизд*|песд*|песдец|писька|влагалище|анус*|звездуй*|дроч*)}, fromState = /
        q: * {(катись|катитесь|*иди*|*идите*|звездуй*|пиздуй*|пошли|пошла|пошёл|пошел|упездыв*|упёздыв*|отвали*|звездой|хотите) * (лесом|$preposition0 (фиг|хер|*хуй*|жоп*|попу)|нафиг|нах*|отсюда|от (сюда|меня|мне)|лесам*|в баню)} *, fromState = /
        q: * (катись|катитесь|звездуй*|пиздуй*|упездыв*|упёздыв*|отвали*|вали*|заколебал*|за колебал*) *, fromState = /
        q: * {(наху*|нахер*|нахрен*|(на|с) (ху*|хер*|хрен*) [ли]|не (нужен|нужн*)) * $me * $robot} *, fromState = /
        q: * {$swearWordsNouns * [$connectToOper]} *, fromState = /
        q: [$oneWord] не (твое*|твоё|твой|свой|своё|свое|ваш|ваше*) * (дело|дела) [$oneWord], fromState = /
        responseData:
            wav=true
        if: !sessionData.beingRudeAttempt
            script:
                sessionData.beingRudeAttempt = true;
            a: Tek_Brutal.wav &&
            go!: /offtopic/backToContext-common
        else:
            go!: /techStates/Operator/Operator-уes

    state: YouAreStupid, noChangeState = false
        title: Вот ты дура
        q: * {[$you|$robot] * {$stupid $swearWordsNouns}} *, fromState = /
        q: * {[$you|$robot] * {(точно|определенно|действительно|по-любому|по любому|ну ты и|такой|очень|совсем|вообще|ваще|что ли|чтоли|самый|самая|капец|$you|$robot) ($stupid|$bad)}} *, fromState = /
        q: * ($stupid [(что|што) ли|чтоли|штоли]|(твоя|ваша) тупость) *, fromState = /
        q: [$oneWord]{[$you|$robot] * (тупиш*|тупит*|бесиш*|бесеш*|бесит|бесят|тупит)}[$oneWord], fromState = /
        q: * {[$you|$robot] * (ни (бум-бум|бум бум))} *, fromState = /
        q: * [$you|$robot] {(нихуя|нихера|нихрена|нифига|ни (хуя|хера|хрена|фига)) * (не (умее*|знае*|може*|слыши*|понимае*))} *, fromState = /
        responseData:
            wav=true
        if: !sessionData.beingRudeAttempt
            script:
                sessionData.beingRudeAttempt = true
            a: Tek_Brutal.wav &&
            go!: /offtopic/backToContext-common
        else:
            go!: /techStates/Operator/Operator-уes

    state: AreYouRobot
        title: Вы робот
        q: * ($you|тыж|это|уже) [не настоящ*|настоящ*] [правда] ((человек|девочка|мальчик|девушка|живая|женщина|реальн*|(реальн*|жив*) человек)|[не] $robot|желез*|настоящ*|не настоящ*|пола|пол*) *, fromState = /
        q: * ((не настоящ*|настоящ*) [правда] (человек|девочка|мальчик|девушка|живая|женщина|реальн*|(реальн*|жив*) человек)|[не] $robot) *, fromState = /
        q: * [у] $you * искус* интел* *, fromState = /
        q: * (я|мы) * (говор*|обща*|разговарив*|вед* диалог) * $robot *, fromState = /
        q: * ($you|тыж) (не (жив*|реальн*|настоящ*)|искусственн*), fromState = /
        q: [а] $you ($robot|инф), fromState = /
        q: [привет|пока] ($robot|инф) , fromState = /
        q: * {$robot * (человек*|везде)} *, fromState = /
        q: * (говорит|говорят|разговаривает|отвечает|разговаривал*|говорил*|*говорить|короче) * ($robot|девочк*|мальчик*|[реальн*|жив*] человек*|братом) *, fromState = /
        q: {[$you|тыж|это|уже] (не (жив*|реальн*|настоящ*)|искусственн*|механическ*) (человек*|девушк*|женщин*) [$talk]}, fromState = /
        q: * {$you [$oneWord] ($operator|[жив*|настоящ*] (человек*|девушк*|женщин*)) * ($robot|запис* голос*)} *, fromState = /
        responseData:
            wav=true
        a: Tek_WhoAreYou.wav &&
        go!: /offtopic/backToContext-common

    state: needOperator
        title: просьба перевести на оператора
        q: * $connectToOper *, fromState = /
        q: * ((перевед*|соедин*|свяжи*|перевод*|переключ*) $me) *, fromState = /
        q: {[$oneWord] ([с|к|на] (оператор*|[жив*|реальн*|настоящ*] человек*|специалист*|справочн* [служб*])) [$oneWord]}, fromState = /
        q: * {($allow|$need|$number) * $connectToOper} *, fromState = /
        q: * {$me * $operator} *, fromState = /
        q: * {($allow|$need|пожалуйста) * (перевед*|соедин*|свяжи*|перевод*|перенести|перенеси|переключ*|нужен|нужно|необходим*|надо|связать*|связь|спросить) * $operator} *, fromState = /
        q: * {($allow|$need|пожалуйста) * ((хочу|хотел*|нужно|надо|должн*|должен) (спросить|узнать)) * $operator} *, fromState = /
        q: {[$oneWord] ($operator|[к] оператору) [меня|мне|я] (давай*|дай|дайте|$need)} *, fromState = /
        q: * {$connectToOper * $utilities * $lackOf} *, fromState = /
        q: * {((не ($need|собираюсь|буду))|зачем) * {(показани*|ничего) (переда*|*диктовать)} * $connectToOper} *, fromState = /
        q: * {(у вас|здесь) ((есть|имеется|$lackOf) [ли]) $operator} *, fromState = /
        if: sessionData.previousState === '/techStates/ejectQ'
            go!: /techStates/ejectQ/ejectQ-yes
        if: sessionData.previousState === '/techStates/Operator'
            go!: /techStates/Operator/Operator-уes
        else:
            if: !sessionData.operator
                script:
                    sessionData.operator = true;  
                responseData:
                    wav=true
                a: MOEK_WantOperator.wav &&
                go!: /offtopic/backToContext-common
            else:
                script:
                    tempData.statusNoChange = true;
                    var status = 'wantOperator';
                    if (Array.isArray(sessionData.resultStatus)) {
                        if (sessionData.resultStatus[sessionData.rsCounter].anyQuestion && sessionData.resultStatus[sessionData.rsCounter].anyQuestion == 'init') sessionData.resultStatus[sessionData.rsCounter].anyQuestion = status; 
                        else if (sessionData.PUId && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof50 && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof50 == 'init') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof50 = status; 
                        else if (sessionData.PUId && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof == 'init') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof = status; 
                        else if (sessionData.PUId && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].requestIndication && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].requestIndication == 'init') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].requestIndication = status; 
                        else if (sessionData.PUId && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].confirmPU && sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].confirmPU == 'init') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].confirmPU = status; 
                        else if (sessionData.resultStatus[sessionData.rsCounter].home && sessionData.resultStatus[sessionData.rsCounter].home == 'init') sessionData.resultStatus[sessionData.rsCounter].home = status;
                        else if (sessionData.resultStatus[sessionData.rsCounter].confirmLS && sessionData.resultStatus[sessionData.rsCounter].confirmLS == 'init') sessionData.resultStatus[sessionData.rsCounter].confirmLS = status;
                        else if (sessionData.resultStatus[sessionData.rsCounter].requestLS && sessionData.resultStatus[sessionData.rsCounter].requestLS == 'init') sessionData.resultStatus[sessionData.rsCounter].requestLS = status;
                    }
                go!: /techStates/Operator/Operator-уes



    state: backToContext-common
        title: Возврат в контекст
        responseData:
           wav=true
        script:
            tempData.backToContext = true;
        if: sessionData.previousState 
            if: sessionData.previousState === '/techStates/noMatchWelcome'
                go!: /welcome
            if: sessionData.previousState === '/getAccNumber/getAccNumber-wait'
                if: tempData.wait
                    responseData:
                        wav=true
                        grammar=http://localhost/theme:ident
                        asrlang=ru-ru2
                        completetimeout=2500ms
                        incompletetimeout=2800ms
                    a: MOEK_ListenLS.wav
                    go!: /getAccNumber
                else:
                    go!: /getAccNumber
            if: sessionData.previousState === '/getAccNumber/getAccNumber-noMatch'
                go!: /getAccNumber
            if: sessionData.previousState === '/getAccNumber/checkAccNumber'
                if: sessionData.userAcc && sessionData.userAcc !== 'invalid'
                    go!: /getAccNumber/checkAccNumber
                else:
                    go!: /getAccNumber/getAccNumber-noMatch
            if: sessionData.previousState === '/getMeters/getMeters-noMatch' 
                go!: /getMeters
            if: sessionData.previousState === '/getMeters/checkMeters' || sessionData.previousState === '/getMeters/checkMeters/checkMeters-noMatch'
                if: sessionData.meters
                    go!: /getMeters/checkMeters
                else:
                   go!: /getMeters/getMeters-noMatch
            else:
                go!: $previousState, defaultValue = /welcome