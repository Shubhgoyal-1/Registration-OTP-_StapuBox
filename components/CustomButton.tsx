import React from "react";
import { Pressable, Text } from "react-native";
import cn from "clsx";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  containerClassName?: string;
  textClassName?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  containerClassName,
  textClassName,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={cn(
        "py-4 rounded-2xl items-center mb-6",
        disabled
          ? "bg-[rgba(255,255,255,0.04)]"
          : "bg-[rgb(35,152,254)]",
        containerClassName
      )}
    >
      <Text
        numberOfLines={1}
        className={cn(
          "font-semibold text-[24px]",
          disabled
            ? "text-[rgba(255,255,255,0.13)]"
            : "text-white",
          textClassName
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
