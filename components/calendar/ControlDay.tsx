import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';
import Entypo from '@expo/vector-icons/Entypo';
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
            <Entypo name="chevron-small-left" size={42} color="#6b7280" />
        </TouchableOpacity>
        <Text className={`${isSameDay && "text-blue-700"} font-semibold text-xl`}>{currentDay.format('DD MMMM YYYY')}</Text>
        <TouchableOpacity  
            onPress={() => changeDay('add')}
        >
            <Entypo name="chevron-small-right" size={42} color="#6b7280" />
        </TouchableOpacity>
    </View>
  )
}

export default ControlDay