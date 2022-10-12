import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HomeScreen from "./src/components/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddAlarmScreen from "./src/components/screens/AddAlarmScreen";
import React from "react";
import DaysPicker from "./src/components/AddAlarm/DaysPicker";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:'#444'
                  },
              })}
              />
              <Stack.Screen name="AddAlarm" component={AddAlarmScreen} options={({ navigation }) => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:'#444'
                  },
              })}
              />
              <Stack.Screen name="DaysPicker" component={DaysPicker} options={({ navigation }) => ({

                  title: "",
                  headerStyle: {
                      backgroundColor:'#444'
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