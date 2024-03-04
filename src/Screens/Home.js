import { View, Text, Image, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Features from '../components/features';
import Voice from '@react-native-voice/voice';
import { apiCall } from '../api/OpenAI';
import Tts from 'react-native-tts';


export default function Home() {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const ScrollViewRef = useRef();

  const clear = () => {
    setMessages([]);
    Tts.stop();
    
  };

  const stopSpeaking = () => {
    Tts.stop();
    
    setSpeaking(false);
  };

  useEffect(() => {
    // Voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    //tts handlers

      Tts.addEventListener('tts-start', (event) => console.log("start", event));
      Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
      Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    return () => {
      // Destroy the voice instance and remove listeners
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  console.log ('result: ', result)

  const speechStartHandler = () => {
    console.log('Speech start handler');
  };

  const speechEndHandler = () => {
    console.log('Speech end handler');
  };

  const speechResultsHandler = (e) => {
    console.log('Voice event started: ', e);
    const text = e.value[0];
    setResult(text);

  };

  const speechErrorHandler = (e) => {
    console.error('Voice error started:', e.error);
  };

  const startRecording = async () => {
    Tts.stop();
    
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setRecording(true);
       
        if (Voice.isAvailable()) {
          await Voice.start('en-GB');
        } else {
          console.error('Voice module is not available');
        }
      } else {
        console.log('Microphone permission denied');
      }
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);

      fetchResponse();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };
  

const fetchResponse =()=>{
  if(result.trim().length>0){
  
    let newMessages = [...messages];
    newMessages.push({role: 'user', content: result.trim()});
    setMessages([...newMessages]);
    updateScrollView();
    setLoading(true);

    apiCall(result.trim(), newMessages).then(res=>{
      //console.log('got api data: ', res);
      setLoading(false);
      if(res.success){

        setMessages([...res.data]);
        updateScrollView();
        setResult('');
        startTextToSpeech(res.data[res.data.length-1]);
      }else{
        Alert.alert('Error', res.msg);
      }
    })

  }

}

const startTextToSpeech = message =>{
  if(!message.content.includes('https')){
    setSpeaking(true);
    Tts.speak(message.content, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }
}

const updateScrollView =()=>{
  setTimeout(()=>{
    ScrollViewRef?.current?.scrollToEnd({animated: true})
  }, 200)
}
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
                                ref={ScrollViewRef}
                                    bounces={false}
                                    className="space-y-4"
                                    showVerticalScrollIndicator={false}
                                >
                                    {
                                        // Inside the map function
                                        messages.map((message, index) => {
                                            
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
                 


                              {loading ? (
                                <Image 
                                source={require('../../assets/images/loading.gif')}
                                style={{ width: hp(10), height: hp(10) }}
                    />
                  
                ) : recording ? (
                  <TouchableOpacity onPress={stopRecording}>
                    {/* Recording Stop button */}
                    <Image
                      className="rounded-full  mt-16"
                      source={require('../../assets/images/gif.gif')}
                      style={{ width: hp(40), height: hp(10) }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={startRecording}>
                    {/* Recording start button */}
                    <Image
                      className="rounded-full mt-16"
                      source={require('../../assets/images/record.gif')}
                      style={{ width: hp(10), height: hp(10) }}
                    />
                  </TouchableOpacity>
                )}
                                  
            
                    

                    {
                        messages.length>0 && (
                            <TouchableOpacity
                            onPress={clear}
                            className="bg-neutral-400 rounded-3xl p-2 absolute right-10"> 
                            <Text
                            className="text-white font-semibold">Clear</Text>
                            </TouchableOpacity>


                        )
                                    
                        
                    }

{
                        speaking && (
                            <TouchableOpacity
                            onPress={stopSpeaking}
                            className="bg-red-600 rounded-3xl p-2 absolute left-10"> 
                            <Text
                            className="text-white font-semibold">Stop</Text>
                            </TouchableOpacity>


                        )
                                    
                        
                    }
                    
                </View>

            </SafeAreaView>

        </View>
    )
}