import { View, Text } from 'react-native'
import React, {useState} from 'react'
import {Picker} from '@react-native-picker/picker';

type Props = {}

const PickerEvent = (props: Props) => {

    const [statutClient, setStatutClient] = useState<string | undefined>("")

    return (
        <View>
            <Picker
                selectedValue={statutClient}
                onValueChange={(itemValue, itemIndex) =>
                    setStatutClient(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    )
}

export default PickerEvent