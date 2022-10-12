import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity, Button} from "react-native";
import Alarm from "./Alarm";
import RNDateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {IAlarm} from "../../models/alarm";

const HomeScreen = ({navigation}: {navigation: any}) => {
    const [alarms, setAlarms] = useState<IAlarm[]>([])
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={()=>navigation.navigate('AddAlarm')} title="Show time picker!" />
            )

        })
    })
    const onChange = (event:any, selectedDate:any) => {
        setAlarms(state => [
            ...state,
            selectedDate
        ])
    };

    const showMode = (currentMode:any) => {
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
                        return(
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
        backgroundColor: '#040405',
    },
    header: {
        display: 'flex',
        height: '10%',
        backgroundColor: '#646465',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 30,
        elevation: 35,
        zIndex:35,
        shadowColor: '#000'
    },
    scroll: {
        height: '100%',
        flexGrow: 1,
    }
})

export default HomeScreen;
