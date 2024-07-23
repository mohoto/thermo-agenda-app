import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'
import React, {useState} from 'react'

type Heure = {
    value: string;
    label: string;
  }
  
  const generateHeures = (): Heure[] => {
    const heures: Heure[] = [];
    let startHour = 8;
    let startMinute = 0;
  
    while (startHour < 20 || (startHour === 20 && startMinute === 0)) {
      const hourString = startHour.toString().padStart(2, '0');
      const minuteString = startMinute.toString().padStart(2, '0');
      const time = `${hourString}:${minuteString}`;
      heures.push({ value: time, label: time });
  
      // Increment time by 30 minutes
      startMinute += 30;
      if (startMinute === 60) {
        startMinute = 0;
        startHour += 1;
      }
    }
  
    return heures;
  }


type Props = {
    modaHeureVisible: boolean;
    setModaHeureVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    setHeureInstallation: (value: string | ((prev: string) => string)) => void;
}

const ModalHeures = ({modaHeureVisible, setModaHeureVisible, setHeureInstallation}: Props) => {

    const [heures, setHeures] = useState(generateHeures())

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modaHeureVisible}
            >
                <View className="flex-1 justify-center bg-black/50 px-8">
                    <View className="bg-white rounded-lg z-10 w-full h-56">
                        <FlatList
                        data={heures}
                        className="overflow-y-scoll px-20"
                        keyExtractor={(item) => item.value} 
                        renderItem={({item}) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className="border-b border-gray-600 justify-center items-center active:bg-secondary w-full"
                                onPress={() => { setHeureInstallation(item.value); setModaHeureVisible(!modaHeureVisible) }}
                            >
                                <Text className="text-center text-2xl font-psemibold py-4">{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ModalHeures