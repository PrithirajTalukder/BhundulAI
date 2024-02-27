
import React from 'react';
import { Text, View,Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

  export default function Welcome() {
    const navigation = useNavigation();
    return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="space-y-2">
        <Text style={{fontSize:wp(10)}} className="text-center font-bold text-gray-700">
            BhundulAI
        </Text>

        <Text style={{fontSize:wp(4)}} className="text-center tracking-wider text-gray-600 font-bold mb-28">
            The future is here. Powered by AI.
        </Text>

        </View>

        <View className="flex-row justify-center mb-40">
            <Image source={require('../../assets/images/ai1.png')} style = {{width:wp(75), height:wp(75),}} />
        </View>

        <TouchableOpacity onPress={()=> navigation.navigate('Home')} className="bg-cyan-500 mx-5 p-4 rounded-2xl" style={{ width: 300 }}>
            <Text style={{fontSize:wp(6)}} className="text-center font-bold text-white text-2xl">Get Started</Text>
        </TouchableOpacity>
      
      
      </SafeAreaView>
    );
  }
