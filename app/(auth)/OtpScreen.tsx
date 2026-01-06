import { View, Text, TextInput, Pressable } from "react-native";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "expo-router";
import axios from "axios";
import { useUserStore } from "@/store/User.store";
const OTP_LENGTH = 4;

const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;
const API_URL_VERIFY = "https://stapubox.com/trial/verifyOtp";
const API_URL_RESEND = "https://stapubox.com/trial/resendOtp";
const RESEND_TIME = 60;

export default function OtpScreen() {
    const [timer, setTimer] = useState(RESEND_TIME);

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const mobile = useUserStore((state) => state.mobile);
    const inputs = useRef<TextInput[]>([]);
    const router = useRouter()

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
                        router.push("/(userDetails)/UserDetailsForm1");
                    } else {
                        setError("Wrong OTP Entered");
                    }
                } catch {
                    setOtp(Array(OTP_LENGTH).fill(""));
                    inputs.current[0]?.focus();
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
            inputs.current[0]?.focus();
            console.log("OTP resent:", response.data);
            setTimer(RESEND_TIME);
            return response.data;
        } catch (error) {
            console.log("Resend OTP failed:", error);
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

    const handleChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number) => {
        if (otp[index] === "" && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#2D2E2F] px-6">
            <CustomHeader title="Phone Verification" containerClassName="mt-4" />
            <Text numberOfLines={2} className="text-white text-[28px] mb-16">
                Enter 4 digit OTP sent to your phone number
            </Text>

            <View className="flex-row gap-x-4 mb-4">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            if (ref) inputs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === "Backspace") {
                                handleBackspace(index);
                            }
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        className="w-[56px] h-[56px] rounded-xl border-2 border-[rgba(255,255,255,0.25)] text-white text-[24px] text-center"
                    />
                ))}
            </View>
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
