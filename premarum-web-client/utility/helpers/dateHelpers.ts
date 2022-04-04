import moment from "moment";


export function convertToMilitaryTime(targetDate:string): string {
    return moment(targetDate.toLocaleLowerCase(), "hh:mm a")
        .format('HH:mm');
}