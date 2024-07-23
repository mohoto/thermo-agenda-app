import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    modalStatutVisible: boolean;
    setModalStatutVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    setStatutClient: (value: string | ((prev: string) => string)) => void;
}

const ModalStatutClient = ({ modalStatutVisible, setModalStatutVisible, setStatutClient }: Props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalStatutVisible}
        >
            <View className="flex-1 justify-center items-center bg-black/50 px-8">
                <View className="bg-white rounded-lg items-center z-10 w-full">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full border-b border-gray-600 justify-center items-center active:bg-secondary"
                        onPress={() => { setStatutClient("Propriétaire"); setModalStatutVisible(!modalStatutVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Propriétaire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full justify-center items-center active:bg-secondary"
                        onPress={() => { setStatutClient("Locataire"); setModalStatutVisible(!modalStatutVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Locataire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalStatutClient