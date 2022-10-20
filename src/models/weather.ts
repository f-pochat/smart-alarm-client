export interface Weather{
    actualTemperature: string,
    todayMinTemperature: string,
    todayMaxTemperature: string,
    todayWeather: string,
    tomorrowWeather: string,
    datWeather: string,
}

export const weatherStatus = (weatherCode: number): string => {
    const weather = weatherCode.toString()
    switch (weather[0]){
        case "0":
            return "sun"
        case "1":
        case "2":
            return "cloud-sun"
        case "3":
        case "4":
            return "cloud"
        case "5":
        case "6":
            return "cloud-rain"
        case "7":
            return "cloud-snow"
        case "8":
            return "cloud-showers"
        case "9":
            return "cloud-bolt"
        default:
            return ""
    }
}
