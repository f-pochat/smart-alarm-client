export enum Day {
    Monday,
    Tuesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

export interface IAlarm {
    time: string,
    name: string,
    days?: Day[]
}