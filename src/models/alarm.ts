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

export enum colorPalette{
    background = '#192428',
    primary = '#39ace7',
    secondary = '#0784b5',
    middle = '#717c80',
    tertiary = '#414c50',
    quaternary = '#2d383c',
}
