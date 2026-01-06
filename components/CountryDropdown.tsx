import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import TriangleIcon from "./icons/TriangleIcon";

const countries = [
  { label: "India (+91)", value: "+91" },
  { label: "United States (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "Australia (+61)", value: "+61" },
];

export default function CountryDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="min-w-[72px]">
      <Dropdown
        style={{
          height: 48,
          minWidth: 72,       
          borderColor: "#4b5563",
          borderRadius: 8,
          paddingHorizontal: 8, 
          backgroundColor: "#2f2f2f",
        }}
        containerStyle={{
          borderRadius: 8,
        }}
        selectedTextStyle={{
          color: "#fff",
          fontSize: 24,
        }}
        placeholderStyle={{
          color: "#aaa",
          fontSize: 24,
        }}
        itemTextStyle={{
          color: "#000",
          fontSize: 24,
        }}
        data={countries}
        renderRightIcon={() => <TriangleIcon color="#FFFFFF" />}
        labelField="value"
        valueField="value"
        value={value}
        placeholder="+91"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}
