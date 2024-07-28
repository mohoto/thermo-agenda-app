import { Text, View, ScrollView, Modal, Alert, Pressable, TouchableOpacity, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { supabase } from '@/lib/supabase'
import ModalHeures from '@/components/modals/ModalHeures'
import ModalChauffage from '@/components/modals/ModalChauffage'
import ModalStatutClient from '@/components/modals/ModalStatutClient'
import ModalTypeHabitation from '@/components/modals/ModalTypeHabitation'
import { Event } from '@/types/EventCalendarTypes'
import moment from 'moment'
import ModalDate from '@/components/modals/ModalDate'
import FormFieldTextarea from '@/components/FormFieldTextarea'
import planningStore from '@/store/planningStore'



type Props = {  
} 

const EditEvent = (props: Props) => {

  const dateInstallation = planningStore((state: any) => state.dateInstallation);
  console.log("dateInstallation", dateInstallation)
  const setDateInstallation = planningStore((state: any) => state.setDateInstallation);
  const event = planningStore((state: any) => state.event);


  interface FormState {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    adresse: string;
    ville: string;
    code_postal: string;
    surface_habitable: string;
    nombre_radiateur: string;
    commentaires: string;
  }

  const [form, setForm] = useState<FormState>({
      nom: "",
      prenom: "",
      tel: "",
      email: "",
      adresse: "",
      ville: "",
      code_postal: "",
      surface_habitable: "",
      nombre_radiateur: "",
      commentaires: "",
})

  const [loading, setLoading] = useState(false)

  const [modaHeureVisible, setModaHeureVisible] = useState<boolean>(false);
  const [modalStatutVisible, setModalStatutVisible] = useState<boolean>(false);
  const [modalHabitationVisible, setModalHabitationVisible] = useState<boolean>(false);
  const [modalChauffageVisible, setModalChauffageVisible] = useState<boolean>(false);


  const [heureInstallation, setHeureInstallation] = useState<string>("")
  const [heureInstallationError, setHeureInstallationError] = useState<string>("")
  const [statutClient, setStatutClient] = useState<string>("")
  const [statutClientError, setStatutClientError] = useState<string>("")
  const [typeHabitation, setTypeHabitation] = useState<string>("")
  const [typeHabitationError, setTypeHabitationError] = useState<string>("")
  const [typeChauffage, setTypeChauffage] = useState<string>("")
  const [typeChauffageError, setTypeChauffageError] = useState<string>("")

  const [errors, setErrors] = useState<Partial<FormState>>({})
  

  const validateForm = () => {
    let valid = true;
    let newErrors: Partial<FormState> = {

      nom: "",
      prenom: "",
      tel: "",
      email: "",
      adresse: "",
      ville: "",
      code_postal: "",
      surface_habitable: "",
      nombre_radiateur: ""
    };

    for (let field in form) {
      if (field !== 'commentaires' && !form[field as keyof FormState]) {
        newErrors[field as keyof FormState] = "Champs requis";
        valid = false;
      }
    }
    if(heureInstallation === "") {
      valid = false
      setHeureInstallationError("Selectionnez le statut du client")
    }
    if(statutClient === "") {
      valid = false
      setStatutClientError("Selectionnez le statut du client")
    }
    if(typeHabitation === "") {
      valid = false
      setTypeHabitationError("Selectionnez le type d'habitation")
    }
    if(typeChauffage === "") {
      valid = false
      setTypeChauffageError("Selectionnez le smode de chauffage")
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmitForm = async () => {

    if (validateForm()) {
      const { data, error } = await supabase.from('planning').update({
        date_installation: dateInstallation,
        heure_installation: heureInstallation,
        nom: form.nom,
        prenom: form.prenom,
        tel: form.tel,
        email: form.email,
        adresse: form.adresse,
        ville: form.ville,
        code_postal: form.code_postal,
        statut_client: statutClient,
        type_habitation: typeHabitation,
        surface_habitable: form.surface_habitable,
        type_chauffage: typeChauffage,
        nombre_radiateur: form.nombre_radiateur,
        commentaires: form.commentaires,

    }).eq('id', event?.id)
    if (error) {
        Alert.alert("Erreur lors de la modification du rendez-vous")
    } else {
        Alert.alert("Rendez-vous modifié avec succès")
    } 
    }
  }


  useEffect(() => {
    const getEvent = async () => {
        setForm({
            nom: event?.nom,
            prenom: event?.prenom,
            tel: event?.tel,
            email: event?.email,
            adresse: event?.adresse,
            ville: event?.ville,
            code_postal: event?.code_postal,
            surface_habitable: event?.surface_habitable,
            nombre_radiateur: event?.nombre_radiateur,
            commentaires: event?.commentaires
        }) 
        setHeureInstallation(event?.heure_installation)
        setStatutClient(event?.statut_client)
        setTypeHabitation(event?.type_habitation)
        setTypeChauffage(event?.type_chauffage)
    }
    getEvent();
  }, [event])


  const [showPicker, setShowPicker] = useState<boolean>(false)

  return (
    <SafeAreaView>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View className="justify-center w-full h-full px-4 items-center">
                <Text className="text-2xl text-center font-psemibold">Modifier le rendez-vous</Text>
                <View className="w-full">
                    <TouchableOpacity
                    className='w-full'
                    onPress={() => setShowPicker(true)}
                    >
                        <View className="space-y-2 mt-7">
                        <Text className="text-base font-pmedium text-gray-700">Date d'installation</Text>
                        <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
                            <Text className={`${dateInstallation ? "text-gray-700" : "text-[#7b7b8b]"} flex-1 font-psemibold text-base`}>{moment(dateInstallation).format('DD-MM-YYYY')}</Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="w-full">
                    {/* {showPicker && (
                        <DateTimePicker
                        className='w-full bg-red-500'
                        locale="fr-FR"
                        mode="date"
                        value={dateInstallation || new Date()}
                        onChange={handleDateChange}
                        />
                    )} */}
                    <ModalDate dateInstallation={new Date(dateInstallation)} setDateInstallation={setDateInstallation} showPicker={showPicker} setShowPicker={setShowPicker}/>
                </View>
                
                <View className="w-full">
                  <TouchableOpacity
                  className='w-full'
                  onPress={() => setModaHeureVisible(true)}
                  >
                    <View className="space-y-2 mt-7">
                      <Text className="text-base font-pmedium text-gray-700">Heure d'installation</Text>
                      <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
                        <Text className={`${heureInstallation ? "text-gray-700" : "text-[#7b7b8b]"} flex-1 font-psemibold text-base`}>{heureInstallation ? heureInstallation : "Veuillez selectionner"}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {heureInstallationError ? <Text className="text-red-600 mt-2">{heureInstallationError}</Text> : null}
                </View>
                <FormField 
                    title="Nom"
                    value={form.nom}
                    handleChangeText={(e: string) => setForm({...form, nom: e})}
                    otherStyles="mt-7"
                    placeholder="Nom"
                    error={errors.nom}
                />
                <FormField 
                    title="Prenom"
                    value={form.prenom}
                    handleChangeText={(e: string) => setForm({...form, prenom: e})}
                    otherStyles="mt-7"
                    placeholder="Prenom"
                    error={errors.prenom}
                />
                <FormField 
                    title="Telephone"
                    value={form.tel}
                    handleChangeText={(e: string) => setForm({...form, tel: e})}
                    otherStyles="mt-7"
                    placeholder="Telephone"
                    error={errors.tel}
                />
                <FormField 
                    title="Email"
                    value={form.email}
                    handleChangeText={(e: string) => setForm({...form, email: e})}
                    otherStyles="mt-7"
                    keyBordType="email-address"
                    placeholder="Email"
                    error={errors.email}
                />
                <FormField 
                    title="Adresse"
                    value={form.adresse}
                    handleChangeText={(e: string) => setForm({...form, adresse: e})}
                    otherStyles="mt-7"
                    placeholder="Adresse"
                    error={errors.adresse}
                />
                <FormField 
                    title="Ville"
                    value={form.ville}
                    handleChangeText={(e: string) => setForm({...form, ville: e})}
                    otherStyles="mt-7"
                    placeholder="Ville"
                    error={errors.ville}
                />
                <FormField 
                    title="Code postal"
                    value={form.code_postal}
                    handleChangeText={(e: string) => setForm({...form, code_postal: e})}
                    otherStyles="mt-7"
                    placeholder="Code postal"
                    error={errors.code_postal}
                />
                <View className="w-full">
                  <TouchableOpacity
                  className='w-full'
                  onPress={() => setModalStatutVisible(true)}
                  >
                    <View className="space-y-2 mt-7">
                      <Text className="text-base font-pmedium text-gray-700">Statut du client</Text>
                      <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
                        <Text className={`${statutClient ? "text-gray-700" : "text-[#7b7b8b]"} flex-1 font-psemibold text-base`}>{statutClient ? statutClient : "Veuillez selectionner"}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {statutClientError ? <Text className="text-red-600 mt-2">{statutClientError}</Text> : null}
                </View>
                <View className="w-full">
                  <TouchableOpacity
                  className='w-full'
                  onPress={() => setModalHabitationVisible(true)}
                  >
                    <View className="space-y-2 mt-7">
                      <Text className="text-base font-pmedium text-gray-700">Type d'habitation</Text>
                      <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
                        <Text className={`${typeHabitation ? "text-gray-700" : "text-[#7b7b8b]"} flex-1 font-psemibold text-base`}>{typeHabitation ? typeHabitation : "Veuillez selectionner"}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {typeHabitationError ? <Text className="text-red-600 mt-2">{typeHabitationError}</Text> : null}
                </View>
                <FormField 
                    title="Surface"
                    value={form.surface_habitable}
                    handleChangeText={(e: string) => setForm({...form, surface_habitable: e})}
                    otherStyles="mt-7"
                    placeholder="Surface"
                    error={errors.surface_habitable}
                />
                <View className="w-full">
                  <TouchableOpacity
                  className='w-full'
                  onPress={() => setModalChauffageVisible(true)}
                  >
                    <View className="space-y-2 mt-7">
                      <Text className="text-base font-pmedium text-gray-700">Mode de chauffage</Text>
                      <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 focus:border-secondary flex flex-row items-center">
                        <Text className={`${typeChauffage ? "text-gray-700" : "text-[#7b7b8b]"} flex-1 font-psemibold text-base`}>{typeChauffage ? typeChauffage : "Veuillez selectionner"}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {typeChauffageError ? <Text className="text-red-600 mt-2">{typeChauffageError}</Text> : null}
                </View>
                <FormField 
                    title="Nombre de radiateurs"
                    value={form.nombre_radiateur}
                    handleChangeText={(e: string) => setForm({...form, nombre_radiateur: e})}
                    otherStyles="mt-7"
                    keyBordType="number"
                    placeholder="Nombre de radiateurs"
                    error={errors.nombre_radiateur}
                />
                <FormFieldTextarea
                    title="Commentaires"
                    value={form.commentaires}
                    handleChangeText={(e: string) => setForm({...form, commentaires: e})}
                    otherStyles="mt-7"
                    placeholder="Commentaires"
                    error=""
                />
                <CustomButton
                title="Modifier"
                handlePress={handleSubmitForm}
                containerStyles="w-full mt-7 bg-secondary mb-10"
                textStyles="text-white"
                isLoadind={loading}
                />
            </View>
          <ModalStatutClient modalStatutVisible={modalStatutVisible} setModalStatutVisible={setModalStatutVisible} setStatutClient={setStatutClient} /> 
          <ModalTypeHabitation modalHabitationVisible={modalHabitationVisible} setModalHabitationVisible={setModalHabitationVisible} setTypeHabitation={setTypeHabitation}/>
          <ModalChauffage modalChauffageVisible={modalChauffageVisible} setModalChauffageVisible={setModalChauffageVisible} setTypeChauffage={setTypeChauffage}/>
          <ModalHeures modaHeureVisible={modaHeureVisible} setModaHeureVisible={setModaHeureVisible} setHeureInstallation={setHeureInstallation}/>
        </ScrollView>   
    </SafeAreaView>
  )
}

export default EditEvent