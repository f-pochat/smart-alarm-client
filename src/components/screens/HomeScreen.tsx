import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import Alarm from "./Alarm";

const HomeScreen = () => {
    const alarms = [10,9,8,7,6,5]
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.plus}>+</Text>
            </View>
            {
                alarms.map(a => {
                    return(
                        <Alarm alarm={a}/>
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#040405',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    header: {
        display: 'flex',
        height: '10%',
        backgroundColor: '#646465',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 30,
    },
    plus: {
        fontWeight: 'bold',
        fontSize: 40
    }
})

export default HomeScreen;
