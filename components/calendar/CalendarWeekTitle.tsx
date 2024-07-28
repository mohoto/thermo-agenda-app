import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';


type Props = {
    title: string;
}

const CalendarWeekTitle = ({title}: Props) => {


    return (
        <View className="flex flex-row justify-between items-center mt-10">
            <View className="flex-row items-center gap-x-2 mb-2">
              <View className="bg-black rounded-md py-1 px-2">
                <Text className="text-lg font-psemibold text-white text-center bg-black rounded-full">{moment(title, 'YYYY/MM/DD').format('DD')}</Text>
              </View>
              <Text className="text-xl font-psemibold">{moment(title, 'YYYY-MM-DD').format('dddd')}</Text>
            </View>
            {/* <TouchableOpacity
              className="bg-gray-400 rounded-xl p-2"
              //onPress={() => handleCreateEvent(title)}
              onPress={() => {router.push('create-event')}}
            >
              <FontAwesome6 name="plus" size={20} color="white" />
            </TouchableOpacity> */}
        </View>
    )
}

export default CalendarWeekTitle

