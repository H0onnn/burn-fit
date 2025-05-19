import { COLOR_TOKENS } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOR_TOKENS.black,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "HOME",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "CALENDAR",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "LIBRARY",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="dumbbell" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "MY PAGE",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
