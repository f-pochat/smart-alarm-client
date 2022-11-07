import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import {addLeadingZeros} from "../Alarm";
import {getHours, getMinutes} from "date-fns";
import {Clock} from "react-native-feather";
import DaysPicker from "./DaysPicker";
import React, {useState} from "react";
import {colorPalette} from "../../common/constants/ColorPalette";
import {useCreateAlarm} from "../../../hooks/useCreateAlarm";
import {getDayByNumber, IAlarm} from "../../../models/alarm";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export const ClassicAlarm = ({navigation}:{navigation: any}) => {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState("");
    const [weekdays, setWeekdays] = useState([]);
    const [saved, setSaved] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setDate(date)
        hideDatePicker();
    };


    const newAlarm: IAlarm = {
        time: String(date),
        name: text,
        days: weekdays,
        deviceId: "121"
    }

    const {createAlarm, loading} = useCreateAlarm(newAlarm,
        {
            onCompleted: () => {
                setSaved(true);
                setTimeout(() => {navigation.navigate('Home')},1000)
            },
            onError: (error: any) => {
                console.log('errror',error)
            }
        })

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                <Text
                                    style={styles.date}>{addLeadingZeros(getHours(date))} : {addLeadingZeros(getMinutes(date))}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <TouchableOpacity style={styles.button3} onPress={() => showDatePicker()} >
                                    <Clock stroke={colorPalette.primary} width={55} height={55} />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="time"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        is24Hour={true}
                                        locale="en_GB"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Name"
                            value={text}
                            onChangeText={text => setText(text)}
                            selectionColor={colorPalette.quaternary}
                        />
                        <DaysPicker
                            weekdays={weekdays}
                            setWeekdays={(e: any) => setWeekdays(e)}
                        />
                        <TouchableOpacity style={styles.button4} onPress={createAlarm}>
                            {
                                loading ?
                                    <ActivityIndicator style={{margin: 'auto'}} color='white'/>
                                    : saved ? <FontAwesomeIcon color='white' icon={faCheck}/>
                                        : (<Text style={{margin:'auto', color: 'white', fontWeight: 'bold'}} > Save </Text>)
                            }
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.background,
        flex: 1,
        padding: 20
    },
    button3: {
        marginTop: 20,
        width: '40%',
        height: 40,
        marginLeft: 30,
    },
    button4: {
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        backgroundColor: colorPalette.primary,
    },
    date: {
        color: 'white',
        fontSize: 80,
        fontWeight: '200',

    },
    textInput: {
        height: 45,
        borderRadius: 15,
        paddingLeft: 10,
        color: 'white',
        marginTop: 20,
        backgroundColor: colorPalette.middle,
        // color: 'white',
    }
});
