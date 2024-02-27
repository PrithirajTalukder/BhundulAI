import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Features() {
    return (
        <View style={{ height: hp(60) }} classNme="space-y-4">
            <Text style={{ fontSize: wp(6.5) }} classNme="font-semobold tex-gray-700 ">Features</Text>


            <View className=" bg-emerald-200 p-4 rounded-xl space-y-2 mt-3">

                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assets/images/ai4.png')} style={{ width: hp(4), height: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700">ChatGPT</Text>

                </View>

                <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
                    ChatGPT is an advanced language model powered by OpenAI's GPT-3.5 architecture, designed to engage in natural and dynamic conversations, providing human-like responses across a wide range of topics.
                </Text>

            </View>

            <View className=" bg-purple-200 p-4 rounded-xl space-y-2 mt-3">

                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assets/images/ai5.png')} style={{ width: hp(4), height: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700">DALL-E</Text>

                </View>

                <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
                    
DALL·E is an AI model by OpenAI that generates images from textual descriptions, demonstrating impressive creativity and visual synthesis capabilities.
                </Text>

            </View>

            <View className=" bg-cyan-200 p-4 rounded-xl space-y-2 mt-3">

                <View className="flex-row items-center space-x-1">
                    <Image source={require('../../assets/images/ai6.png')} style={{ width: hp(4), height: hp(4) }} />
                    <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700">BhundulAI</Text>

                </View>

                <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
                Your voice assistant powered by ChatGPT and DALL·E, delivering intelligent and creative responses through advanced natural language processing and image generation.
                </Text>

            </View>


        </View>
    )
}