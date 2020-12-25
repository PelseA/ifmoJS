state: externalCalls
	title: внешние запросы

	state: getOpeningHours
        title: получение режима работы центра
        #externalCall: GetOpeningHours
            #centre_name=$centreName
            #ifSuccess:
                #script:
                    
        #stepBack
        script:
        	if (tempData.centreName == "А") tempData.openingHours = [9, 24];
        	if (tempData.centreName == "Б") tempData.openingHours = []; // круглосуточно или [0, 0];