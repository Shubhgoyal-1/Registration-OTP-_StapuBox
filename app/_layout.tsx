import { Stack } from "expo-router";
import "./global.css";
import Toast from "react-native-toast-message";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
export default function RootLayout() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
}
