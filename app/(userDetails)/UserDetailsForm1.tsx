import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import CustomHeader from '@/components/CustomHeader'
import { useUserStore } from '@/store/User.store'
const UserDetails1 = () => {

    const setField = useUserStore((state) => state.setField);
    const name = useUserStore((state) => state.name);
    const pinCode = useUserStore((state) => state.pinCode);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const router = useRouter()
    // const isFormValid = name && address1 && pinCode;
    const isFormValid = true;
    return (
        <SafeAreaView className="flex-1 bg-[rgb(45,46,47)]">
            <View className="flex-1 px-6 pt-10">

                <CustomHeader title='Enter Your Details' showBack={false} />

                <View className="mb-12">
                    <Text className="text-white mb-2 text-[20px]">
                        Name<Text className="text-white text-[20px]">*</Text>
                    </Text>
                    <CustomInput
                        placeholder="antoine@soch.at"
                        value={name}
                        onChange={(val) => setField("name", val)}
                    />
                </View>

                <View className="mb-12">
                    <Text className="text-white mb-2 text-[20px]">
                        Address<Text className="text-white text-[20px]">*</Text>
                    </Text>

                    <CustomInput
                        placeholder="Address Line 1"
                        value={address1}
                        onChange={setAddress1}
                    />

                    <View className="mt-[2px]">
                        <CustomInput
                            placeholder="Address Line 2 (Optional)"
                            value={address2}
                            onChange={setAddress2}
                        />
                    </View>
                </View>
                <View className="mb-12">
                    <Text className="text-white mb-2 text-[20px]">
                        Pin Code<Text className="text-white text-[20px]">*</Text>
                    </Text>
                    <CustomInput
                        placeholder="110224"
                        value={pinCode}
                        onChange={(val) => setField("pinCode", val)}
                        keyBoardType="numeric"
                        maxLength={6}
                    />
                </View>
            </View>
            <View className="px-6 pb-8">
                <CustomButton
                    title="Next"
                    disabled={!isFormValid}

                    onPress={() => {
                        setField("address", address1 + " " + address2);
                        router.push("/(userDetails)/UserDetailsForm2")
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default UserDetails1