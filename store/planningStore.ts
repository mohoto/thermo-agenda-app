import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, EventsData, Utilisateur } from '@/types/EventCalendarTypes';

type StateType = {
    currentUser: Utilisateur| null;
    setCurrentUser:(newUser:Utilisateur) => void;
    techniciens: Utilisateur[];
    setTechniciens:(newTechniciens:Utilisateur[]) => void;
    currentTechnicien: Utilisateur | null;
    setCurrentTechnicien:(newThechnicient:Utilisateur) => void;
    dateInstallation: Date | null;
    setDateInstallation:(newDateInstallation:Date) => void;
    event: Event | null;
    setEvent:(newEvent:Event) => void;
    planning: EventsData;     
    setPlanning:(planning:EventsData) => void;
    addEvent: (event: Event) => void;
    removeStorage: () => void;
// both increment and decrement are anonymous functions that have void return type.
}
  

/* const planningStore = create<StateType>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({currentUser: user}),
    techniciens: [],
    setTechniciens:(newTechniciens) => set({techniciens: techniciens}),
    currentThechnicient: null,
    setCurrentThechnicient: (technicien) => set({currentThechnicient: technicien}),
    planning: [],
    setPlanning: (planning) => set({planning}),
    addEvent: (event) => set((state) => ({ planning: [...state.planning, event] })),
 })); */

 export const planningStore = create(
    persist(
      (set, get) => ({
            currentUser: null,
            setCurrentUser: (newUser: Utilisateur) => set((state: any) => ({currentUser: {...state.currentUser, ...newUser}})),
            //setCurrentUser: (newUser: Utilisateur) => set({currentUser: newUser}),
            //setCurrentUser: (newUser: Utilisateur) => set((state: any) => ({currentUser: newUser})),
            techniciens: [],
            setTechniciens:(newTechniciens: Utilisateur[]) => set((state: any) => ({techniciens: newTechniciens})),
            currentTechnicien: null,
            setCurrentTechnicien: (newTechnicien: Utilisateur) => set((state: any) => ({currentTechnicien: {...state.currentTechnicien, ...newTechnicien}})),
            dateInstallation: null,
            setDateInstallation:(newDateInstallation: Date) => set((state: any) => ({dateInstallation: newDateInstallation})),
            event: null,
            setEvent:(newEvent: Event) => set((state: any) => ({event: newEvent})),
            planning: [],
            setPlanning: (planning: EventsData) => set({planning}),
            addEvent: (event: Event) => set((state: any) => ({ planning: [...state.planning, event] })),
            removeStorage: async () => {set({techniciens: []}); 
              try {
                await AsyncStorage.removeItem('currentUser');
                await AsyncStorage.removeItem('techniciens');
                await AsyncStorage.removeItem('currentTechnicien');
                await AsyncStorage.removeItem('dateInstallation');
                await AsyncStorage.removeItem('event');
              }
              catch(e) {
                console.log(e)
              }
            }, 
        }),
      {
        name: 'user-infos', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  )
  
    

export default planningStore;