import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {ArrowLeft} from "react-native-feather";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import SmartAlarm from "./SmartAlarm/SmartAlarm";
import {ClassicAlarm} from "./ClassicAlarm";
import {colorPalette} from "../../common/constants/ColorPalette";

const AddAlarmScreen = ({navigation}: { navigation: any }) => {

    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft stroke={colorPalette.primary}/>
                </TouchableOpacity>
            )
        })
    }, [])

    return (
        <View style={styles.container}>
            <Tab.Navigator style={styles.container} screenOptions={
                {
                    tabBarStyle: {
                        backgroundColor: colorPalette.tertiary,
                    },
                    tabBarLabelStyle: {
                        color: 'white'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: colorPalette.primary,
                        height: 3
                    }
                }}>
                <Tab.Screen name="Smart" component={SmartAlarm}/>
                <Tab.Screen name="Classic" component={ClassicAlarm}/>
            </Tab.Navigator>
        </View>

    );
};

export default AddAlarmScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.background,
        flex: 1
    },
    button: {
        marginTop: 10,
        marginLeft: 15,
        width: '50%',
        height: 50,
        backgroundColor: 'deepskyblue',
    },
    button2: {
        marginTop: 10,
        marginLeft: 45,
        width: '50%',
        height: 50,
        backgroundColor: 'deepskyblue',
    },
    button3: {
        marginTop: 40,
        width: '40%',
        height: 40,
        marginLeft: 30,
    },
    button4: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        width: '92%',
        height: 50,
        backgroundColor: 'deepskyblue',
    },
    component2: {
        marginTop: 30,
    },
    date: {
        color: 'white',
        fontSize: 80,
        marginLeft: 25,

    }
});
