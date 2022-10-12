import * as React from 'react'
import {StyleSheet, View,Text} from 'react-native'
import { DayPicker } from 'react-native-picker-weekday'
const DaysPicker = (props:any) => {
    return (
        <View>
            <DayPicker
                weekdays={props.weekdays}
                setWeekdays={props.setWeekdays}
                activeColor='#0784b5'
                textColor='white'
                inactiveColor='grey'
                dayTextStyle={{fontWeight: '200'}}
            />
            <Text>{props.weekdays}</Text>
        </View>

    )
}
export default DaysPicker