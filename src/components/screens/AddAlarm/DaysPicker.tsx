import * as React from 'react'
import {View} from 'react-native'
import { DayPicker } from 'react-native-picker-weekday'
import {colorPalette} from "../../common/constants/ColorPalette";
const DaysPicker = (props:any) => {
    return (
        <View>
            <DayPicker
                weekdays={props.weekdays}
                setWeekdays={props.setWeekdays}
                activeColor={colorPalette.primary}
                textColor='white'
                inactiveColor='grey'
                dayTextStyle={{fontWeight: '200'}}
            />
            {/*<Text>{props.weekdays}</Text>*/}
        </View>

    )
}
export default DaysPicker
