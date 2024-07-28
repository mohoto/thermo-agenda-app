import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import FormField from '../FormField';
import CustomButton from '../CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/EventCalendarTypes';
import planningStore from '@/store/planningStore';

interface StatutItem {
    value: string;
    label: string;
    bgColor: string;
    textColor?: string;
  }
  
  const statutItems: StatutItem[] = [
    {value: "Planifié", label: "A replanifié", bgColor: "bg-yellow-600", textColor: "text-yellow-600"},
    {value: "Installé", label: "Installé", bgColor: "bg-green-600", textColor: "text-green-600"},
    {value: "A replanifié", label: "A replanifié", bgColor: "bg-violet-600", textColor: "text-violet-600"},
    {value: "SAV", label: "SAV", bgColor: "bg-orange-600", textColor: "text-orange-600"},
    {value: "Annulé", label: "Annulé", bgColor: "bg-red-600", textColor: "text-red-600"},
    {value: "Incompatible", label: "Incompatible", bgColor: "bg-gray-500", textColor: "text-gray-600"},
  ]
  
  const getbgColorForStatut = (value: string): string => {
    const statutItem = statutItems.find(item => item.value === value);
    return statutItem ? statutItem.bgColor : "";
  };

type Props = {
    event: Event;
    newStatut: string | undefined;
    setNewStatut: (value: string) => void;
    modalStatutVisible: boolean;
    setModalStatutVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBgColorStatut: (value: string) => void;
}

const ModalStatut = ({newStatut, setNewStatut, modalStatutVisible, setModalStatutVisible, event, setBgColorStatut}: Props) => {

    const currentUser = planningStore((state: any ) => state.currentUser);  

    const [form, setForm] = useState({
        nombre_thermostat: '',
    })

    const [errorField, setErrorField] = useState<string>('')

    const [loading, setLoading] = useState(false);
    const [modalConfirmNbrThermostat, setModalConfirmNbrThermostat] = useState(false);

    const handleSumitStatut = async (value:string) => {
        const { data, error } = await supabase.from('planning')
        .update({statut: value})
        .eq('id', event.id);
        if(error) {
            Alert.alert("Une erreur s'est produite lors de la mise à jour du statut");
        }
        else {
            setNewStatut(value); 
            setBgColorStatut(getbgColorForStatut(value)); 
            setModalStatutVisible(!modalStatutVisible)
        }
    }

    const handleSubmitNbrThermostat = async () => {
        if(form.nombre_thermostat !== "") {
            const { data, error } = await supabase.from('planning')
            .update({statut: newStatut, nombre_thermostat: form.nombre_thermostat})
            .eq('id', event.id);
            if(error) {
                Alert.alert("Une erreur s'est produite");
            }
            else {
                setModalConfirmNbrThermostat(!modalConfirmNbrThermostat)
            }
        }
        else {
            setErrorField("Ce champ est requis")
        }   
    }

  return (
    <>
      <Modal
          animationType="slide"
          transparent={false}
          visible={modalStatutVisible}
          >
            <View className="flex-1 justify-center items-center bg-black/50 px-8">
              <View className="bg-white rounded-lg items-center z-10 w-full">
                <TouchableOpacity 
                className="flex-row justify-end w-full mt-2 mr-2"
                onPress={() => {setModalStatutVisible(!modalStatutVisible)}}
                >
                    <Ionicons name="close-circle-outline" size={40} color="black" />
                </TouchableOpacity>
                {currentUser?.role === "commercial" ? (
                  <View className="w-full px-8 py-4 gap-y-2">
                  <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-full justify-center items-center bg-yellow-600 rounded-xl"
                  onPress={() => handleSumitStatut("Planifié")}
                  >
                    <Text className="text-center text-xl font-psemibold py-4 text-white">Planifié</Text>
                  </TouchableOpacity> 
                  <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-full justify-center items-center bg-violet-600 rounded-xl"
                  onPress={() => handleSumitStatut("A replanifié")}
                  >
                    <Text className="text-center text-xl font-psemibold py-4 text-white">A replanifié</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-full justify-center items-center bg-gray-600 rounded-xl"
                  onPress={() => handleSumitStatut("Incompatible")}
                  >
                    <Text className="text-center text-xl font-psemibold py-4 text-white">Incompatible</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-full justify-center items-center bg-red-600 rounded-xl"
                  onPress={() => handleSumitStatut("Annulé")}
                  >
                    <Text className="text-center text-xl font-psemibold py-4 text-white">Annulé</Text>
                  </TouchableOpacity>
              </View>
                ) : (
                  <View className="w-full px-8 py-4 gap-y-2">
                    <TouchableOpacity
                    activeOpacity={0.8}
                    className="w-full justify-center items-center bg-yellow-600 rounded-xl"
                    onPress={() => handleSumitStatut("Planifié")}
                    >
                      <Text className="text-center text-xl font-psemibold py-4 text-white">Planifié</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    className="w-full justify-center items-center bg-green-600 rounded-xl"
                    onPress={() => {setNewStatut("Installé"); setBgColorStatut(getbgColorForStatut("Installé")); setModalStatutVisible(!modalStatutVisible); setModalConfirmNbrThermostat(true)}}
                    >
                      <Text className="text-center text-xl font-psemibold py-4 text-white">Installé</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    className="w-full justify-center items-center bg-violet-600 rounded-xl"
                    onPress={() => handleSumitStatut("A replanifié")}
                    >
                      <Text className="text-center text-xl font-psemibold py-4 text-white">A replanifié</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    className="w-full justify-center items-center bg-gray-600 rounded-xl"
                    onPress={() => handleSumitStatut("Incompatible")}
                    >
                      <Text className="text-center text-xl font-psemibold py-4 text-white">Incompatible</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    className="w-full justify-center items-center bg-red-600 rounded-xl"
                    onPress={() => handleSumitStatut("Annulé")}
                    >
                      <Text className="text-center text-xl font-psemibold py-4 text-white">Annulé</Text>
                    </TouchableOpacity>
                </View>
                )}
              </View>
            </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalConfirmNbrThermostat}
          >
            <View className="flex-1 justify-center items-center bg-black/50 px-4">
              <View className="bg-white rounded-lg items-center z-10 w-full">
              <TouchableOpacity 
                className="flex-row justify-end w-full mt-2 mr-2"
                onPress={() => {setModalConfirmNbrThermostat(!modalConfirmNbrThermostat)}}
                >
                    <Ionicons name="close-circle-outline" size={40} color="black" />
                </TouchableOpacity>
                <View className="w-full p-5">
                    <Text className="text-lg font-psemibold text-center">Nombre de thermostats installés</Text>
                    <FormField 
                        title=""
                        value={form.nombre_thermostat}
                        handleChangeText={(e: string) => setForm({...form, nombre_thermostat: e})}
                        otherStyles="mt-2"
                        keyBordType="number"
                        placeholder="Nombre de thermostats"
                        error={errorField}
                    />
                    <CustomButton
                    title="Valider"
                    handlePress={handleSubmitNbrThermostat}
                    containerStyles="w-full mt-7 bg-secondary"
                    textStyles="text-white"
                    isLoadind={loading}
                    />
                </View>
                
              </View>
            </View>
        </Modal>
    </>
  )
}

export default ModalStatut