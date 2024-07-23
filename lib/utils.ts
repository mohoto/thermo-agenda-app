import moment from "moment";
import { EventsData } from "@/types/EventCalendarTypes";


export const sortEventsByTime = (events: EventsData) => {
    return events.sort((a, b) => {
        // Combiner date et heure pour chaque événement
        const dateTimeA = moment(`${a.heure_installation}`, 'HH:mm');
        const dateTimeB = moment(`${b.heure_installation}`, 'HH:mm');
        
        // Comparer les dates et heures combinées
        return dateTimeA.valueOf() - dateTimeB.valueOf();
    });
  };
