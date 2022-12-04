import React, {useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Switch} from 'react-native-switch';
import {colorPalette} from "../common/constants/ColorPalette";
import {getDayByNumber} from "../../models/alarm";
import {useDeleteAlarm} from "../../hooks/useDeleteAlarm";
import {useCreateAlarm} from "../../hooks/useCreateAlarm";
import {useToggleAlarm} from "../../hooks/useToggleAlarm";

export const addLeadingZeros = (num: number) => {
    return String(num).padStart(2, '0')
}

const Alarm = (props: any) => {
    const [isEnabled, setIsEnabled] = useState(props.alarm.isActive);
    const [modalVisible, setModalVisible] = useState(false);
    const [alarmId, setAlarmId] = useState('')

    const onLongPressButton = () => {
        setModalVisible(true)
        setAlarmId(props.alarm.id)
    }

    const {deleteAlarm} = useDeleteAlarm(alarmId, !!props.alarm.preparationTime,
        {
            onCompleted: () => {
                props.deleteAlarm()
            },
            onError: (error: any) => {
                console.log('errror', error)
            }
        })

    const showDay = (): string => {
        if(!props.alarm.preparationTime) {
            if (new Date(props.alarm.time).getHours() < new Date().getHours() || (
                new Date(props.alarm.time).getHours() == new Date().getHours() && new Date(props.alarm.time).getMinutes() < new Date().getMinutes())
            ) {
                return "Tomorrow"
            } else {
                return "Today"
            }
        }else{
            return ''
        }
    }

    return (
        <TouchableHighlight onLongPress={onLongPressButton} underlayColor={colorPalette.secondary_dark}>
            <>
                <View
                    style={[styles.container, isEnabled ? {backgroundColor: colorPalette.secondary_dark} : {backgroundColor: colorPalette.dark}]}>
                    <View style={styles.rowContainer}>
                        <Text
                            style={[styles.text, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                            {`${addLeadingZeros(new Date(props.alarm.time).getHours())}:${addLeadingZeros(new Date(props.alarm.time).getMinutes())}`}
                        </Text>
                        <Switch
                            backgroundActive='#0784b5'
                            backgroundInactive='gray'
                            circleActiveColor='#39ace7'
                            circleBorderWidth={0}
                            renderActiveText={false}
                            renderInActiveText={false}
                            onValueChange={() => {
                                setIsEnabled(!isEnabled)
                                useToggleAlarm('classic', alarmId)
                            }}
                            value={isEnabled}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 30,
                            paddingRight: 30
                        }}>
                        <Text style={[styles.textName, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                            {props.alarm.name}
                        </Text>
                        <Text style={[styles.textName, isEnabled ? styles.enabledColor : styles.disabledColor]}>
                            {
                                !props.alarm.days ? showDay() : props.alarm.days.split(',').map((d: string) => getDayByNumber(d)).join("-")
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Do you want to delete alarm?</Text>
                                <View style={{flexDirection: "row"}}>
                                    <View style={{flexDirection: "column", justifyContent: 'center', flex: 5}}>
                                        <Pressable style={styles.yesNoPressable} onPress={() => {
                                            deleteAlarm()
                                            setModalVisible(!modalVisible)
                                        }}>
                                            <Text>Yes</Text>
                                        </Pressable>
                                    </View>
                                    <View style={{flexDirection: "column", justifyContent: 'center', flex: 1}}/>
                                    <View style={{flexDirection: "column", justifyContent: 'center', flex: 5}}>
                                        <Pressable style={styles.yesNoPressable}
                                                   onPress={() => setModalVisible(!modalVisible)}>
                                            <Text>No</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        margin: 10,
        borderRadius: 20,
    },

    rowContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
    },

    textName: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
    },

    disabledColor: {
        color: '#aaa',
        fontWeight: '200'
    },

    enabledColor: {
        color: '#ccc',
        fontWeight: '300'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    },
    yesNoPressable: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: colorPalette.primary,
        display: 'flex',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    //
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },

})

export default Alarm;
