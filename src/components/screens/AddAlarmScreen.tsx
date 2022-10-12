import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import DaysPicker from "../AddAlarm/DaysPicker";
import {getHours, getMinutes} from 'date-fns';
import {addLeadingZeros} from "./Alarm";
import {Clock} from "react-native-feather";
import { TextInput } from 'react-native-paper';

const AddAlarmScreen = () => {
    const [isSmart, setIsSmart] = useState(false);
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState("");

    const onChange = (event: any, selectedDate: any) => {
        setDate(selectedDate)
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

    const [weekdays, setWeekdays] = useState([])
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={styles.button} onPress={() => setIsSmart(true)}>
                        <Text style={{display: 'flex', alignSelf: 'center', marginTop: 15}}> Smart </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={styles.button2} onPress={() => setIsSmart(false)}>
                        <Text style={{display: 'flex', alignSelf: 'center', marginTop: 15}}> Classic </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {isSmart ? (
                    <View>
                        <Text>Classic</Text>
                    </View>

                ) : (
                    <View style={styles.component2}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "row"}}>
                                <Text
                                    style={styles.date}>{addLeadingZeros(getHours(date))} : {addLeadingZeros(getMinutes(date))}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <TouchableOpacity style={styles.button3} onPress={() => showTimepicker()} >
                                    <Clock stroke="deepskyblue" fill="#fff" width={50} height={50} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TextInput
                            style={{marginTop: 20}}
                            label="Name"
                            value={text}
                            onChangeText={text => setText(text)}
                        />
                        <DaysPicker
                            weekdays={weekdays}
                            setWeekdays={(e: any) => setWeekdays(e)}
                        />
                        <TouchableOpacity style={styles.button4} onPress={() => setIsSmart(true)}>
                            <Text style={{display: 'flex', alignSelf: 'center', marginTop: 15}}> Save </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>

    );
};

export default AddAlarmScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#040405',
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
