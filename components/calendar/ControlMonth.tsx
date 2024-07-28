import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment'
import 'moment/locale/fr';
moment.locale('fr');

type Props = {
    changeMonth: (action: 'add' | 'subtr') => void;
    date: moment.Moment;
}

const ControlMonth = ({date, changeMonth}: Props) => {


  return (
    <View className="flex justify-between items-center w-full flex-row">
        <TouchableOpacity  
        onPress={() => changeMonth('subtr')}
        >
            <Entypo name="chevron-small-left" size={42} color="#6b7280" />
        </TouchableOpacity>
        <Text className={`font-semibold text-xl`}>{date.format('MMMM YYYY')}</Text>
        <TouchableOpacity  
            onPress={() => changeMonth('add')}
        >
            <Entypo name="chevron-small-right" size={42} color="#6b7280" />
        </TouchableOpacity>
    </View>
  )
}

export default ControlMonth