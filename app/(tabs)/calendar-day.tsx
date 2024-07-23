import { View, Text, ScrollView, Alert, FlatList, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import ControlDay from '@/components/calendar/ControlDay'
import useEventCalendarDay from '@/hooks/useCalendarDay'
import CalendarDayRdv from '@/components/calendar/CalendarDay'


type Props = {

}

const CalendarDay = ({ }: Props) => {

  const { currentDay, setCurrentDay, changeDay, date } = useEventCalendarDay();
  

  return (
    <SafeAreaView className="h-full relative">
      <View className="justify-center px-4 items-center">
        <View className="mb-4">
          <ControlDay currentDay={currentDay} changeDay={changeDay} />
        </View>
      </View>
      <CalendarDayRdv currentDay={currentDay} />
    </SafeAreaView>
  )
}

export default CalendarDay