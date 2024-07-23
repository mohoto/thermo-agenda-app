import {create} from 'zustand';
import { Event, EventsData, Utilisateur } from '@/types/EventCalendarTypes';

type StateType = {
    currentUser: Utilisateur| null;
    setCurrentUser:(currentUser:Utilisateur)=>void;
    techniciens: Utilisateur[];
    setTechniciens:(techniciens:Utilisateur[])=>void;
    currentThechnicient: Utilisateur | null;
    setCurrentThechnicient:(currentThechnicient:Utilisateur)=>void;
    planning: EventsData;     
    setPlanning:(planning:EventsData)=>void;
    addEvent: (event: Event) => void;
// both increment and decrement are anonymous functions that have void return type.
}
  

const planningStore = create<StateType>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({currentUser: user}),
    techniciens: [],
    setTechniciens:(techniciens) => set({techniciens: techniciens}),
    currentThechnicient: null,
    setCurrentThechnicient: (technicien) => set({currentThechnicient: technicien}),
    planning: [],
    setPlanning: (planning) => set({planning}),
    addEvent: (event) => set((state) => ({ planning: [...state.planning, event] })),
    }));
    

export default planningStore;