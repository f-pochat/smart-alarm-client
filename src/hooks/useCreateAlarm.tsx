import alarm from "../components/screens/Alarm";
import Alarm from "../components/screens/Alarm";
import {IAlarm} from "../models/alarm";
import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../components/common/constants/Integration";

interface IOptions {
    onCompleted?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useCreateAlarm = (alarm: IAlarm, options?: IOptions) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.post(BACKEND_URL + '/alarms', alarm)
            .then((response) => {
                options?.onCompleted && options.onCompleted(response.data)
                setLoading(false)
            })
            .catch((e) => {
                options?.onError && options.onError(e.message)
                setError(e.message)
                setLoading(false)
            })
    });

    return {loading, error}
}
