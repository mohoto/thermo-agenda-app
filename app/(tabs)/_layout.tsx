import { View, Text, Image, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Tabs, Redirect } from 'expo-router'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

/* const TabIcon = ({icon, color, focused, name}) => {
    return (
        <View>
            <Image
            source={}
            />
        </View>
    )
} */

type Props = {

}


const Tabslayout = ({}: Props) => {

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
            name="calendar-day"
            options={{
                title: 'Jour',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <FontAwesome6 name="calendar-days" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name="calendar-week"
            options={{
                title: 'Semaine',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <FontAwesome5 name="calendar" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name="sav"
            options={{
                title: 'SAV',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <Entypo name="tools" size={28} color={color} />
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
            name="installation"
            options={{
                title: 'Installation',
                headerShown: false,
                tabBarIcon:({color, focused}) => (
                    <FontAwesome5 name="check-square" size={28} color={color} />
                )
            }}
        />
      </Tabs>
    </>
  )
}

export default Tabslayout