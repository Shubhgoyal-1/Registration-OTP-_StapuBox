import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="UserDetailsForm1" />
            <Stack.Screen name="UserDetailsForm2" />
            <Stack.Screen name="UserDetailsForm3" />
            <Stack.Screen name="UserDetails" />
        </Stack>
    );
}
