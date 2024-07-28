import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Link, Redirect, router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utilisateur } from '@/types/EventCalendarTypes';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import planningStore from '@/store/planningStore';



const Welcom = () => {
  const { session } = useAuth();
  const user = session?.user;

  const setCurrentUser = planningStore((state: any) => state.setCurrentUser);
  const setTechniciens = planningStore((state: any) => state.setTechniciens);
  const currentUser = planningStore((state: any) => state.currentUser);
  const techniciens = planningStore((state: any) => state.techniciens);
  const setCurrentTechnicien = planningStore((state: any) => state.setCurrentTechnicien);
  const technicien = planningStore((state: any) => state.technicien);
  const removeStorage = planningStore((state: any) => state.removeStorage);
  



  const handlePressTechnician = async (technician: Utilisateur) => {
    setCurrentTechnicien(technician);
    router.push("/calendar-day")
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data: utilisateurs, error } = await supabase
        .from('utilisateurs')
        .select()
      if (error) {
        console.log(error)
      }
      if (utilisateurs) {
          const currentUtilisateur = utilisateurs.find(utilisateur => utilisateur.userId === user?.id);
          //setCurrentUser(currentUtilisateur)
        if (currentUtilisateur?.techniciens.length > 0) {
          setTechniciens(currentUtilisateur.techniciens.map((technicienId: number) => utilisateurs?.find((utilisateur: any) => utilisateur.id === technicienId)))
        }
      }
    }
    fetchUser();
  }, [currentUser]) 
  

  useEffect(() => {

    const channelUpdate = supabase.channel('utilisateurs')
      .on('postgres_changes', { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'utilisateurs' },
          (payload: any) => console.log('Change received!', payload.new))
          .subscribe(); 

  return () => {
    supabase.removeChannel(channelUpdate)
    
  }
}, [supabase, techniciens, setTechniciens]) 

  const handleLogOut = async () => {
    removeStorage();
    await supabase.auth.signOut();
    router.push('/sign-in');
  };



  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <SafeAreaView className="h-full">
      <View className="w-full h-full mt-12">
        {currentUser.role === "commercial" ? (
          <>
            <View>
              <Text className="text-xl font-medium ml-4">Selectionnez un technicien</Text>
            </View>
            <FlatList
            className="w-full mt-10"
              data={techniciens}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={({item}) => 
                <TouchableOpacity
                className="w-full border-b border-gray-300 py-4 px-4 bg-white flex-row items-center justify-between"
                onPress={() => handlePressTechnician(item)}
                activeOpacity={0.8}
                >
                  <View>
                    <Text className="text-xl font-semibold">{item?.prenom}</Text>
                    <Text className="text-lg font-medium">{item?.secteur}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="black" />

                </TouchableOpacity>
              }
            />
          </>
        ) : (
          <View>
            <TouchableOpacity
                className="w-full border-b border-gray-300 py-4 px-4 bg-white flex-row items-center justify-between"
                onPress={() => handlePressTechnician(currentUser as Utilisateur)}
                >
                  <Text className="text-xl font-semibold">Mon planning</Text>
                  <Ionicons name="chevron-forward" size={24} color="black" />

                </TouchableOpacity>
          </View>
        )}
        {/* <View className="justify-center w-full px-4 my-2 items-center-">
          <Text className="text-2xl text-center font-medium mt-20 px-8">Se déconnecter de l'application</Text>
          <CustomButton
          title="Se déconnecter"
          handlePress={handleLogOut}
          containerStyles="w-full mt-7 bg-secondary"
          textStyles="text-white"
          />
        </View>  */}
      </View>
    </SafeAreaView>
  );
};

export default Welcom;


