import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Switch} from 'react-native-switch';
import {colorPalette} from "../common/constants/ColorPalette";

export const addLeadingZeros=(num:number) => {
    return String(num).padStart(2,'0')
}

const Alarm = (props: any) => {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text
                    style={[styles.text, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                    {`${addLeadingZeros(props.alarm.time.getHours())}:${addLeadingZeros(props.alarm.time.getMinutes())}`}
                </Text>
                <Switch
                    backgroundActive='#0784b5'
                    backgroundInactive='gray'
                    circleActiveColor='#39ace7'
                    circleBorderWidth={0}
                    renderActiveText={false}
                    renderInActiveText={false}
                    onValueChange={() => setIsEnabled(!isEnabled)}
                    value={isEnabled}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30}}>
                <Text style={[styles.textName, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                    {props.alarm.name}
                </Text>
                <Text style={[styles.textName, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                    {
                        !props.alarm.days ? "Tomorrow" : props.alarm.days.map((d:Day) => (d.toString()[0])).join("-")
                    }
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        margin: 10,
        backgroundColor: colorPalette.dark,
        borderRadius: 20,
    },

    rowContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
    },

    textName: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
    },

    disabledColor: {
        color: '#aaa',
        fontWeight: '200'
    },

    enabledColor: {
        color: '#ccc',
        fontWeight: '300'
    },
})

export default Alarm;
