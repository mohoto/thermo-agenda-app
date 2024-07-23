import { Moment } from 'moment';
import { ReactNode } from 'react';

export type DaysGrid= {
    no: number;
    date: Moment
}
export interface Event {
    id: string;
    created_at?: Date;
    date_installation?: Date;
    heure_installation: string;
    nom: string;
    prenom?: string;
    tel?: string;
    email?: string;
    adresse?: string;
    ville?: string;
    code_postal: string;
    statut_client?: string;
    type_habitation?: string;
    surface_habitable?: string;
    type_chauffage?: string;
    nombre_radiateur?: string;
    commentaires?: string;
    statut?: string;
    rappel_telephone?: string;
    technicien?: string;
    commercial?: string;
}

export type EventsData = Array<Event>

export type Utilisateur = {
    id: number;
    email?: string;
    role?: string;
    nom?: string;
    prenom?: string;
    tel?: string;
    secteur?: string;
    userId: string;
    is_active?: boolean;
    techniciens?: string[];
} 

export type User = {
    id: string;
    email: string;
}
