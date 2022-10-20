import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from "react-native";
import {useGetWeather} from "../../hooks/useGetWeather";
import {colorPalette} from "../common/constants/ColorPalette";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faSun,
    faCloudSun,
    faCloud,
    faSnowflake,
    faCloudRain,
    faCloudShowersHeavy,
    faCloudBolt,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {getDayByNumber} from "../../models/alarm";

const weatherIcon = {
    sun: faSun,
    "cloud-sun":faCloudSun,
    cloud: faCloud,
    "cloud-rain": faCloudRain,
    "cloud-snow":faSnowflake,
    "cloud-showers": faCloudShowersHeavy,
    "cloud-bolt": faCloudBolt,
}

const WeatherBanner = () => {

    const {weather, loading, error} = useGetWeather()

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator style={{margin: 'auto'}} size={30} color={colorPalette.primary}/>
            ) : error ? (
                <Text>{error}</Text>
            ): (
                <>
                    <View style={{flexDirection: 'column', justifyContent: 'space-around', marginLeft: 10}}>
                        <Text style={[styles.minmaxtemp, {color: '#f5948c'}]}>{weather?.todayMaxTemperature}°</Text>
                        <Text style={[styles.minmaxtemp,{color: '#8ca2f5'}]}>{weather?.todayMinTemperature}°</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        {/* @ts-ignore */}
                        <FontAwesomeIcon icon={weatherIcon[weather ? weather?.todayWeather : 'sun']} size={70} color='white'/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color: 'white', fontSize: 35}}>{weather?.actualTemperature}°</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-between',margin: 5}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.forecast_text}>{getDayByNumber(new Date().getDay()+1)}</Text>
                            {/* @ts-ignore */}
                            <FontAwesomeIcon icon={weatherIcon[weather ? weather?.tomorrowWeather : 'sun']} size={30} color='#eee'/>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.forecast_text}>{getDayByNumber(new Date().getDay()+2)}</Text>
                            {/* @ts-ignore */}
                            <FontAwesomeIcon icon={weatherIcon[weather ? weather?.datWeather : 'sun']} size={30} color='#eee'/>
                        </View>
                    </View>
                </>
            )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 120,
        backgroundColor: colorPalette.tertiary,
        margin: 10,
        borderRadius: 20,
        justifyContent: 'space-around'
    },
    minmaxtemp: {
        fontSize: 20,
        color: 'white'
    },
    forecast_text: {
        color: '#eee'
    }
})

export default WeatherBanner;
