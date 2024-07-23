import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'

type Props = {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (text: string) => void;
    otherStyles?: any;
    keyBordType?: any;
    disabled?: boolean;
    error: string | undefined;
}

const FormFieldTextarea = ({title, value, placeholder, handleChangeText ,otherStyles, keyBordType, disabled, error,  ...props}: Props) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium text-gray-900">{title}</Text>
      <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
        <TextInput
        multiline={true} 
        className="flex-1 text-gray-800 font-psemibold text-base"
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        editable={disabled}
        secureTextEntry={title === 'Mot de passe' && !showPassword}
        value={value}
        />
        {title === 'Mot de passe' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <TabBarIcon name="eye" color="gray" size={28}/>
            </TouchableOpacity>
        )}
      </View>
      {error ? <Text className="text-red-600">{error}</Text> : null}
    </View>
  )
}

export default FormFieldTextarea