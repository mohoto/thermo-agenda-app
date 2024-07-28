import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import { Link, router } from 'expo-router';
import { Event } from '@/types/EventCalendarTypes';
import * as Linking from 'expo-linking';
import ModalStatut from '@/components/modals/ModalStatut';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import planningStore from '@/store/planningStore';


interface StatutItem {
  value: string;
  label: string;
  bgColor: string;
  textColor?: string;
}

const statutItems: StatutItem[] = [
  { value: "Planifié", label: "A replanifié", bgColor: "bg-yellow-600", textColor: "text-yellow-600" },
  { value: "Installé", label: "Installé", bgColor: "bg-green-600", textColor: "text-green-600" },
  { value: "A replanifié", label: "A replanifié", bgColor: "bg-violet-600", textColor: "text-violet-600" },
  { value: "SAV", label: "SAV", bgColor: "bg-orange-600", textColor: "text-orange-600" },
  { value: "Annulé", label: "Annulé", bgColor: "bg-red-600", textColor: "text-red-600" },
  { value: "Incompatible", label: "Incompatible", bgColor: "bg-gray-500", textColor: "text-gray-600" },
]

const getbgColorForStatut = (value: string): string => {
  const statutItem = statutItems.find(item => item.value === value);
  return statutItem ? statutItem.bgColor : "";
};

type Props = {
  event: Event;
}

function CardRdv({ event }: Props) {

  const setEvent = planningStore((state: any) => state.setEvent);

  const [evenement, setEvenement] = useState<Event>(event);

  const [newStatut, setNewStatut] = useState<string | undefined>("");
  const [modalStatutVisible, setModalStatutVisible] = useState(false);


  const [bgColorStatut, setBgColorStatut] = useState<string | undefined>(newStatut ? getbgColorForStatut(newStatut) : "");



  const openWaze = (address: any) => {
    const url = `waze://?q=${address}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Waze n'est pas installé", "Veuillez installer Waze pour utiliser cette fonctionnalité.");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const handleEditEvent = async () => {
    setEvent(evenement);
    router.push('/edit-event');
  }

  useEffect(() => {
    const setStatut = () => {
      setNewStatut(evenement.statut);
      setBgColorStatut(getbgColorForStatut(evenement.statut || ""));
    }
    setStatut();
  }, [evenement.statut]);


  useEffect(() => {

    const channelUpdate = supabase.channel('planning_db_update')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'planning'
      },
        //(payload: any) => console.log('Change received!', payload.new))
        (payload: any) => payload.new.date_installation === payload.new.date_installation ? setEvenement(payload.new) : null)
      .subscribe();

    return () => {
      supabase.removeChannel(channelUpdate)

    }
  }, [supabase, evenement, setEvenement])


  return (
    <View className="p-6 mb-8 rounded-xl bg-gray-200">
      <View
        className={`${bgColorStatut} flex-row justify-center mb-4 px-2 py-3 rounded-xl`}
      >
        <Text className={`text-xl font-psemibold text-white`}>{newStatut}</Text>
      </View>
      <View className="flex justify-between font-semibold text-lg flex-row">
        <Text className="text-xl font-psemibold">{evenement.code_postal}</Text>
        <Text className="text-xl font-psemibold">{evenement.heure_installation}</Text>
      </View>
      <View className="text-sm">
        <Text className="my-1 text-lg font-pmedium">{evenement.nom.toUpperCase()} {evenement.prenom?.toUpperCase()}</Text>
        <Link href={`tel:${evenement.tel}`} className="text-lg font-pmedium">
          {evenement.tel}
        </Link>
        <TouchableOpacity
          className="my-1"
          onPress={() => openWaze(evenement?.adresse + evenement?.code_postal + evenement?.ville)}
        >
          <Text className="text-lg">{evenement.adresse?.toUpperCase()}</Text>
          <Text className="text-lg">{evenement.code_postal}  {evenement.ville?.toUpperCase()}</Text>
        </TouchableOpacity>
        <View className="my-1">
          <Text className="text-lg">Type de radiateur : {evenement.type_chauffage === "Electrique" ? "ELECTRIQUE" : "HYDRO"}</Text>
          <Text className="text-lg">Nombre de radiateur : {evenement.nombre_radiateur}</Text>
        </View>
      </View>
      <ModalStatut
        newStatut={newStatut}
        setNewStatut={setNewStatut}
        modalStatutVisible={modalStatutVisible}
        setModalStatutVisible={setModalStatutVisible}
        event={evenement}
        setBgColorStatut={setBgColorStatut}
      />
    </View>
  )
}

export default CardRdv