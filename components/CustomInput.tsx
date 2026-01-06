import React, { useState } from "react";
import { View, TextInput, KeyboardTypeOptions } from "react-native";
import cn from "clsx";

interface CustomInputProps {
    placeholder?: string;
    value: string;
    onChange: (text: string) => void;
    keyBoardType?: KeyboardTypeOptions;
    maxLength?: number;
    containerClassName?: string;
    inputClassName?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    placeholder,
    value,
    onChange,
    keyBoardType = "default",
    maxLength,
    containerClassName,
    inputClassName,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View
            className={cn(
                "border  rounded-xl h-[56px] justify-center", isFocused
                ? "border-white"
                : "border-[rgba(255,255,255,0.2)]",
                containerClassName
            )}
        >
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor="rgb(75,75,75)"
                keyboardType={keyBoardType}
                maxLength={maxLength}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn(
                    "text-white px-4 text-[24px]",
                    inputClassName
                )}
            />
        </View>
    );
};

export default CustomInput;
