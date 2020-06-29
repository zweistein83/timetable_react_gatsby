
/**
 * Generates unique identifier
 * @return {string} - unique hexidecimal string
 */
 export const get_unique_identifier = ()=> {

    const to_hex = n => n.toString(16);
    let time_stamp = Date.now();
    
    time_stamp = to_hex(time_stamp);
    let random_suffix = Math.floor(Math.random() * 1000);
    random_suffix = to_hex(random_suffix).padStart(4, "0");
    
    return time_stamp + random_suffix;
}
