import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EventsData } from '@/types/EventCalendarTypes';
import moment from 'moment';
import { supabase } from '@/lib/supabase';
import planningStore from '@/store/planningStore';
import CardRdv from '../CardRdv';

type Props = {
    date: moment.Moment;
}

const CalendarMonth = ({date}: Props) => {

    const currentUser = planningStore((state: any) => state.currentUser);
    const [evenements, setEvenements] = useState<EventsData>([]);

    const filterByMonthAndYear = (installations: EventsData, date: string): EventsData => {
        const targetDate = moment(date, 'MM-YYYY');
      
        return installations.filter(installation => {
          const installationDate = moment(installation.date_installation, 'YYYY-MM-DD');
          return installationDate.isSame(targetDate, 'month');
        });
      };

    useEffect(() => {
        const fetchEvents = async () => {
          //console.log("date:", date.format('MM-YYYY'));
            const { data: events, error, status } = await supabase
              .from('planning')
              .select()
              .eq('commercial', currentUser?.id)
              //.eq('date_installation', date.format('MMMM YYYY'));
    
            if (error) {
              Alert.alert(error.message);
            }
            if (events) {
                const newDate = date.format('MM-YYYY');
                const filteredInstallations = filterByMonthAndYear(events, newDate);
                setEvenements(filteredInstallations);
            }
    
        }
        fetchEvents();
      }, [date]);

  return (
    <>
      <FlatList
        className="px-4 pt-4"
        data={evenements}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CardRdv event={item} />
        )}
      /> 
    </>
  )
}

export default CalendarMonth