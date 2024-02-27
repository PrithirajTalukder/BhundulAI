import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import  Home from './src/Screens/Home';
import  Welcome from './src/Screens/Welcome';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions= {{headerShown:false}} initialRouteName='Welcome' >
      <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Home" component={Home}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;