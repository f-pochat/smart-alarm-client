import HomeScreen from "./src/components/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddAlarmScreen from "./src/components/screens/AddAlarm/AddAlarmScreen";
import React, {useEffect} from "react";
import {colorPalette} from "./src/components/common/constants/ColorPalette";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator()

export default function App() {

    const storeDate = async () => {
        const id = await AsyncStorage.getItem('deviceId')
        if (!id) {
            const token = Math.floor(Math.random()*1000000000).toString()
            console.log(token)
            await AsyncStorage.setItem('deviceId', token)
        }
        return id
    }

    useEffect( () => {
        storeDate().then(r => console.log(r))
    })

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={() => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:colorPalette.tertiary
                  },
              })}
              />
              <Stack.Screen name="AddAlarm" component={AddAlarmScreen} options={() => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:colorPalette.tertiary
                  },
              })}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
