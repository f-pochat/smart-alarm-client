import HomeScreen from "./src/components/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddAlarmScreen from "./src/components/screens/AddAlarm/AddAlarmScreen";
import React, {useEffect} from "react";
import {colorPalette} from "./src/components/common/constants/ColorPalette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LogBox} from "react-native";

const Stack = createNativeStackNavigator()

export default function App() {

    const storeDate = async () => {
        const id = await AsyncStorage.getItem('deviceId')
        if (!id) {
            const token = Math.floor(Math.random()*1000000000).toString()
            await AsyncStorage.setItem('deviceId', token)
        }
        return id
    }

    useEffect( () => {
        LogBox.ignoreAllLogs();
        storeDate().then(r => console.log('date',r))
    })

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{animationTypeForReplace:'pop'}}>
              <Stack.Screen name="Home" component={HomeScreen} options={() => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:colorPalette.tertiary
                  },
                  animationTypeForReplace: 'push',
                  animation:'slide_from_right'
              })}
              />
              <Stack.Screen name="AddAlarm" component={AddAlarmScreen} options={() => ({
                  title: "",
                  headerStyle: {
                      backgroundColor:colorPalette.tertiary
                  },
                  animationTypeForReplace: 'push',
                  animation:'slide_from_right'
              })}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
