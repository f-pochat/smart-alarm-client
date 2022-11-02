import {useEffect, useState} from "react";
import axios from "axios";
import {Weather, weatherStatus} from "../models/weather";

export const useGetWeather = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [weather, setWeather] = useState<Weather>();
    useEffect(() => {
        axios.get("https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo")
            .then(r => {
                const weather: Weather = {
                    actualTemperature: r.data.hourly.temperature_2m[new Date().getHours()-1],
                    todayMaxTemperature: r.data.daily.temperature_2m_max[0],
                    todayMinTemperature: r.data.daily.temperature_2m_min[0],
                    todayWeather: weatherStatus(r.data.daily.weathercode[0]),
                    tomorrowWeather: weatherStatus(r.data.daily.weathercode[1]),
                    datWeather: weatherStatus(r.data.daily.weathercode[2]),
                }
                setWeather(weather)
                setLoading(false)
            })
            .catch(e => {
                setError(e.message)
                setLoading(false)
            })
    },[])
    return {weather, loading, error}
}
