import {StyleSheet, Dimensions, View,Text} from "react-native";
import MapView, {LatLng} from "react-native-maps";
import {useEffect, useState} from "react";
import { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';
import { colorPalette } from "../../../common/constants/ColorPalette";
import {Box} from "react-native-feather";

const SmartAlarm = (props: any) => {
    const [location, setLocation] = useState<LatLng|null>(null);
    const [directions, setDirections] = useState<LatLng[]>([]);
    const [time, setTime] = useState(0)
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBotUu5eZz1kxGNb3Ipn6z5HmxY6JTTt0E';

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    },[]);


    return (
        <View style={styles.container}>

            {
                location &&(
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
                        onPress={(e)=>{
                            if (directions.length<=1)
                            setDirections( [...directions, e.nativeEvent.coordinate])
                        }}
                    >


                        {   directions.length > 0 &&
                            <Marker
                                coordinate={directions[0]}
                                draggable
                                onDragEnd={(e)=>{
                                    let aux = [...directions]
                                    aux[0] = e.nativeEvent.coordinate
                                    console.log(aux)
                                    setDirections(aux)
                                }
                                }

                            />
                        }
                        {
                            (directions.length > 1 ) &&
                            <>
                                <Marker
                                    coordinate={directions[1]}
                                    draggable
                                    onDragEnd={(e)=>{
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
                )
            }

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    timeBox: {
        zIndex: 999
    }
});

export default SmartAlarm
