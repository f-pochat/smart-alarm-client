import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Text} from "react-native";
import Alarm from "./Alarm";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {colorPalette, IAlarm} from "../../models/alarm";

const HomeScreen = ({navigation}: { navigation: any }) => {
    const [alarms, setAlarms] = useState<IAlarm[]>([])
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddAlarm')}>
                    <Text style={styles.plusButton}>+</Text>
                </TouchableOpacity>
            )

        })
    })
    const onChange = (event: any, selectedDate: any) => {
        setAlarms(state => [
            ...state,
            selectedDate
        ])
    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content'/>
            {
            }
            <ScrollView
                contentContainerStyle={{paddingBottom: 30}}
                style={styles.scroll}>
                {
                    alarms.map(a => {
                        return (
                            <Alarm alarm={a}/>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.background,
    },
    header: {
        display: 'flex',
        height: '10%',
        backgroundColor: '#646465',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 30,
        elevation: 35,
        zIndex: 35,
        shadowColor: '#000'
    },
    scroll: {
        height: '100%',
        flexGrow: 1,
    },
    plusButton: {
        fontSize: 35,
        color: colorPalette.primary,
        marginRight: 10
    }
})

export default HomeScreen;
