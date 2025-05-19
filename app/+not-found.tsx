import { Link, Stack } from "expo-router";
import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "페이지를 찾을 수 없습니다." }} />
      <View style={styles.container}>
        <Text>요청하신 페이지를 찾을 수 없어요</Text>
        <Link href="/(tabs)/home" style={styles.link}>
          <Text>홈으로 돌아가기</Text>
        </Link>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
