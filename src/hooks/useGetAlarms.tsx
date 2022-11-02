import {useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../components/common/constants/Integration";

interface IOptions {
    onCompleted?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useGetAlarms = (options: IOptions, deviceId: string) => {
    const [alarms, setAlarms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetch = () => {
        axios.get(BACKEND_URL + "12")
            .then((response) => {
                options.onCompleted && options.onCompleted(response.data)
                setAlarms(response.data)
                console.log('res',response.data)
                setLoading(false)
            })
            .catch((e) => {
                options.onError && options.onError(e.message)
                setError(e.message)
                setLoading(false)
            })
    }

    return {alarms, loading, error, fetchData: fetch}
}