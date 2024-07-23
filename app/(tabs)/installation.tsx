import { View, Text, Alert, FlatList } from 'react-native'
import React,{useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { EventsData } from '@/types/EventCalendarTypes';
import CardInstalle from '@/components/CardInstalle';

type Props = {}

const Installation = (props: Props) => {

    const [evenements, setEvenements] = useState<EventsData>([]);

    useEffect(() => {
        const fetchEvents = async () => { 
            try {
                const currentTechnicien = await AsyncStorage.getItem('technicien');
                const currentTechnicienParsed = currentTechnicien!= null ? JSON.parse(currentTechnicien) : null;
                if(currentTechnicien) {
                  const { data: events, error, status } = await supabase
                    .from('planning')
                    .select()
                    .eq('technicien', currentTechnicienParsed?.id)
                    .eq('statut', "Installé");

                    if(error) {
                    Alert.alert(error.message);
                    }
                    if (events) {
                    setEvenements(events);
                    }
                }
            } catch (e) {
            console.log(e);
            }
        };
        fetchEvents();
    }, []);

  return (
    <>
        <FlatList 
            className="px-4 pt-4"
            data={evenements}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
                <CardInstalle event={item} />
        )} 
        />
    </>
  )
}

export default Installation