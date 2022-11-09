import axios from "axios";
import {BACKEND_URL} from "../components/common/constants/Integration";

export const useToggleAlarm = (alarmType: string, id: string) => {
    const toggleAlarm = async () => {
        await axios.put(BACKEND_URL + alarmType + "/" + id)
    }
    return toggleAlarm();
}
