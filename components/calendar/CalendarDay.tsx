import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { sortEventsByTime } from '@/lib/utils';
import RdvCardDay from '@/components/calendar/RdvCardDay'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { EventsData, Event } from '@/types/EventCalendarTypes'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import moment from 'moment'
import planningStore from '@/store/planningStore';

type Props = {
    currentDay: moment.Moment;
}

const CalendarDayRdv = ({ currentDay }: Props) => {

    const currentTechnicien = planningStore((state: any) => state.currentTechnicien);
    const setDateInstallation = planningStore((state: any) => state.setDateInstallation);

    const [evenements, setEvenements] = useState<EventsData>([]);

    const sortedEvents = evenements ? sortEventsByTime(evenements) : [];

    const formatedCurrentDay = currentDay.format('YYYY-MM-DD');

    useEffect(() => {
        const fetchEvents = async () => {
            if (currentTechnicien) {
                const { data: events, error, status } = await supabase
                    .from('planning')
                    .select()
                    .eq('date_installation', formatedCurrentDay)
                    .eq('technicien', currentTechnicien?.id);
                if (error) {
                    Alert.alert(error.message);
                }
                if (events) {
                    setEvenements(events);
                }
            }

        };
        fetchEvents();
        setDateInstallation(currentDay.format('YYYY-MM-DD'));
    }, [currentDay]);

    useEffect(() => {
        const channelInsert = supabase.channel('planning_db_insert')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'planning'
            },
                //(payload: any) => console.log('Change received!', payload.new))
                (payload: any) => setEvenements((prevState) => [...prevState, payload.new as Event]))
            .subscribe();

        return () => {
            supabase.removeChannel(channelInsert)

        }
    }, [supabase, evenements, setEvenements])

    useEffect(() => {

        const channelUpdate = supabase.channel('planning_db_update')
          .on('postgres_changes', { 
              event: 'UPDATE', 
              schema: 'public', 
              table: 'planning' },
              //(payload: any) => console.log('Change received!', payload.new))
              (payload: any) => setEvenements((prevState) => prevState.map(event => 
                event.id === payload.old.id ? payload.new as Event : event)))
              .subscribe(); 
    
      return () => {
        supabase.removeChannel(channelUpdate)
        
      }
    }, [supabase, evenements, setEvenements]) 


    return (
        <>
            <FlatList
                className="px-4 pt-4"
                data={sortedEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <RdvCardDay event={item} index={index} currentDay={currentDay} />
                )}
            />
            <TouchableOpacity
                className="absolute right-5 bottom-6 shadow-2xl bg-[#16539b] p-3 rounded-2xl"
                //</SafeAreaView>onPress={() => {navigation.navigate('/create-event', {otherParam: 'anything you want here'})}
                //onPress={() => {router.navigate('Modal')}
                onPress={() => { router.push("/create-event") }}
            >
                <FontAwesome6 name="plus" size={24} color="white" />
            </TouchableOpacity>
        </>
    )
}

export default CalendarDayRdv