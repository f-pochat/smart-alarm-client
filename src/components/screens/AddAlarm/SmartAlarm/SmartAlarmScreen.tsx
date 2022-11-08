import {StyleSheet, Dimensions, View, Text, Platform, Keyboard, TouchableOpacity} from "react-native";
import MapView, {LatLng} from "react-native-maps";
import React, {useEffect, useState} from "react";
import {Marker} from 'react-native-maps';
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';
import {colorPalette} from "../../../common/constants/ColorPalette";
import {Box, Clock} from "react-native-feather";
import {addLeadingZeros} from "../../Alarm";
import {getHours, getMinutes} from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    KeyboardAvoidingView, TouchableWithoutFeedback, Button, TextInput, ActivityIndicator
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {SAlarm} from "../../../../models/alarm";
import {useCreateSmartAlarm} from "../../../../hooks/useCreateSmartAlarm";

export const SmartAlarmScreen = (props: any) => {
    const [location, setLocation] = useState<LatLng | null>(null);
    const [directions, setDirections] = useState<LatLng[]>([]);
    const [time, setTime] = useState(0)
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBotUu5eZz1kxGNb3Ipn6z5HmxY6JTTt0E';
    const [result, setResult] = useState({distance: 0, duration: 0});
    const [date, setDate] = useState(new Date());
    const [datePrep, setDatePrep] = useState(new Date());
    const [text, setText] = useState("");
    const [isDatePickerVisiblePrep, setDatePickerVisibilityPrep] = useState(false);
    const [saved, setSaved] = useState(false)


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

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

    const newAlarm: SAlarm = {
        name: text,
        alarmLocationLat: 'string',
        alarmLocationLong: 'string',
        destinationLocationLat: 'string',
        destinationLocationLong: 'string',
        preparationTime: Number((new Date(datePrep).getHours()) * 60 + (new Date(datePrep).getMinutes())),
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
        <View style={styles.container}>
            <>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
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
                                        <TouchableOpacity style={styles.button3}
                                                          onPress={() => showDatePickerPrep()}>
                                            <Clock style={styles.clock} stroke={colorPalette.primary} width={35}
                                                   height={35}/>
                                        </TouchableOpacity>
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
                            <View style={{flexDirection: "row", marginTop: 15}}>
                                <View style={{flexDirection: "column", justifyContent: 'center', flex: 6}}>
                                    <Text style={styles.text}>Arrival time</Text>
                                </View>
                                <View style={{flexDirection: "column", justifyContent: 'center', flex: 4}}>
                                    <Text
                                        style={styles.date}>{addLeadingZeros(getHours(date))} : {addLeadingZeros(getMinutes(date))}</Text>
                                </View>
                                <View style={{flexDirection: "column", flex: 1}}>
                                    <View>
                                        <TouchableOpacity style={styles.button3}
                                                          onPress={() => showDatePicker()}>
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
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </>
            <View style={{position: "absolute", width: '100%', height: '50%', marginTop: 175, marginLeft: 10}}>
                {location && (
                    <MapView
                        initialRegion={{
                            latitude: location?.latitude,
                            longitude: location?.longitude,
                            longitudeDelta: 0.03,
                            latitudeDelta: 0.03
                        }}
                        style={styles.map}
                        showsUserLocation={true}
                        userLocationPriority={'low'}
                        followsUserLocation={true}
                        onPress={(e) => {
                            if (directions.length <= 1)
                                setDirections([...directions, e.nativeEvent.coordinate])
                        }}
                    >{directions.length > 0 &&
                        <Marker
                            coordinate={directions[0]}
                            draggable
                            onDragEnd={(e) => {
                                let aux = [...directions]
                                aux[0] = e.nativeEvent.coordinate
                                setDirections(aux)
                            }}
                        />
                    }{(directions.length > 1) &&
                        <>
                            <Marker
                                coordinate={directions[1]}
                                draggable
                                onDragEnd={(e) => {
                                    let aux = [...directions]
                                    aux[1] = e.nativeEvent.coordinate
                                    setDirections(aux)
                                }}
                            />
                            <MapViewDirections
                                origin={directions[0]}
                                destination={directions[1]}
                                apikey={GOOGLE_MAPS_APIKEY}
                                timePrecision={"now"}
                                strokeWidth={4}
                                strokeColor={colorPalette.secondary}
                                onReady={result => {
                                    setResult({
                                        distance: result.distance,
                                        duration: result.duration
                                    })
                                    setTime(result.duration)
                                    console.log(`Distance: ${result.distance} km`)
                                    console.log(`Duration: ${result.duration} min.`)
                                }}
                            />
                        </>
                    }
                        <Box style={styles.timeBox}>
                            <Text>{`Duration: ${time} min.`}</Text>
                        </Box>
                    </MapView>
                )}
            </View>
            <View style={{position: 'absolute', width: '100%', marginTop: 450, marginLeft: 10}}>
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
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorPalette.background,
        padding: 10
    },
    map: {
        width: '100%',
        height: '70%',
    },
    timeBox: {
        zIndex: 999
    },
    button3: {
        marginTop: 5,
        width: '40%',
    },
    date: {
        color: 'white',
        fontSize: 40,
        fontWeight: '200',

    },
    clock: {
        marginTop: 5,

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
        backgroundColor: colorPalette.middle,
    },
    button4: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        backgroundColor: colorPalette.primary,
    },
});

