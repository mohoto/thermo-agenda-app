import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

type Props = {
    title: string;
    handlePress: () => void;
    containerStyles?: any;
    textStyles?: any;
    isLoadind?: boolean;
}

const customButton = ({title, handlePress, containerStyles, textStyles, isLoadind}: Props) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoadind ? 'opacity-50' : ''}`}
        disabled={isLoadind}
    >
        <Text className={`text-lg font-psemibold text-primary ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default customButton