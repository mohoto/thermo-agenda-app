import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';
import { router } from 'expo-router';


type Props = {
    title: string;
}

const CalendarWeekTitle = ({title}: Props) => {

    const setDateInstallation = async () => {
    
        try {
            const currentDateStored = await AsyncStorage.getItem('date-installation'); 
            
            if(currentDateStored) {
                try {
                    // Merge the new date as JSON
                    const newDate = { "date": title}; // Ensure this is an object
                    //console.log("newDate:", newDate)
                    await AsyncStorage.mergeItem('date-installation', JSON.stringify(newDate));
    
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                try {
                    // Store the date as a JSON object
                    const initialDate = { "date": title};
                    await AsyncStorage.setItem('date-installation', JSON.stringify(initialDate));
    
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log("error:", error)
        }
    }
    useEffect(() => {
        setDateInstallation();
    }, [])
    

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

