import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
    dateInstallation: Date | undefined;
    setDateInstallation: (value: Date | undefined) => void;
    showPicker: boolean;
    setShowPicker: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const ModalDate = ({ dateInstallation, setDateInstallation, showPicker, setShowPicker }: Props) => {

    const [date, setDate] = useState<Date>()

    const handleDateChange = (event: Event, selectedDate: Date | undefined) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            const currentDateFormated = moment(currentDate).format('YYYY-MM-DD')
            setDateInstallation(currentDate);
            setShowPicker(false)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker}
        >
            <View className="flex-1 justify-center bg-black/50 px-8">
                <View className="w-full bg-white z-10 p-20 items-center">
                    <DateTimePicker
                        className='w-full bg-red-500'
                        locale="fr-FR"
                        mode="date"
                        value={dateInstallation || new Date()}
                        onChange={handleDateChange}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ModalDate