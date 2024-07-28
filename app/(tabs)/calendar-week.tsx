import { View, Text, ScrollView, Alert, FlatList, TouchableOpacity, Modal, SectionList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import moment from 'moment'
import ControlWeek from '@/components/calendar/ControlWeek'
import { EventsData } from '@/types/EventCalendarTypes'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import useEventCalendarWeek from '@/hooks/useCalendarWeek'
import { sortEventsByTime } from '@/lib/utils';
import 'moment/locale/fr';
import CalendarWeekTitle from '@/components/calendar/CalendarWeekTitle'
import planningStore from '@/store/planningStore'
moment.locale('fr');


interface GroupedEventData {
  title: string;
  data: EventsData;
}

interface StatutItem {
  value: string;
  label: string;
  bgColor: string;
  textColor?: string;
  colorHexa?: string;
}

const statutItems: StatutItem[] = [
  { value: "Planifié", label: "A replanifié", bgColor: "bg-yellow-600", textColor: "text-yellow-600" },
  { value: "Installé", label: "Installé", bgColor: "bg-green-600", textColor: "text-green-600" },
  { value: "A replanifié", label: "A replanifié", bgColor: "bg-violet-600", textColor: "text-violet-600" },
  { value: "SAV", label: "SAV", bgColor: "bg-orange-600", textColor: "text-orange-600" },
  { value: "Annulé", label: "Annulé", bgColor: "bg-red-600", textColor: "text-red-600" },
  { value: "Incompatible", label: "Incompatible", bgColor: "bg-gray-500", textColor: "text-gray-600" },
]

const getbgColorForStatut = (value: string | undefined): string => {
  const statutItem = statutItems.find(item => item.value === value);
  return statutItem ? statutItem.bgColor : "";
};

type Props = {

}

const CalendarWeek = (props: Props) => {

  const currentTechnicien = planningStore((state: any) => state.currentTechnicien);

  const { currentWeek, setCurrentWeek, changeWeek, date } = useEventCalendarWeek();

  const [evenements, setEvenements] = useState<EventsData>([]);
  // Trier les événements par heures
  const sortedEvents = evenements ? sortEventsByTime(evenements) : [];

  /* useEffect(() => {
    const fetchEvents = async () => {
      const { data: events, error, status } = await supabase
        .from('planning')
        .select();
      if (error) {
        Alert.alert(error.message);
      }
      if (events) {
        setEvenements(events);
      }
    };
    fetchEvents();
  }, []); */



  useEffect(() => {
    const fetchEvents = async () => {
      if (currentTechnicien) {
        const { data: events, error, status } = await supabase
          .from('planning')
          .select()
          //.eq('date_installation', formatedCurrentDay)
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
    // }, [currentWeek]);
  }, []);


  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(currentWeek.clone().add(i, 'days'));
  }


  const dataEvents: GroupedEventData[] = daysOfWeek.map(date => {
    const formattedDate = (date).format('YYYY-MM-DD');
    const eventsForDate = sortedEvents.filter(event => moment(event.date_installation).isSame(date, 'day'));
    return {
      title: formattedDate,
      data: eventsForDate
    };
  });

  const isSameDay = moment().isSame(date, 'day');


  return (
    <SafeAreaView className="h-full relative">
      <View className="justify-center px-4 items-center">
        <View className="mb-4">
          <ControlWeek currentWeek={currentWeek} changeWeek={changeWeek} />
        </View>
      </View>
      <SectionList
        className="px-4"
        sections={dataEvents}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View>
            <View className="my-2 py-2 px-4 rounded-xl bg-white">
              <View className={`${getbgColorForStatut(item.statut)} flex flex-row items-center mb-3 py-1 rounded-lg w-24 justify-center`}>
                {/* <FontAwesome name="stop-circle" size={24} color="white" /> */}
                <Text className="font-medium text-white">{item.statut}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-lg font-psemibold">{item.code_postal}</Text>
                <Text className="text-lg font-psemibold">{item.heure_installation}</Text>
              </View>
              <Text className="text-lg">{item.nom} {item.prenom}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <CalendarWeekTitle title={title} />
        )}
        stickySectionHeadersEnabled={false}
        SectionSeparatorComponent={() => <View className="border-b border-gray-600" />}
      />
    </SafeAreaView>
  )
}

export default CalendarWeek

