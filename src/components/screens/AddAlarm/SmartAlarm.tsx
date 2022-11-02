import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button
} from "react-native";
import {addLeadingZeros} from "../Alarm";
import {getHours, getMinutes} from "date-fns";
import React, {useState} from "react";
import {colorPalette} from "../../common/constants/ColorPalette";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Clock} from "react-native-feather";


export const SmartAlarm = ({navigation}: { navigation: any }) => {
    const [date, setDate] = useState(new Date());
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flexDirection: "column", justifyContent: 'center', flex: 6}}>
                            <Text style={styles.text}>Tiempo de preparacion</Text>
                        </View>
                        <View style={{flexDirection: "column", justifyContent: 'center', flex: 4}}>
                            <Text
                                style={styles.date}>{addLeadingZeros(getHours(date))} : {addLeadingZeros(getMinutes(date))}</Text>
                        </View>
                        <View style={{flexDirection: "column", flex: 1}}>
                            <View>
                                <TouchableOpacity style={styles.button3} onPress={() => showDatePicker()}>
                                    <Clock style={styles.clock} stroke={colorPalette.primary} width={35} height={35}/>
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
    }
});
