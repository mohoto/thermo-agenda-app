import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment'
import 'moment/locale/fr';
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
            <Entypo name="chevron-small-left" size={42} color="#6b7280" />
        </TouchableOpacity>
        <Text className={`font-semibold text-xl`}>{currentWeek.format('MMMM YYYY')}</Text>
        <TouchableOpacity  
            onPress={() => changeWeek('add')}
        >
            <Entypo name="chevron-small-right" size={42} color="#6b7280" />
        </TouchableOpacity>
    </View>
  )
}

export default ControlWeek