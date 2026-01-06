import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import CustomHeader from '@/components/CustomHeader'
import CustomTextArea from '@/components/CustomTextArea'
import { useUserStore } from '@/store/User.store'

const UserDetails3 = () => {
    const setField = useUserStore((state) => state.setField)
    const feedback = useUserStore((state) => state.feedback)
    const router = useRouter()
    const isFormValid = true;
    return (
        <SafeAreaView className="flex-1 bg-[rgb(45,46,47)]">
            <View className="flex-1 px-6 pt-4">
                <CustomHeader title='Share Your Feedback' />

                <CustomTextArea
                    label="Feedback"
                    placeholder="Write your suggestion"
                    value={feedback}
                    onChange={(val) => setField("feedback", val)}
                    maxLength={1000}
                />
            </View>
            <View className="px-6 pb-8">
                <CustomButton
                    title="Submit"
                    disabled={!isFormValid}
                    onPress={() => router.push("/(userDetails)/UserDetails")}
                />
            </View>
        </SafeAreaView>
    )
}

export default UserDetails3