import { View, Text, Alert, FlatList, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase';
import { EventsData } from '@/types/EventCalendarTypes';
import planningStore from '@/store/planningStore';
import CardReplanifie from '@/components/CardReplanifie';

type Props = {}

const Installation = (props: Props) => {

  const currentTechnicien = planningStore((state: any) => state.currentTechnicien);

  const [evenements, setEvenements] = useState<EventsData>([]);

  useEffect(() => {
    const fetchEvents = async () => {

      if (currentTechnicien) {
        const { data: events, error, status } = await supabase
          .from('planning')
          .select()
          .eq('technicien', currentTechnicien?.id)
          .eq('statut', "A replanifié");

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
    <SafeAreaView className="h-full relative">
      <View>
        <Text className="text-lg text-center py-2 font-pmedium">Rendez-vous à replanifier</Text>
      </View>
      <View>
        <FlatList
          className="px-4 pt-4"
          data={evenements}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CardReplanifie event={item} />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Installation