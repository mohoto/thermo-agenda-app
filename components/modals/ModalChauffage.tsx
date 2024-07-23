import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    modalChauffageVisible: boolean;
    setModalChauffageVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    setTypeChauffage: (value: string | ((prev: string) => string)) => void;
}

const ModalChauffage = ({modalChauffageVisible, setModalChauffageVisible, setTypeChauffage}: Props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalChauffageVisible}
        >
            <View className="flex-1 justify-center items-center bg-black/50 px-8">
                <View className="bg-white rounded-lg items-center z-10 w-full">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full border-b border-gray-600 justify-center items-center active:bg-secondary"
                        onPress={() => { setTypeChauffage("Gaz"); setModalChauffageVisible(!modalChauffageVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Gaz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full border-b border-gray-600 justify-center items-center active:bg-secondary"
                        onPress={() => { setTypeChauffage("Fioul"); setModalChauffageVisible(!modalChauffageVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Fioul</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full border-b border-gray-600 justify-center items-center active:bg-secondary"
                        onPress={() => { setTypeChauffage("PAC eau"); setModalChauffageVisible(!modalChauffageVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">PAC eau</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full justify-center items-center active:bg-secondary"
                        onPress={() => { setTypeChauffage("Electrique"); setModalChauffageVisible(!modalChauffageVisible) }}
                    >
                        <Text className="text-center text-xl font-psemibold py-4">Electrique</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalChauffage