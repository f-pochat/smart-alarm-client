export type Day = "Monday" | "Tuesday" | "Wednesday" | 'Thursday' |  "Friday" | "Saturday" | "Sunday"

export interface IAlarm {
    time: string,
    name: string,
    days?: number[]
    deviceId: string,
}

export const getDayByNumber = (day: number): Day => {
    switch (day) {
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        case 7:
            return "Sunday"
        default:
            throw Error("Invalid day number")
    }
}