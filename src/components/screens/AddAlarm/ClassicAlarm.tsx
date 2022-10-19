import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {addLeadingZeros} from "../Alarm";
import {getHours, getMinutes} from "date-fns";
import {Clock} from "react-native-feather";
import {TextInput} from "react-native-paper";
import DaysPicker from "./DaysPicker";
import React, {useState} from "react";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {colorPalette} from "../../common/constants/ColorPalette";
import axios from "axios";
import {BACKEND_URL} from "../../common/constants/Integration";
import {useCreateAlarm} from "../../../hooks/useCreateAlarm";
import {getDayByNumber, IAlarm} from "../../../models/alarm";


export const ClassicAlarm = () => {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState("");
    const [weekdays, setWeekdays] = useState([])

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

    const newAlarm: IAlarm = {
        time: date,
        name: text,
        days: weekdays.map((day: any) => getDayByNumber(day))
    }

    const createAlarm = () => {
        useCreateAlarm(newAlarm)
    }

    const showTimepicker = () => {
        showMode('time');
    };
        return (
            <View style={styles.container}>
                <View style={{flexDirection: "row"}}>
                    <View style={{flexDirection: "row", justifyContent: 'center'}}>
                        <Text
                            style={styles.date}>{addLeadingZeros(getHours(date))} : {addLeadingZeros(getMinutes(date))}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity style={styles.button3} onPress={() => showTimepicker()} >
                            <Clock stroke={colorPalette.primary} width={40} height={40} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={styles.textInput}
                    label="Name"
                    value={text}
                    onChangeText={text => setText(text)}
                    activeUnderlineColor={colorPalette.primary}
                   theme={{colors: {text: 'white'}}}

                />
                <DaysPicker
                    weekdays={weekdays}
                    setWeekdays={(e: any) => setWeekdays(e)}
                />
                <TouchableOpacity style={styles.button4} onPress={() => createAlarm()} >
                    <Text style={{display: 'flex', alignSelf: 'center', marginTop: 15, color: 'white', fontWeight: 'bold'}} > Save </Text>
                </TouchableOpacity>
            </View>
        )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.background,
        flex: 1,
        padding: 20
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
        backgroundColor: colorPalette.primary,
        borderRadius: 10,
    },
    date: {
        color: 'white',
        fontSize: 80,
        fontWeight: '300',

    },
    textInput: {
        marginTop: 20,
        backgroundColor: colorPalette.middle,
        // color: 'white',
    }
});
