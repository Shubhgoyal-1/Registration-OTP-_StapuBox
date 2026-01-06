import React, { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";

interface CustomDropdownProps {
  placeholder: string;
  options: string[];
  value: string | null;
  onSelect: (value: string) => void;
  containerClassName?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  placeholder,
  options,
  value,
  onSelect,
  containerClassName,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View className={cn("w-full", containerClassName)}>
      <Pressable
        onPress={() => setOpen(!open)}
        className="h-[56px] rounded-xl border border-[rgba(255,255,255,0.2)] px-4 flex-row items-center justify-between"
      >
        <Text
          className={cn(
            "text-[20px]",
            value ? "text-white" : "text-[rgba(255,255,255,0.3)]"
          )}
        >
          {value || placeholder}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color="white"
        />
      </Pressable>

      {open && (
        <View className="mt-2 rounded-xl bg-white overflow-hidden">
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
                className="px-4 py-2 border-b border-gray-100"
              >
                <Text className="text-black text-[18px]">
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
