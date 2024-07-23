import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utilisateur } from '@/types/EventCalendarTypes';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/CustomButton';
import planningStore from '@/store/planningStore';



const Welcom = () => {
  const { session } = useAuth();
  const user = session?.user;
 // const curentUser = planningStore((state: any) => state.currentUser);

  const [currentUtilisateur, setCurrentUtilisateur] = useState<Utilisateur | null>(null);
  //console.log("currentUtilisateur", currentUtilisateur)
  const [techniciens, setTechniciens] = useState<Utilisateur[]>([])
  //console.log("techniciens", techniciens)
  const [currentTechnicien, setCurrentTechnicien] = useState<Utilisateur>()

  const [asyncDataTechniciens, setAsyncDataTechniciens] = useState(false);
  //console.log("asyncDataTechniciens", asyncDataTechniciens)
  const [asyncDataUtilisateur, setAsyncDataUtilisateur] = useState(false);
  //console.log("asyncDataUtilisateur", asyncDataUtilisateur)


  const getTechniciansInfo = (userId: string, users: Utilisateur[]) => {
    const user = users.find(user => user.userId === userId);
    if (!user || !user.techniciens) return [];
    return user.techniciens.map(technicianId => users.find(user => user.id.toString() === technicianId));
  }


  const handlePressTechnician = async (technician: Utilisateur) => {
    try {
      const currentTechnicien = await AsyncStorage.getItem('technicien');
          if(currentTechnicien) {
            try {
              const jsonValue = JSON.stringify(technician);
              await AsyncStorage.mergeItem('technicien', jsonValue);
  
            } catch (error) {
              console.log(error)
            }
          }
          else {
            try {
              const jsonValue = JSON.stringify(technician);
              await AsyncStorage.setItem('technicien', jsonValue);
  
            } catch (error) {
              console.log(error)
            }
          }
    } catch (error) {
      console.log(error)
    }
    router.push("/calendar-day")
  }



  useEffect(() => {
    
    const fetchUser = async () => {
      const {data: utilisateurs, error} = await supabase
      .from('utilisateurs')
      .select()
      if(error) {
        console.log(error)
      }
      if(utilisateurs) {
        //setTechniciens(getTechniciansInfo(user?.id, utilisateurs))
        const currentUser = utilisateurs.find(user => user.userId === session?.user.id);
        if(currentUser?.techniciens) {
          setTechniciens(currentUser.techniciens.map((technicienId: number) => utilisateurs.find((utilisateur: any) => utilisateur.id === technicienId)))
        }
        setCurrentUtilisateur(utilisateurs?.find((curUser) => curUser.userId === user?.id))
        
        try {
          const currentUser = await AsyncStorage.getItem('utilisateur');
          if(currentUser) {
          
            try {
               //await AsyncStorage.mergeItem('utilisateur', JSON.stringify(utilisateurs?.find(curUser => curUser.userId === user?.id)))
               await AsyncStorage.removeItem('utilisateur');
               await AsyncStorage.setItem('utilisateur', JSON.stringify(utilisateurs?.find(curUser => curUser.userId === user?.id)))
            } catch (error) {
              console.log(error)
            }
          }
          else {
            try {
              await AsyncStorage.setItem('utilisateur', JSON.stringify(utilisateurs?.find(curUser => curUser.userId === user?.id)));
              
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console
        }
      }
    } 
    fetchUser();
  }, []) 

  const handleLogOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
    await supabase.auth.signOut();
    router.push('/sign-in');
  };




  const getTechniciens = async () => {
    try {
      const thechniciens = await AsyncStorage.getItem('techniciens')
      const thehnicienParsed =  thechniciens != null ? JSON.parse(thechniciens) : null;
      setTechniciens(thehnicienParsed)
      setAsyncDataTechniciens(true);
      
    } catch (error) {
      console.log("Aucun technicien trouvé dans AsyncStorage")
    }
  }
  const getCurrentUtilisateur = async () => {
    try {
      const currentUtilisateur = await AsyncStorage.getItem('utilisateur')
      const currentUtilisateurParsed = currentUtilisateur != null ? JSON.parse(currentUtilisateur) : null;
      setCurrentUtilisateur(currentUtilisateurParsed)
      setAsyncDataUtilisateur(true);
    } catch (error) {
      console.log("Aucun utilisateur trouvé dans AsyncStorage")
    }
  }



  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <SafeAreaView className="h-full">
      <View className="w-full h-full mt-12">
        {techniciens && currentUtilisateur && currentUtilisateur.role === "commercial" ? (
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
                onPress={() => handlePressTechnician(currentUtilisateur as Utilisateur)}
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
        </View> */} 
      </View>
    </SafeAreaView>
  );
};

export default Welcom;


