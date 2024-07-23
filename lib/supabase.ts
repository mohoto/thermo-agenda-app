import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

/* const supabaseUrl: string = process.env.EXPO_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey: string = process.env.EXPO_PUBLICE_SUPABASE_ANON_KEY || '' */

const supabaseUrl: string = "https://qnmuayrueglaytabvylx.supabase.co"
const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubXVheXJ1ZWdsYXl0YWJ2eWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NTUxMzUsImV4cCI6MjAzMjIzMTEzNX0.cTwmv3v3e5ukj4Jn4MZWmN7ZWSVnE5fmoIncb87FQsY"



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

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