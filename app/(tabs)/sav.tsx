import { View, Text, Alert, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase';
import { EventsData } from '@/types/EventCalendarTypes';
import RdvCardDay from '@/components/calendar/RdvCardDay';
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import planningStore from '@/store/planningStore';
import CardInstalle from '@/components/CardInstalle';

type Props = {}

const Sav = (props: Props) => {

  const currentTechnicien = planningStore((state: any) => state.currentTechnicien);

  const [evenements, setEvenements] = useState<EventsData>([]);

  useEffect(() => {
    const fetchEvents = async () => {

      if (currentTechnicien) {
        const { data: events, error, status } = await supabase
          .from('planning')
          .select()
          .eq('technicien', currentTechnicien?.id)
          .eq('statut', "SAV");

        if (error) {
          Alert.alert(error.message);
        }
        if (events) {
          setEvenements(events);
        }
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
        renderItem={({ item, index }) => (
          <CardInstalle event={item} />
        )}
      />
    </>
  )
}

export default Sav