import { View, Text } from 'react-native'
import React from 'react'
import DetailItem from '@/components/DetailItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import { useUserStore } from '@/store/User.store';

const UserDetails = ({
}) => {
    const { name, address, pinCode, playingStatus, sport1, sport2, feedback } = useUserStore();
    return (
        <SafeAreaView className="flex-1 bg-[rgb(45,46,47)]">
            <View className="px-6 pt-6">
                <CustomHeader title="Your Details" showBack={false} />
                <DetailItem label="Name" value={name} />
                <DetailItem label="Address" value={address} />
                <DetailItem label="Pin Code" value={pinCode} />
                <DetailItem label="Playing Status" value={playingStatus} />
                <DetailItem label="Sport you like" value={sport1} />
                <DetailItem label="Sport you like" value={sport2} />
                <DetailItem label="Feedback" value={feedback} />
            </View>
        </SafeAreaView>
    );
};

export default UserDetails