import { StatusBar } from 'expo-status-bar';
  import React from 'react';
  import { Text, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

  export default function Welcome() {
    return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <View className="space-y-2">
        <Text className="text-center text-4xl font-bold text-gray-700">
            BhundulAI
        </Text>

        <Text className="text-center tracking-wider text-gray-600 font-bold">
            The future is here. Powered by AI.
        </Text>

        </View>

        <View className="flex-row justify-center">
            <Image source={require('../../assets/images/ai.png')} className="w-72 h-72" />
        </View>
      
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
