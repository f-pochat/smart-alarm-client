export type Day = "Monday" | "Tuesday" | "Wednesday" | "Friday" | "Saturday" | "Sunday"

export interface IAlarm {
    time: Date,
    name: string,
    days?: Day[]
}
