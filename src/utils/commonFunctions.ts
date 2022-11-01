export function convertDate(date:string | Date){
    function addZero(val: number |string):string{
        return val.toString().length === 1 ? "0"+val : val.toString()
    }
    const newDate:Date = new Date(date)
    return addZero(newDate.getDate()) + "."
        + addZero((Number(newDate.getMonth()) + 1)) + "."
        + newDate.getFullYear() + " "
        + addZero(newDate.getHours()) + ":"
        + addZero(newDate.getMinutes())
}