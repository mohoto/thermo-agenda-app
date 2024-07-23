import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';
import useEventCalendarDay from '@/hooks/useCalendarDay';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import useEventCalendarWeek from '@/hooks/useCalendarWeek';
moment.locale('fr');

type Props = {
    changeWeek: (action: 'add' | 'subtr') => void;
    currentWeek: moment.Moment;
}

const ControlWeek = ({currentWeek, changeWeek}: Props) => {


  return (
    <View className="flex justify-between items-center w-full flex-row">
        <TouchableOpacity  
        onPress={() => changeWeek('subtr')}
        >
            <TabBarIcon name="arrow-back-circle-outline" color="#6b7280" size={42}/>
        </TouchableOpacity>
        <Text className={`font-semibold text-xl`}>{currentWeek.format('MMMM YYYY')}</Text>
        <TouchableOpacity  
            onPress={() => changeWeek('add')}
        >
            <TabBarIcon name="arrow-forward-circle-outline" color="#6b7280" size={42}/>
        </TouchableOpacity>
    </View>
  )
}

export default ControlWeek