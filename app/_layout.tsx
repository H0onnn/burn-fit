import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      router.replace("/(tabs)/home");
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Fragment>
  );
}
