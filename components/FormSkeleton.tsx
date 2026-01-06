import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FormSkeleton = () => (
    <SafeAreaView className="flex-1 bg-[rgb(45,46,47)]">
        <View className="flex-col mt-10">
            <View className="h-12 py-8 mb-4 bg-gray-400 rounded-xl animate-pulse" />
            <View className="h-12 py-8 mb-4 bg-gray-400 rounded-xl animate-pulse" />
            <View className="h-12 py-8 mb-4 bg-gray-400 rounded-xl animate-pulse" />
            <View className="h-12 py-8 mb-4 bg-gray-400 rounded-xl animate-pulse" />
            <View className="h-12 py-8 mb-4 bg-gray-400 rounded-xl animate-pulse" />
            <View className="h-12 py-8 mt-40 bg-gray-400 rounded-xl animate-pulse" />
        </View>
    </SafeAreaView>
);
export default FormSkeleton;