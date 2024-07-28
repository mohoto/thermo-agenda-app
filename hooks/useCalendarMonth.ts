"use client"
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');


export default function useEventCalendarMonth() {
    
    const [date, setDate] = useState(moment());

    const changeMonth = (action: 'add' | 'subtr') => {
        if(action === 'add') setDate(date.clone().add(1, 'month'));
        if(action === 'subtr') setDate(date.clone().subtract(1, 'month'));
    } 
    return { 
        date, changeMonth
     };

}