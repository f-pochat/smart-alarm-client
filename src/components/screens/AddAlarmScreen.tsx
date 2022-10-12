import React, {useState} from 'react';
import {View, Text} from "react-native";
import DaysPicker from "../AddAlarm/DaysPicker";
import {Day} from "../../models/alarm";

const AddAlarmScreen = () => {
    const [weekdays, setWeekdays] = useState([])
    return (
        <View>
            <DaysPicker
            weekdays={weekdays}
            setWeekdays={(e:any)=>setWeekdays(e)}
            ></DaysPicker>
        </View>
    );
};

export default AddAlarmScreen;
