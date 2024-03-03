import { apiKey } from "../constants";
import axios from "axios";

const client = axios.create({
  headers: {
    "Authorization": "Bearer " + apiKey,
    "Content-Type": "application/json",
  },
});

const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';


export const apiCall = async (prompt, messages) => {
  try {
    let retryCount = 0;

    while (retryCount < 3) {
      try {
        const res = await client.post(chatGptEndpoint, {
          model: "gpt-3.5-turbo",
          messages: [{
            role: 'user',
            content: `Does this message want to generate an AI picture, image, or anything similar? ${prompt}. Simply answer with a yes or no`,
          }],
        });

        //console.log('data: ', res.data.choices[0].message);
        let isArt = res.data?.choices[0]?.message?.content;
        if(isArt.toLowerCase().includes('yes')){
            console.log('dalle api call');
            return dalleApiCall(prompt, messages || []);

        }else{
            console.log('chatgpt api call');
            return chatgptApiCall(prompt, messages || []);
        }
        
      } catch (err) {
        console.log('error: ', err);

        if (err.response && err.response.status === 429) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 5000)); // Introduce a 5-second delay
        } else {
          return Promise.resolve({ success: false, msg: err.message });
        }
      }
    }

    // If all retries fail
    return Promise.resolve({ success: false, msg: 'Max retries reached' });
  } catch (error) {
    console.error(error);
    return Promise.resolve({ success: false, msg: 'Unhandled error' });
  }
};

const chatgptApiCall = async (prompt, messages)=>{
    try{
        const res = await client.post(chatGptEndpoint, {
            model: "gpt-3.5-turbo",
            messages 
          });

          let answer = res.data?.choices[0]?.message?.content;
          messages.push({role: 'assistant', content: answer.trim()});
          return Promise.resolve ({success: true, data: messages});
        }catch(err){
          console.log('Request data:', err.config.data); 
          console.log('response data:', err.response?.data); 
            console.log('error: ', err);
            return Promise.resolve({success: false, msg:err.message});
        }
    }

    const dalleApiCall = async (prompt, messages)=> {
        try{
            const res = await client.post(dalleEndpoint, {
                prompt,
                n: 2,
                size: "512x512"
            });

            let url = res?.data?.data[0]?.url;
            console.log('got url of the image: ', url);
            messages.push({role: 'assistant', content: url});
            return Promise.resolve({success: true, data: messages});
        }catch (err){
            console.log('error: ', err);
            return Promise.resolve({success: false, msg: err.message});
            
        }
    }




