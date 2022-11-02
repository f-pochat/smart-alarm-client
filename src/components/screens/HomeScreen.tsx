import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Text, RefreshControl} from "react-native";
import Alarm from "./Alarm";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {IAlarm} from "../../models/alarm";
import {colorPalette} from "../common/constants/ColorPalette";
import WeatherBanner from "./WeatherBanner";
import {useGetAlarms} from "../../hooks/useGetAlarms";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({navigation}: { navigation: any }) => {
    const [alarms, setAlarms] = useState<IAlarm[]>([])
    const [date, setDate] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);
    const [deviceId, setDeviceId] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddAlarm')}>
                    <Text style={styles.plusButton}>+</Text>
                </TouchableOpacity>
            )

        })
        AsyncStorage.getItem('deviceId').then(r => {
            setDeviceId(r!);
            fetchData();
        })
    }, []);

    const {fetchData} = useGetAlarms({
        onCompleted: r => {
            setAlarms(r)
        },
        onError: e => console.log('error1', e)
    }, deviceId);


    const onChange = (event: any, selectedDate: any) => {
        setAlarms(state => [
            ...state,
            selectedDate
        ])
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

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            {/*<StatusBar barStyle='light-content'/>*/}
            {/*<ScrollView*/}
            {/*    contentContainerStyle={{paddingBottom: 30}}*/}
            {/*    style={styles.scroll}*/}
            {/*    refreshControl={*/}
            {/*        <RefreshControl*/}
            {/*            refreshing={refreshing}*/}
            {/*            onRefresh={onRefresh}*/}
            {/*        />*/}
            {/*    }*/}
            {/*>*/}
            <WeatherBanner/>
            {alarms ? (
                    alarms?.map(a => {
                        return (
                            <Alarm key={a.name} alarm={a}/>
                        )
                    }))
                : ''}
            {/*</ScrollView>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.background,
        flex: 1,
    },
    header: {
        display: 'flex',
        height: '10%',
        backgroundColor: '#646465',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 30,
        elevation: 35,
        zIndex: 35,
        shadowColor: '#000'
    },
    scroll: {
        height: '100%',
        flexGrow: 1,
    },
    plusButton: {
        fontSize: 35,
        color: colorPalette.primary,
        marginRight: 10
    }
})

export default HomeScreen;
