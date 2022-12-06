import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button, TextInput, ActivityIndicator
} from "react-native";
import {addLeadingZeros} from "../../Alarm";
import {getHours, getMinutes} from "date-fns";
import React, {useState} from "react";
import {colorPalette} from "../../../common/constants/ColorPalette";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Clock} from "react-native-feather";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {SAlarm} from "../../../../models/alarm";
import {useCreateSmartAlarm} from "../../../../hooks/useCreateSmartAlarm";

interface SmartAlarmClockProps {
    half: 1 | 2;
}

//https://github.com/mmazzarolo/react-native-modal-datetime-picker
export const SmartAlarmClock = (props: SmartAlarmClockProps) => {
    const [date, setDate] = useState(new Date());
    const [datePrep, setDatePrep] = useState(new Date());
    const [text, setText] = useState("");
    const [isDatePickerVisiblePrep, setDatePickerVisibilityPrep] = useState(false);
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

    const showDatePickerPrep = () => {
        setDatePickerVisibilityPrep(true);
    };

    const hideDatePickerPrep = () => {
        setDatePickerVisibilityPrep(false);
    };

    const handleConfirmPrep = (date: any) => {
        setDatePrep(date)
        hideDatePickerPrep();
    };
    const dateUpdated = new Date(date)
    dateUpdated.setHours(date.getHours() - 3)
    const newAlarm: SAlarm = {
        name: text,
        alarmLocationLat: 'string',
        alarmLocationLong: 'string',
        destinationLocationLat: 'string',
        destinationLocationLong: 'string',
        preparationTime: Number((new Date(datePrep).getHours()) * 60 + (new Date(datePrep).getMinutes())),
        arrivalTime: dateUpdated,
        deviceId: '121'
    }
    const {createAlarm, loading} = useCreateSmartAlarm(newAlarm,
        {
            onCompleted: () => {
                setSaved(true);
                setTimeout(() => {
                    // navigation.navigate('Home')
                }, 1000)
            },
            onError: (error: any) => {
                console.log('errror', error)
            }
        })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    {props.half === 1 ? (
                        <>
                            <View style={{flexDirection: "row"}}>
                                <View style={{flexDirection: "column", justifyContent: 'center', flex: 6}}>
                                    <Text style={styles.text}>Preparation time</Text>
                                </View>
                                <View style={{flexDirection: "column", justifyContent: 'center', flex: 4}}>
                                    <Text
                                        style={styles.date}>{addLeadingZeros(getHours(datePrep))} : {addLeadingZeros(getMinutes(datePrep))}</Text>
                                </View>
                                <View style={{flexDirection: "column", flex: 1}}>
                                    <View>
                                        <TouchableOpacity style={styles.button3} onPress={() => showDatePickerPrep()}>
                                            <Clock style={styles.clock} stroke={colorPalette.primary} width={35}
                                                   height={35}/>
                                        </TouchableOpacity>
                                        {/*<TimePicker value={datePrep} />*/}
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisiblePrep}
                                            mode="time"
                                            onConfirm={handleConfirmPrep}
                                            onCancel={hideDatePickerPrep}
                                            is24Hour={true}
                                            locale="en_GB"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: "row", marginTop: 15, marginBottom: 0}}>
                                <View style={{flexDirection: "column", justifyContent: 'center', flex: 6}}>
                                    <Text style={styles.text}>Arrival time</Text>
                                </View>
                                <View style={{flexDirection: "column", justifyContent: 'center', flex: 4}}>
                                    <Text
                                        style={styles.date}>{addLeadingZeros(getHours(date))} : {addLeadingZeros(getMinutes(date))}</Text>
                                </View>
                                <View style={{flexDirection: "column", flex: 1}}>
                                    <View>
                                        <TouchableOpacity style={styles.button3} onPress={() => showDatePicker()}>
                                            <Clock style={styles.clock} stroke={colorPalette.primary} width={35}
                                                   height={35}/>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="time"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                            is24Hour={true}
                                            locale="en_GB"
                                        />
                                    </View>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Name"
                                value={text}
                                onChangeText={text => setText(text)}
                                selectionColor={colorPalette.quaternary}
                            />
                            <TouchableOpacity style={styles.button4} onPress={createAlarm}>
                                {
                                    loading ?
                                        <ActivityIndicator style={{margin: 'auto'}} color='white'/>
                                        : saved ? <FontAwesomeIcon color='white' icon={faCheck}/>
                                            : (<Text
                                                style={{margin: 'auto', color: 'white', fontWeight: 'bold'}}> Save </Text>)
                                }
                            </TouchableOpacity>
                        </>
                    )}
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
        marginTop: 5,
        width: '40%',
        // height: 40,
        // marginLeft: 30,
    },
    date: {
        color: 'white',
        fontSize: 40,
        fontWeight: '200',

    },
    clock: {
        // marginTop: -30,
        // marginLeft: -20,

    },
    text: {
        color: 'white',
        fontSize: 15,
    },
    textInput: {
        height: 45,
        borderRadius: 15,
        paddingLeft: 10,
        color: 'white',
        // marginTop: 20,
        backgroundColor: colorPalette.middle,
        // color: 'white',
    },
    button4: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        backgroundColor: colorPalette.primary,
    },
});
