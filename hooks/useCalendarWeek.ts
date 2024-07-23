import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');


export default function useEventCalendarWeek() {
    const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));
    const [date, setDate] = useState(moment());

    useEffect(() => {
        getWeekDaysGrid();
    }, [date])
    const getWeekDaysGrid = () => {
        // Obtenir les jours de la semaine actuelle
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            daysOfWeek.push(currentWeek.clone().add(i, 'days'));
        }
    }
    const changeWeek = (action: 'add' | 'subtr') => {
        if(action === 'add') setCurrentWeek(currentWeek.clone().add(1, 'week'));
        if(action === 'subtr') setCurrentWeek(currentWeek.clone().subtract(1, 'week'));
    } 
    return { 
        date, changeWeek, currentWeek, setCurrentWeek
     };

}