/*  
    timeToIntarray(time):
    Input: time as "HH:MM"
    Output: time as [H,M] where H and M are integers
*/
const timeToIntArray = (time) => {
    return time.split(":").map((s) => parseInt(s));
}

/*
    timeArrayToHours(timeArr)
    Input: time as [H,M] where H and M are integers
    Output: time in hours as a decimal.
*/
const timeArrayToHours= (timeArr) => {
    return timeArr[0] + (timeArr[1] / 60)
}


/*
    timeToHours(time)
    Input: time as "HH:MM"
    Output: time in hours as a decimal.
*/
export const timeToHours = (time) => {
    return timeArrayToHours(timeToIntArray(time));
}



