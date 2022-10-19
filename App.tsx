import {StyleSheet} from 'react-native';
import HomeScreen from "./src/components/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddAlarmScreen from "./src/components/screens/AddAlarm/AddAlarmScreen";
import React from "react";
import {colorPalette} from "./src/components/common/constants/ColorPalette";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:colorPalette.tertiary
                  },
              })}
              />
              <Stack.Screen name="AddAlarm" component={AddAlarmScreen} options={({ navigation }) => ({

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
const styles = StyleSheet.create({
    plus: {
        fontWeight: 'bold',
        fontSize: 40
    },
})
