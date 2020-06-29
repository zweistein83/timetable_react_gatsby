 // TIME VALIDATION:

 /**
  * Checks if hour part of a time string is valid
  * @param {*} time - "HH:MM"
  */
 const isHoursValid = (time) => {
    const hours = parseInt(time.split(":")[0]);
    if (hours >= 0 && hours <= 24) return true;
    return false;
};

/**
 * Checks if minutes part of a time string is valid
 * @param {string} time - "HH:MM"
 * @return {boolean}
 */
const isMinutesValid = (time) => {
    const minutes = parseInt(time.split(":")[1]);
    if (minutes >= 0 && minutes <= 59) return true;
    return false;
};

/**
 * Checks if the given time string is valid.
 * @param {*} time - "HH:MM"
 */
export const isTimeValid = (time) => {
    return isHoursValid(time) && isMinutesValid(time);
}