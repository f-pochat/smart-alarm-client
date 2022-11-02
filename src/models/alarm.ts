export type Day = "M" | "T" | "W" | 'Th' |  "F" | "S" | "Su"

export interface IAlarm {
    time: string,
    name: string,
    days?: number[]
    deviceId: string,
}

export const getDayByNumber = (day: number): Day => {
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
        case 7:
            return "Su"
        default:
            throw Error("Invalid day number")
    }
}