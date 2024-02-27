import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react/cjs/react.development';
import Features from '../components/features';
import { dummyMessages } from '../constants';

export default function Home() {
    const [messages, setMessages] = useState(dummyMessages);
    const [recording, setRecording] = useState(false);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/ai3.png')} style={{ width: hp(20), height: hp(20) }} />
                </View>


                {
                    messages.length > 0 ? (
                        <View className="space-y-2 flex-1">
                            <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                                Assistant
                            </Text>
                            <View
                                style={{ height: hp(58) }}
                                className="bg-neutral-200 rounded-3xl p-4"
                            >
                                <ScrollView
                                    bounces={false}
                                    className="space-y-4"
                                    showVerticalScrollIndicator={false}
                                >
                                    {
                                        // Inside the map function
                                        messages.map((message, index) => {
                                            console.log(message.content);
                                            if (message.role == 'assistant') {
                                                if (message.content.includes('https')) {

                                                    return(
                                                        <View key={index} className="flex-row just-start">
                                                            <View className="p-2 flex rounded-2xl bg-sky-300 rounded-tl-none">
                                                                <Image 
                                                                source={{uri: message.content}}
                                                                className="rounded-2xl"
                                                                resizemode="contain"
                                                                style={{height: wp(60), width:wp(60)}}

                                                                />
                                                            </View>
                                                        </View>

                                                    );
                                                    
                                                } else {
                                                    return (
                                                       

                                                        <View 
                                                        key = {index}
                                                        style={{ width: wp(70) }} className="bg-sky-300 rounded-xl p-2 rounded-tl-none">
                                                            <Text>{message.content}</Text>
                                                        </View>

                                                    );
                                                }
                                            } else {
                                                return (
                                                    <View key={index} className="flex-row justify-end">
                                                        <View style={{ width: wp(70) }} className="bg-white rounded-xl p-2 rounded-tr-none">
                                                            <Text>{message.content}</Text>
                                                        </View>
                                                    </View>
                                                );
                                            }
                                        })

                                    }
                                </ScrollView>
                            </View>

                        </View>

                    ) : (
                        <Features />

                    )


                }


                <View className ="flex justify-center items-center">
                    {
                        recording? (
                            <TouchableOpacity>
                        <Image
                        className="rounded-full mb-4"
                        source={require('../../assets/images/gif.gif')}
                        style={{width: hp(40), height: hp(10)}}
                        />
                    </TouchableOpacity>

                        ): (
                            <TouchableOpacity>
                        <Image
                        className="rounded-full mb-4"
                        source={require('../../assets/images/record.gif')}
                        style={{width: hp(10), height: hp(10)}}
                        />
                    </TouchableOpacity>
                        )
                    }
                    
                </View>

            </SafeAreaView>

        </View>
    )
}