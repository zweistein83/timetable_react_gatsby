

export default class FormValidationHelper {

    /*
        input: state of caller component/page and a function that sets the state of the component/page.
    */
    constructor(callerGetState, callerSetState) {        
        this.callerGetState = callerGetState;
        this.callerSetState = callerSetState;
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.callerSetState(
            { [name]: value }
        );
    }


    handleBlur(field) {
        this.callerSetState(
            { touched: { ...this.caller_state, [field]: true } }
        );
    }





    validate(evt_name, evt_info) {
        
        /*
            Input: time in format ["HH:MM"]
            Output: time in hours as decimal.
        */
        const timeToHours = (time) => {
            let timeArr = time.split(":");            
            return parseInt(timeArr[0]) + (parseInt(timeArr[1])/60);
        };

        const cState = this.callerGetState();
        const errors = {
            evt_name: "",
            evt_info: "",
            evt_time_start: "",
            evt_time_end: ""
        };

        const EVT_NAME_MAXCHARS = 255;
        const EVT_NAME_MINCHARS = 1;

        const EVT_INFO_MAXCHARS = 255;
        //const EVT_INFO_MINCHARS = 0;

        if (cState.touched.evt_name && evt_name.length > EVT_NAME_MAXCHARS) {
            errors.evt_name = "Name should be less than " + EVT_NAME_MAXCHARS + " characters.";
        }
        else if (cState.touched.evt_name && evt_name.length < EVT_NAME_MINCHARS) {
            errors.evt_name = "Name should be more than " + EVT_NAME_MINCHARS + " characters.";
        }

        if (cState.touched.evt_info && evt_info.length > EVT_INFO_MAXCHARS) {
            errors.evt_info = "Info should be less than " + EVT_INFO_MAXCHARS + " characters.";
        }
        /*
        else if(cState.touched.evt_info && evt_info.length < EVT_INFO_MINCHARS){
            errors.evt_info = "Info should be more than "+ EVT_INFO_MINCHARS +" characters.";
        }
        */

        








        return errors;
    }




}
