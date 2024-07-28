import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import useCalendarMonth from '@/hooks/useCalendarMonth';
import ControlMonth from '@/components/calendar/ControlMonth';
import CalendarMonth from '@/components/calendar/CalendarMonth';

type Props = {}

const RendezVous = (props: Props) => {

  const { changeMonth, date } = useCalendarMonth();
  
  return (
    <SafeAreaView className="h-full relative">
      <View className="justify-center px-4 items-center">
        <View className="pt-2">
          <Text className="text-center text-lg font-psemibold">Mes rendez-vous</Text>
          <ControlMonth date={date} changeMonth={changeMonth} />
        </View>
      </View>
      <View>
        <CalendarMonth date={date}/>
      </View>
    </SafeAreaView>
  )
}

export default RendezVous