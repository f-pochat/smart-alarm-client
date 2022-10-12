import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Switch} from 'react-native-switch';

const Alarm = (props: any) => {
    const [isEnabled, setIsEnabled] = useState(true)
    const addLeadingZeros=(num:number) => {
        return String(num).padStart(2,'0')
    }
    return (
        <View style={styles.container}>
            <Text
                style={[styles.text, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                {`${addLeadingZeros(props.alarm.getHours())}:${addLeadingZeros(props.alarm.getMinutes())}`}
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
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        margin: 10,
        backgroundColor: '#222',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    text: {
        fontSize: 40,
    },

    disabledColor: {
        color: '#666',
        fontWeight: '100'
    },

    enabledColor: {
        color: '#aaa',
        fontWeight: '200'
    },
})

export default Alarm;
