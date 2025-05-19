import { StyleSheet, Text, View } from "react-native";

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
