import {Text, View} from "react-native";
import React from "react";
import {colorPalette} from "../../models/alarm";

export const SmartAlarm = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorPalette.background }}>
            <Text style={{color: 'white'}}>Smart</Text>
        </View>
    );
}