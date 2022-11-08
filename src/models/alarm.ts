export type Day = "M" | "T" | "W" | 'Th' |  "F" | "S" | "Su"

export interface IAlarm {
    time: Date,
    name: string,
    days?: string,
    deviceId: string,
}

export interface SAlarm {
    name: string,
    alarmLocationLat: string,
    alarmLocationLong: string,
    destinationLocationLat: string,
    destinationLocationLong: string,
    preparationTime: number,
    arrivalTime: Date,
    deviceId: string
}

export const getDayByNumber = (dayNum: string): Day => {
    const day = parseInt(dayNum)
    switch (day) {
        case 1:
            return "M"
        case 2:
            return "T"
        case 3:
            return "W"
        case 4:
            return "Th"
        case 5:
            return "F"
        case 6:
            return "S"
        case 0:
        case 7:
            return "Su"
        default:
            throw Error("Invalid day number")
    }
}