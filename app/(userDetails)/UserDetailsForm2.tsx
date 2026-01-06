import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import CustomHeader from '@/components/CustomHeader'
import CustomDropdown from '@/components/CustomDropdown'
import { useUserStore } from '@/store/User.store'

const UserDetails2 = () => {

    const setField = useUserStore((state) => state.setField);
    const playingStatus = useUserStore((state) => state.playingStatus);
    const sport1 = useUserStore((state) => state.sport1);
    const router = useRouter()
    const isFormValid = playingStatus && sport1;
    return (
        <SafeAreaView className="flex-1 bg-[rgb(45,46,47)]">
            <View className="flex-1 px-6 pt-10">
                <CustomHeader title='Enter Your Details' />


                <Text className="text-white mt-8 mb-4 text-[20px]">
                    Playing Status
                </Text>

                <CustomDropdown
                    placeholder="Looking for Playground"
                    value={playingStatus}
                    onSelect={(val) => setField("playingStatus", val)}
                    options={[
                        "Looking for Playground",
                        "Looking for Player",
                    ]}
                />

                <Text className="text-white mt-8 mb-4 font-medium text-[20px]">
                    Sport you like <Text className="text-white text-[20px]">*</Text>
                </Text>

                <CustomDropdown
                    placeholder="Badminton"
                    value={sport1}
                    onSelect={(val) => {
                        setField("sport1", val)
                        setField("sport2", val)
                    }}
                    options={[
                        "Archery",
                        "Badminton",
                        "Basketball",
                        "Boxing",
                        "Cricket",
                    ]}
                />

            </View>
            <View className="px-6 pb-8">
                <CustomButton
                    title="Next"
                    disabled={!isFormValid}
                    onPress={() => router.push("/(userDetails)/UserDetailsForm3")}
                />
            </View>
        </SafeAreaView>
    )
}

export default UserDetails2