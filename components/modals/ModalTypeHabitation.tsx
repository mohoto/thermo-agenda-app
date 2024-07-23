import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    modalHabitationVisible: boolean;
    setModalHabitationVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    setTypeHabitation: (value: string | ((prev: string) => string)) => void;
}

const ModalTypeHabitation = ({modalHabitationVisible,setModalHabitationVisible, setTypeHabitation }: Props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalHabitationVisible}
        >
            <View className="flex-1 justify-center items-center bg-black/50 px-8">
                <View className="bg-white rounded-lg items-center z-10 w-full">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full border-b border-gray-600 justify-center items-center active:bg-secondary active:text-white"
                        onPress={() => { setTypeHabitation("Maison"); setModalHabitationVisible(!modalHabitationVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Maison</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full justify-center items-center active:bg-secondary"
                        onPress={() => { setTypeHabitation("Appartement"); setModalHabitationVisible(!modalHabitationVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Appartement</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalTypeHabitation