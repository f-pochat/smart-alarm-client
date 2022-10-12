import React, {useState} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text, DatePickerAndroid} from "react-native";
import {DateTimePickerAndroid, } from "@react-native-community/datetimepicker";

const AddAlarmScreen = () => {
    const [isSmart, setIsSmart] = useState(false);
    const [date, setDate] = useState(new Date());
    const onChange = (event:any, selectedDate:any) => {
        console.log('this')
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
            <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row"}}>
                    <TouchableOpacity style={styles.button} onPress={() => setIsSmart(true)}>
                        <Text style={{display: 'flex',alignSelf: 'center', marginTop: 15}}> Smart </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row"}}>
                    <TouchableOpacity style={styles.button2} onPress={() => {
                        setIsSmart(false)
                        showTimepicker()
                    }}>
                        <Text style={{display: 'flex',alignSelf: 'center', marginTop: 15}}> Classic </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.component2}>
            {/*{isSmart ? (*/}
            {/*    <View>*/}
            {/*    </View>*/}
            {/*) : (*/}
            {/*    <View>*/}
            {/*    </View>*/}
            {/*)}*/}
            </View>
        </View>
    );
};

export default AddAlarmScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#040405',
        flex:1
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
    component2: {
        marginTop: 30,
    }
});
