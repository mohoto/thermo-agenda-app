import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';
import useEventCalendarDay from '@/hooks/useCalendarDay';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
moment.locale('fr');

type Props = {
    changeDay: (action: 'add' | 'subtr') => void;
    currentDay: moment.Moment;
}

const ControlDay = ({changeDay, currentDay}: Props) => {
 
    const isSameDay = moment().isSame(currentDay, 'day');
    //Alert.alert(moment(currentDay).format('DD/MM/YYYY'));

  return (
    <View className="flex justify-between items-center w-full flex-row">
        <TouchableOpacity  
        onPress={() => changeDay('subtr')}
        >
            <TabBarIcon name="arrow-back-circle-outline" color="#6b7280" size={42}/>
        </TouchableOpacity>
        <Text className={`${isSameDay && "text-blue-700"} font-semibold text-xl`}>{currentDay.format('DD MMMM YYYY')}</Text>
        <TouchableOpacity  
            onPress={() => changeDay('add')}
        >
            <TabBarIcon name="arrow-forward-circle-outline" color="#6b7280" size={42}/>
        </TouchableOpacity>
    </View>
  )
}

export default ControlDay