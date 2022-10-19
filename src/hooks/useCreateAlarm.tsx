import alarm from "../components/screens/Alarm";
import {IAlarm} from "../models/alarm";
import {useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../components/common/constants/Integration";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IOptions {
    onCompleted?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useCreateAlarm = (alarm: IAlarm, options?: IOptions) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const createAlarm = async () => {
        console.log(BACKEND_URL + 'alarm')
        axios.post(BACKEND_URL + '/alarm', {
            ...alarm,
            createdAt: new Date(),
            isActive: true,
            deviceId: await AsyncStorage.getItem('deviceId')
        })
            .then((response) => {
                options?.onCompleted && options.onCompleted(response.data)
                setLoading(false)
            })
            .catch((e) => {
                options?.onError && options.onError(e.message)
                setError(e.message)
                setLoading(false)
            })
    }

    return {createAlarm, loading, error}
}
