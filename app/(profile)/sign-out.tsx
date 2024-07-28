import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import planningStore from '@/store/planningStore';

type Props = {}

const SignOut = (props: Props) => {

  const removeThechniciens = planningStore((state: any) => state.removeThechniciens);
  const removeStorage = planningStore((state: any) => state.removeStorage);

  //const { user } = useAuth();

  const handleLogOut = async () => {
    removeStorage();
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  return (
    <View className="justify-center w-full px-4 my-2 items-center-">
      {/* <Text>profile</Text>
      <Text>User id: {user?.id}</Text> */}
      <Text className="text-2xl text-center font-medium mt-20 px-8">Se déconnecter de l'application</Text>
      <CustomButton
        title="Se déconnecter"
        handlePress={handleLogOut}
        containerStyles="w-full mt-7 bg-secondary"
        textStyles="text-white"
      />
    </View>
  )
}

export default SignOut