import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import CountryDropdown from "@/components/CountryDropdown";
import { useRouter } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import axios from 'axios';
import { useUserStore } from "@/store/User.store";
import Toast from "react-native-toast-message";

const API_URL = "https://stapubox.com/trial/sendOtp";
const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export default function Index() {
  const router = useRouter()
  const mobile = useUserStore((state) => state.mobile);
  const setField = useUserStore((state) => state.setField);
  const [countryCode, setCountryCode] = useState("+91");

  const numberCheck = () => {
    return /^\d{10}$/.test(mobile)
  }
  const isValid = numberCheck();
  // const isValid = true;


  const sendOTP = async () => {
    try {
      const response = await axios.post(API_URL,
        {
          mobile: mobile,
        }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Token': API_TOKEN
        }
      });
      return response.data;
    } catch (error: any) {
      console.error("OTP request failed:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Otp Request Failed"
      })
      throw error;
    }
  }

  const handleSendOTP = () => {
    sendOTP()
    console.log("OTP sent to:", mobile);
    Toast.show({
      type: "success",
      text1: "Otp Sent Successfully"
    })
    router.push("/OtpScreen")
  }


  return (
    <View className="flex-1 bg-[#2D2E2F] px-4 justify-center">

      <Text className="text-white text-[32px] font-bold mb-10 text-center">
        Login to Your Account
      </Text>

      <View className="flex-row items-center gap-x-2 mb-6">

        <View className="border border-[rgb(255,255,255,0.2)] rounded-xl h-[56px] justify-center">
          <CountryDropdown
            value={countryCode}
            onChange={setCountryCode}
          />
        </View>

        <CustomInput
          value={mobile}
          onChange={(val) => setField("mobile", val)}
          placeholder="9999999999"
          keyBoardType="numeric"
          maxLength={10}
          containerClassName="flex-1"
        />


      </View>


      <CustomButton
        title="Send OTP"
        disabled={!isValid}
        onPress={handleSendOTP}
      />


      <View className="flex-row justify-center">
        <Text className="text-white text-[15px] font-semibold mr-2">Don’t have account?</Text>
        <Text className="text-[rgba(35,152,254,1)] text-[15px] font-semibold">Create Account</Text>
      </View>

    </View>
  );
}
