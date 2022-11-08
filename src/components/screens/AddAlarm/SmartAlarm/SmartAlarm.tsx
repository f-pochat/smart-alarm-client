import {StyleSheet, Text, View} from "react-native";
import {colorPalette} from "../../../common/constants/ColorPalette";
import {Switch} from "react-native-switch";
import {getDayByNumber} from "../../../../models/alarm";
import React, {useState} from "react";
import {addLeadingZeros} from "../../Alarm";

const SmartAlarm =(props:any)=>{
    const [isEnabled, setIsEnabled] = useState(true);

    return(

        <View style={[styles.container, isEnabled ? {backgroundColor: colorPalette.secondary_dark} : {backgroundColor: colorPalette.dark}]}>
            <View style={styles.rowContainer}>
                <View style={{flexDirection:'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                  <Text style={[styles.textLabel,isEnabled ? styles.enabledColor : styles.disabledColor]}>
                      Arrival Time
                  </Text>
                    <Text
                        style={[styles.text, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                        {`${addLeadingZeros(new Date(props.alarm.arrivalTime).getHours())}:${addLeadingZeros(new Date(props.alarm.arrivalTime).getMinutes())}`}
                    </Text>
                    <Text style={[styles.textLabel,isEnabled ? styles.enabledColor : styles.disabledColor]}>
                        Preparation Time
                    </Text>
                    <Text
                        style={[styles.text, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                        {`${addLeadingZeros(new Date(props.alarm.preparationTime).getHours())}:${addLeadingZeros(new Date(props.alarm.preparationTime).getMinutes())}`}
                    </Text>
                    <Text style={[styles.textName, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                        {props.alarm.name}
                    </Text>
                </View>

                <Switch
                    backgroundActive={colorPalette.secondary_shadow}
                    backgroundInactive='gray'
                    circleActiveColor={colorPalette.secondary}
                    circleBorderWidth={0}
                    renderActiveText={false}
                    renderInActiveText={false}
                    onValueChange={() => setIsEnabled(!isEnabled)}
                    value={isEnabled}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30}}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150,
        margin: 10,
        borderRadius: 20,
        padding: 5,
    },

    rowContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        marginBottom:10,
    },

    textName: {
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 10,
    },
    textLabel: {
        fontSize: 10,
        marginLeft: 5,
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
export default SmartAlarm