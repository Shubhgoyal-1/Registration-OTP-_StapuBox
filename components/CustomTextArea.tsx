import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import cn from "clsx";

interface CustomTextAreaProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (text: string) => void;
    maxLength?: number;
    containerClassName?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
    label,
    placeholder,
    value,
    onChange,
    maxLength = 1000,
    containerClassName,
}) => {
    return (
        <ScrollView className={cn("w-full", containerClassName)}>
            {label && (
                <Text className="text-white mb-4 text-[20px]">
                    {label}
                </Text>
            )}
            <View className="border border-[#A0A0A0] rounded-2xl px-4 pt-4 pb-20">
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(128, 128, 128, 0.55)"
                    multiline
                    textAlignVertical="top"
                    maxLength={maxLength}
                    className="text-white text-[24px] min-h-[160px]"
                />
            </View>

            <View className="items-end mt-2">
                <Text className="text-white text-lg font-bold">
                    {value.length}/{maxLength}
                </Text>
            </View>
        </ScrollView>
    );
};

export default CustomTextArea;
