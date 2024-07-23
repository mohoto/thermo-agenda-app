import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');


export default function useEventCalendarDay() {
    const [currentDay, setCurrentDay] = useState(moment());
    const [date, setDate] = useState(moment());
    
    const changeDay = (action: 'add' | 'subtr') => {
        if(action === 'add') setCurrentDay(currentDay.clone().add(1, 'day'));
        if(action === 'subtr') setCurrentDay(currentDay.clone().subtract(1, 'day'));
    } 
    return { 
        changeDay, currentDay, setCurrentDay, date
     };

}