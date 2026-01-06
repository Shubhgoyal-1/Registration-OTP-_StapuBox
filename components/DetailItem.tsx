import React from "react";
import { View, Text } from "react-native";
import cn from "clsx";

interface DetailItemProps {
  label: string;
  value?: string;
  containerClassName?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  containerClassName,
}) => {
  if (!value) return null;

  return (
    <View className={cn("mb-12", containerClassName)}>
      <Text className="text-[rgba(255,255,255,0.6)] text-[16px] mb-1">
        {label}
      </Text>
      <Text className="text-white text-[16px] leading-6">
        {value}
      </Text>
    </View>
  );
};

export default DetailItem;
