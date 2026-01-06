import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "expo-router";
import axios from "axios";
import { useUserStore } from "@/store/User.store";
import Toast from "react-native-toast-message";
const OTP_LENGTH = 4;

const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;
const API_URL_VERIFY = "https://stapubox.com/trial/verifyOtp";
const API_URL_RESEND = "https://stapubox.com/trial/resendOtp";
const RESEND_TIME = 60;

export default function OtpScreen() {
    const router = useRouter()
    const mobile = useUserStore((state) => state.mobile);

    const hiddenInputRef = useRef<TextInput>(null);

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(RESEND_TIME);
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);


    const verifyOTP = async (code: string) => {
        try {
            setIsVerifying(true);
            setError("");
            const response = await axios.post(API_URL_VERIFY, null, {
                params: {
                    mobile,
                    otp: code
                },
                headers: {
                    "X-Api-Token": API_TOKEN,
                },
            })
            console.log("OTP verified:", response.data);
            return response.data.status;
        } catch (error: any) {
            console.log("OTP verification failed:", error);
            Toast.show({
                type: "error",
                text1: "Otp Verified Failed"
            })
            throw error
        } finally {
            setIsVerifying(false);
        }
    }

    useEffect(() => {
        const submitOtp = async () => {
            if (otp.every(digit => digit !== "")) {
                const code = otp.join("");
                try {
                    console.log("Verifying OTP:", code);
                    const status = await verifyOTP(code);
                    if (status === "success") {
                        Toast.show({
                            type: "success",
                            text1: "Otp Verified Successfully"
                        })
                        router.replace({ 
                            pathname: "/(userDetails)/UserDetailsForm1", 
                            params: { loading: "true" }, });
                    } else {
                        Toast.show({
                            type: "error",
                            text1: "Wrong Otp Entered"
                        })
                        setError("Wrong OTP Entered");
                    }
                } catch {
                    setOtp(Array(OTP_LENGTH).fill(""));
                    hiddenInputRef.current?.focus();
                }
            }
        };

        submitOtp();
    }, [otp]);

    const resendOTP = async () => {
        try {
            const response = await axios.post(API_URL_RESEND, null, {
                params: {
                    mobile,
                },
                headers: {
                    "X-Api-Token": API_TOKEN,
                },
            })
            setOtp(Array(OTP_LENGTH).fill(""));
            hiddenInputRef.current?.focus();
            console.log("OTP resent:", response.data);
            Toast.show({
                type: "success",
                text1: "Otp Resent Successfully"
            })
            setTimer(RESEND_TIME);
            return response.data;
        } catch (error) {
            console.log("Resend OTP failed:", error);
            Toast.show({
                type: "error",
                text1: "Otp Resend Failed"
            })
            throw error;
        }
    }
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (text: string) => {
        if (!/^\d*$/.test(text)) return;

        const digits = text.slice(0, OTP_LENGTH).split("");
        setOtp([...digits, ...Array(OTP_LENGTH - digits.length).fill("")]);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#2D2E2F] px-6">
            {isVerifying && (
                <View className="absolute inset-0 bg-black/60 items-center justify-center z-50">
                    <View className="bg-[#1F2937] px-6 py-4 rounded-2xl items-center">
                        <ActivityIndicator size="large" color="#3B82F6" />
                        <Text className="text-white mt-3 font-semibold">
                            Verifying OTP...
                        </Text>
                    </View>
                </View>
            )}
            <CustomHeader title="Phone Verification" containerClassName="mt-4" />
            <Text numberOfLines={2} className="text-white text-[28px] mb-16">
                Enter 4 digit OTP sent to your phone number
            </Text>
            <TextInput
                ref={hiddenInputRef}
                value={otp.join("")}
                onChangeText={handleOtpChange}
                keyboardType="numeric"
                autoComplete="sms-otp"
                textContentType="oneTimeCode"
                importantForAutofill="yes"
                maxLength={OTP_LENGTH}
                autoFocus
                style={{ position: "absolute", opacity: 0 }}
            />
            <Pressable onPress={() => hiddenInputRef.current?.focus()}>
                <View className="flex-row gap-x-4 mb-4">
                    {otp.map((digit, index) => (
                        <View
                            key={index}
                            className={`w-[56px] h-[56px] rounded-xl border-2 border-[rgba(255,255,255,0.25)] items-center justify-center ${digit !== "" ? "border-white" : ""}`}
                        >
                            <Text className="text-white text-[24px]">{digit}</Text>
                        </View>
                    ))}
                </View>
            </Pressable>

            {error ? (
                <Text className="text-red-500 text-[13px] font-semibold">
                    {error}
                </Text>
            ) : null}
            <View className="flex-row px-2 gap-x-2 mt-6">
                <Pressable disabled={timer > 0} onPress={resendOTP}>
                    <Text
                        className={`text-[16px] font-semibold ${timer > 0
                            ? "text-gray-400"
                            : "text-[rgb(35,152,254)]"
                            }`}
                    >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                    </Text>
                </Pressable>

                <Pressable onPress={() => router.push("/(auth)")}>
                    <Text className="text-white text-[16px] font-semibold">
                        or Change Number?
                    </Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}
