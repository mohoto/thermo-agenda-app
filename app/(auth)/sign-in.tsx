import { View, Text, ScrollView, Image, Alert, AppState } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { supabase } from '@/lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import planningStore from '@/store/planningStore'


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  }) 

type Props = {}

const SignIn = (props: Props) => {


    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { data:user, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
    
        if (error) Alert.alert("Identifiants invalides")
        setLoading(false)

        /* if(user) {
          const {data: utilisateurs, error} = await supabase
          .from('utilisateurs')
          .select()
          if(error) {
            console.log(error)
          }
          if(utilisateurs) {
            const currentUser = utilisateurs.find((utilisateur: any) => utilisateur.userId === user.session?.user.id)
            console.log("currentUser", currentUser)
            //setUser(utilisateurs.find((utilisateur: any) => utilisateur.userId === user.session?.user.id))
            try {
              await AsyncStorage.setItem('utilisateur', JSON.stringify(currentUser)).then((res) => { console.log("currentUser dans login:", res)});
            } catch (error) {
              console.log(error)
            }
            if(currentUser.role === "commercial") {
              const techniciens = currentUser.techniciens.map((technicienId: number) => utilisateurs.find((utilisateur: any) => utilisateur.id === technicienId))
              //console.log("techniciens", techniciens)
              try {
                const jsonValue = JSON.stringify(techniciens);
                await AsyncStorage.setItem('techniciens', jsonValue);
    
              } catch (error) {
                console.log(error)
              }
            }
          }
          
        }  */
      }
    

  return (
    <SafeAreaView className="h-full">
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View className="justify-center w-full h-full px-4 my-2 items-center">
                <Text className="text-2xl text-center mt-4 font-psemibold">Se connecter à Thermo</Text>
                <FormField 
                    title="Email"
                    value={form.email}
                    handleChangeText={(e: string) => setForm({...form, email: e})}
                    otherStyles="mt-7"
                    keyBordType="email-address"
                    placeholder="Email"
                    error=""
                />
                <FormField 
                    title="Mot de passe"
                    value={form.password}
                    handleChangeText={(e: string) => setForm({...form, password: e})}
                    otherStyles="mt-7"
                    placeholder="Mot de passe"
                    error=""
                />
                <CustomButton
                title="Se connecter"
                handlePress={signInWithEmail}
                containerStyles="w-full mt-7 bg-secondary"
                textStyles="text-white"
                isLoadind={loading}
                />
                {/* <View className="justify-center pt-5 items-center">
                    <Link 
                    href="/sign-up"
                    className="font-psemibold tex-lg"
                    >
                        Mot de passe oublié?
                    </Link>
                </View> */}
            </View>
        </ScrollView>   
    </SafeAreaView>
  )
}

export default SignIn