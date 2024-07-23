import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { supabase } from '@/lib/supabase'

type Props = {}

const SignUp = (props: Props) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        })
    
        if (error) Alert.alert(error.message)
        if (session) Alert.alert('Signup ok')
        setLoading(false)
      }

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="justify-center w-full h-full px-4 my-2 items-center">
                <Image
                    source={images.logo}
                    resizeMode='contain'
                    className="w-[115px] h-[35px]"
                />
                <Text className="text-2xl text-white text-center mt-4 font-psemibold">S'inscrire à Aora</Text>
                {/* <FormField 
                    title="Non utilisateur"
                    value={form.email}
                    handleChangeText={(e: string) => setForm({...form, email: e})}
                    otherStyles="mt-7"
                    placeholder="Non utilisateur"
                /> */}
                <FormField 
                    title="Email"
                    value={form.email}
                    handleChangeText={(e: string) => setForm({...form, email: e})}
                    otherStyles="mt-7"
                    keyBordType="email-address"
                    placeholder="Email"
                    error={form.email === "" ? "Ce champ est requis" : ""}
                />
                <FormField 
                    title="Mot de passe"
                    value={form.password}
                    handleChangeText={(e: string) => setForm({...form, password: e})}
                    otherStyles="mt-7"
                    placeholder="Mot de passe"
                    error={form.password === "" ? "Ce champ est requis" : ""}
                />
                <CustomButton
                title="S'inscrire"
                handlePress={() => signUpWithEmail()}
                containerStyles="w-full mt-7 bg-secondary"
                textStyles="text-white"
                isLoadind={loading}
                />
                <View className="justify-center flex-row gap-2 pt-5 items-center">
                    <Text className="text-lg font-pregular text-gray-100">Vous avez un compte?</Text>
                    <Link 
                    href="/calendar-day"
                    className="font-psemibold text-secondary-200 tex-lg"
                    >
                        Se connecter
                    </Link>
                </View>
            </View>
        </ScrollView>   
    </SafeAreaView>
  )
}

export default SignUp