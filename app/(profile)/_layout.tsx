import { View, Text, Image, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Tabs, Redirect } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


type Props = {

}


const Profilelayout = ({}: Props) => {

    const { session } = useAuth();

if (!session) {
  return <Redirect href={'/sign-in'} />;
}

  return (
    <>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#f89d1b',
                tabBarInactiveTintColor: 'black',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 84,
                    paddingBottom: 10,
                }
            }}
        >
        <Tabs.Screen 
            name="rdv"
            options={{
                title: 'Mes rendez-vous',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <Entypo name="users" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name="replanifie"
            options={{
                title: 'A replanifier',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <FontAwesome5 name="calendar-plus" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name="sign-out"
            options={{
                title: 'Se déconnecter',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <FontAwesome name="sign-out" size={28} color={color} />
                )
            }}
        />
      </Tabs>
    </>
  )
}

export default Profilelayout