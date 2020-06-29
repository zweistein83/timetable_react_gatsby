 // TIME VALIDATION:

 const isHoursValid = (time) => {
    const hours = parseInt(time.split(":")[0]);
    if (hours >= 0 && hours <= 24) return true;
    return false;
};

const isMinutesValid = (time) => {
    const minutes = parseInt(time.split(":")[1]);
    if (minutes >= 0 && minutes <= 59) return true;
    return false;
};

export const isTimeValid = (time) => {
    return isHoursValid(time) && isMinutesValid(time);
}