import AuthProvider from '@/providers/AuthProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
//import 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StatusBar } from 'expo-status-bar';

//import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ 
          headerShown: true,
          title: 'Accueil',
          headerRight: () => (
            <Link href={'/rdv'}>
              <FontAwesome6 name="user-large" size={24} color="black" />
            </Link>
          ),
        }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
        name="(tabs)"
        options={{
          title: 'Agenda',
          headerRight: () => (
            <Link href={'/sign-out'}>
              <FontAwesome6 name="user-large" size={24} color="black" />
            </Link>
          ),
          /* headerLeft: () => (
            <Link href={'/'}>
              <FontAwesome6 name="user-large" size={24} color="black" />
            </Link>
          ), */
        }}
        />
        <Stack.Screen name="(profile)" options={{ title: "Rendez-vous" }} />
        <Stack.Screen name="create-event" options={{ title: "Nouveau rendez-vous" }} />
        <Stack.Screen name="edit-event" options={{ title: "Modifier rendez-vous" }} />
        {/* <Stack.Screen name="sign-out" options={{ title: "Déconnexion" }} /> */}
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    </AuthProvider>
 
  );
}
