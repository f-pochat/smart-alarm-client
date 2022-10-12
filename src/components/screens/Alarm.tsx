import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from "react-native";

const Alarm = (props: any) => {
    const [isEnabled, setIsEnabled] = useState(true)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.alarm}:00</Text>
            <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#581217" }}
                thumbColor={isEnabled ? "#f70109" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsEnabled(!isEnabled)}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#A2A2A4',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    text: {
      fontSize: 40,
        fontWeight: 'bold',
    },

    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    }
})

export default Alarm;
