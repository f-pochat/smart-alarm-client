import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../components/common/constants/Integration";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IOptions {
    onCompleted?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useGetAlarms = (options: IOptions) => {
    const [alarms, setAlarms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [deviceId, setDeviceId] = useState(AsyncStorage.getItem('deviceId'))

    const fetch = () => {
        axios.get(BACKEND_URL + '/alarm/' + deviceId)
            .then((response) => {
                options.onCompleted && options.onCompleted(response.data)
                setAlarms(response.data)
                setLoading(false)
            })
            .catch((e) => {
                options.onError && options.onError(e.message)
                setError(e.message)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetch();
    }, [])

    return {alarms, loading, error, fetchData: fetch}
}