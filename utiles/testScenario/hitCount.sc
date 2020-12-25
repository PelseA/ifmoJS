state: hitCount
    title: hitCount
    
    state: hitCountMain
        title: tech hitCountMain
        script:
            if(sessionData.statesCounters == null) {
                sessionData.statesCounters = [];
            }
            var stateCounter = null;
            var defaultMaxAttempts = 3;
            var i;
            for(i = 0; i < sessionData.statesCounters.length; i++) {
                if(sessionData.statesCounters[i].name == sessionData.previousState) {
                    stateCounter = sessionData.statesCounters[i];
                    break;
                }
            }
            if(!stateCounter) {
                stateCounter = {name: sessionData.previousState, maxAttempts: defaultMaxAttempts, madeAttempts: 0};
            }
            stateCounter.madeAttempts++;
            if(i == sessionData.statesCounters.length) {
                sessionData.statesCounters.push(stateCounter);
            } else {
                sessionData.statesCounters[i] = stateCounter;
            }
            tempData.reachedMaxAttempts = stateCounter.madeAttempts >= stateCounter.maxAttempts;
        if: tempData.reachedMaxAttempts
            script:
                if (Array.isArray(sessionData.resultStatus)) {
                    if (sessionData.previousState && sessionData.previousState == '/getAccNumber/checkAccNumber/checkAccNumber-noMatch') {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter].confirmLS = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter].confirmLS = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState == '/getAccNumber/getAccNumber-byAddress') {
                        sessionData.resultStatus[sessionData.rsCounter].requestLS = 'operatorNoAddress';

                    } else if (sessionData.previousState && sessionData.previousState == '/checkAddress/checkAddress-noMatch') {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter].home = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter].home = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState == '/askCounters/askCounters-noMatch' && sessionData.PUId) {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].confirmPU = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].confirmPU = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState == '/getMeters/getMeters-noMatch' && sessionData.PUId) {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].requestIndication = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].requestIndication = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState == '/getMeters/checkMeters' && sessionData.invalidValue === 'less' && sessionData.PUId) {
                        sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].requestIndication = 'operatorLessExceed';

                    } else if (sessionData.previousState && sessionData.previousState == '/getMeters/checkMeters/checkMeters-noMatch' && sessionData.PUId) {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState == '/metersOver/metersOver-noMatch' && sessionData.PUId) {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof50 = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter][sessionData.PUId].proof50 = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState.match(/operator/gi)) {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter].operator = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter].operator = 'operatorNoMatch';

                    } else if (sessionData.previousState && sessionData.previousState.match(/ejectQ/gi)) {
                        if (requestData.resultStatus && requestData.resultStatus == 'noinput') sessionData.resultStatus[sessionData.rsCounter].anyQuestion = 'operatorNoInput';
                        else sessionData.resultStatus[sessionData.rsCounter].anyQuestion = 'operatorNoMatch';
                    }
                }
            if: sessionData.previousState && sessionData.previousState.match(/Operator|ejectQ/g)
                script:
                    tempData.statusNoChange = true;
                go!: /techStates/Operator/Operator-уes
            go!: /techStates/Operator
        else:
            stepBack