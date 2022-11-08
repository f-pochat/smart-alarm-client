import {useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../components/common/constants/Integration";

interface IOptions {
    onCompleted?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useDeleteAlarm = (id: string, isSmart: boolean, options?: IOptions) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deleteAlarm = async () => {
        setLoading(true);
        axios.delete(BACKEND_URL + (isSmart ? 'smart' : 'classic') + '/' + id).then(() => {
            setLoading(false)
        }).catch((e) => {
            options?.onError && options.onError(e.message)
            setError(e.message)
            setLoading(false)
        })
    }
    return {deleteAlarm, loading, error}
}
