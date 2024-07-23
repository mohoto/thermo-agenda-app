import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '@/providers/AuthProvider'

type Props = {}

const Authlayout = (props: Props) => {

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{headerShown: false}}/>
        <Stack.Screen name="sign-up" options={{headerShown: false}}/>
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  )
}

export default Authlayout