import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import cn from "clsx";

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  containerClassName?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
  containerClassName,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) return onBackPress();
    router.back();
  };

  return (
    <View
      className={cn(
        "flex-row items-center justify-center relative mb-16 px-6 bg-[rgb(45,46,47)]",
        containerClassName
      )}
    >
      {showBack && (
        <Pressable
          onPress={handleBack}
          className="absolute left-0 w-12 h-12 rounded-full bg-[rgb(65,66,67)] items-center justify-center"
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#fff"
            style={{ transform: [{ translateX: -2 }] }}
          />
        </Pressable>
      )}

      <Text className="text-white text-[24px]">
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
