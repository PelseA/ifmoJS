#корневая тема
theme: /       
    title: Корневая тема
    a: Добрый день! Вы позвонили на линию записи на прием. Чем я могу помочь?

    state: welcome
        title: welcome
        script:
            setStates();        
        q: welcome_prompt
        responseData:
            wav=true
            incompletetimeout=1500ms
            completetimeout=1000ms 
        if: !sessionData.greeting
            script:
                sessionData.greeting = true;
                sessionData.resultStatus = [{}];
        a: Добрый день! Вы позвонили на линию записи на прием. Чем я могу помочь?

        state: want-apply
            title: просьба записаться
            q: * запи* на (прием|приём) *
            a: Вы хотите записаться в центр А или в центр Б?

            state: want-apply-A
                title: в центр А
                q: * центр* а *
                script:
                    sessionData.centreName = "А"
                # получить режим работы центра А
                extend: /externalCalls/getOpeningHours
                go!: /desiredTime
                
            state: want-apply-B
                title: в центр Б
                q: * центр* б *
                script:
                    sessionData.centreName = "Б"
                # получить режим работы центра Б
                extend: /externalCalls/getOpeningHours
                go!: /desiredTime

        state: desiredTime
            title: на какое время записаться
            a: На какое время вы желаете записаться?

            
