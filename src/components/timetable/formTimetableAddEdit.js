import React, { Component } from "react";
import { Row, Button, Form, FormGroup, Input, Label, ButtonToolbar, FormFeedback } from "reactstrap";
export default class FormTimetableAddEdit extends Component {



    /*
        TODO:

        - only submit if everything is ok.
        - fix formfeedback
        - do not allow overlapping events.



    */
    
    constructor(props) {
       
        super(props);
        
        this.state = {
            evt_name: "",
            evt_info: "",
            evt_color: this.props.event_colors[0],
            evt_day: "day_1",
            evt_time_start: "",
            evt_time_end: "",

            touched: {
                evt_name: false,
                evt_info: false,
                evt_time_start: false,
                evt_time_end: false,
                evt_color: false
            },


        };



    }

    /*
    setFormData(data_obj) {
        Object.assign(this.formData, data_obj);
    }
    */
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log("handleChange: " + name + " : " + value);


        this.setState(
            { [name]: value }
        );
        console.log(this.state);

        /*
        this.callerSetState(
            { [name]: value }
        );
        */
    }


    handleBlur = (field) => {
        console.log(field);
        this.setState(
            { touched: { ...this.state.touched, [field]: true } }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.group("FORM SUBMIT");
        console.log(this.state);
        console.log(event);
        console.groupEnd();

        // Only create event if there are no errors / all error.values are empty.
        const errors = this.validate();
        if (Object.keys(errors).reduce((acc, key) => acc && errors[key] === "", true)) {
            console.log("Sucessfully created event");
            this.props.createTimetableEvent(this.state.evt_day, this.state.evt_name, this.state.evt_color, this.state.evt_time_start, this.state.evt_time_end);

        }
        else console.log("There was an error");
        console.groupEnd();
        // Updates state inside timetable.js

    }





    validate = () => {
        const evt_name = this.state.evt_name;
        const evt_info = this.state.evt_info;
        const evt_time_start = this.state.evt_time_start;
        const evt_time_end = this.state.evt_time_end;

        /*
            Input: time in format ["HH:MM"]
            Output: time in hours as decimal.
        */

        console.groupCollapsed("form validate");
        console.log(evt_name);
        console.log("TOUCHED:")
        console.table(this.state);





        var errors = {
            evt_name: "",
            evt_info: "",
            evt_time_start: "",
            evt_time_end: ""
        };

        const EVT_NAME_MAXCHARS = 255;
        const EVT_NAME_MINCHARS = 3;

        const EVT_INFO_MAXCHARS = 255;
        //const EVT_INFO_MINCHARS = 0;
        Object.keys(this.state.touched).forEach((element) => {
            console.log(element);
        });


        if (evt_name.length > EVT_NAME_MAXCHARS) {
            errors.evt_name = "Name should be less than " + EVT_NAME_MAXCHARS + " characters.";
        }
        else if (evt_name.length < EVT_NAME_MINCHARS) {
            errors.evt_name = "Name should be more than " + EVT_NAME_MINCHARS + " characters.";
        }

        if (evt_info.length > EVT_INFO_MAXCHARS) {
            errors.evt_info = "Info should be less than " + EVT_INFO_MAXCHARS + " characters.";
        }
        /*
        else if(cState.touched.evt_info && evt_info.length < EVT_INFO_MINCHARS){
            errors.evt_info = "Info should be more than "+ EVT_INFO_MINCHARS +" characters.";
        }
        */

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

        const isTimeValid = (time) => {
            return isHoursValid(time) && isMinutesValid(time);
        }

        const timeToHours = (time) => {
            let timeArr = time.split(":");
            return parseInt(timeArr[0]) + (parseInt(timeArr[1]) / 60);
        };

        console.log("TIME FUCKING START = " + evt_time_start);
        console.log("TIME FUCKING END = " + evt_time_end);
        if (evt_time_start && evt_time_end) {
            // TIME START:
            if (!isTimeValid(evt_time_start)) {
                errors.evt_time_start = "Illegal time. Must be in format \"HH:MM\"";
            };

            // TIME END
            if (!isTimeValid(evt_time_end)) {
                errors.evt_time_end = "Illegal time. Must be in format \"HH:MM\"";
            };

            // time_end must be later than time_start

            if (timeToHours(evt_time_start) >= timeToHours(evt_time_end)) {
                errors.evt_time_end = "End time must be later than start time";
                errors.evt_time_start = "Start time must be before end time";
            }
        }







        console.log("ERRORS:");
        console.table({ errors });
        console.groupEnd();
        return errors;
    }





    render() {
        const errors = this.validate();
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="evt_name">Name</Label>
                    <Input type="text" name="evt_name" id="evt_name" placeholder="event name"
                        value={this.props.modal_form_name}
                        valid={errors.evt_name === "" && this.state.evt_name !== ""}
                        invalid={errors.evt_name !== ""}
                        onChange={this.handleChange}

                        required
                    />
                    <FormFeedback>{errors.evt_name}</FormFeedback>

                </FormGroup>

                <FormGroup>
                    <Label for="evt_info">Info</Label>
                    <Input type="text" name="evt_info" id="evt_info" placeholder="event info / location"
                        value={this.props.modal_form_info}
                        onChange={this.handleChange}
                        valid={this.state.evt_name !== "" && errors.evt_info === ""}
                        invalid={errors.evt_info !== ""}
                    ></Input>
                </FormGroup>
                <Row>
                    <FormGroup className="col col-sm-6">
                        <Label for="evt_day">Day</Label>
                        <Input type="select" name="evt_day" id="evt_day" onChange={this.handleChange}>
                            {this.props.day_names.map((day, day_i) => {
                                return <option key={day} value={"day_" + (day_i + 1)}>{day}</option>
                            })}
                        </Input>
                    </FormGroup>

                    <FormGroup className="col-12 col-sm-6">
                        <Label for="evt_color">Color</Label>
                        <Input type="select" name="evt_color" id="evt_color" onChange={this.handleChange}>
                            {this.props.event_colors.map((evt_color) => {
                                return <option key={evt_color} value={evt_color} className={evt_color}>{evt_color.split("-")[1]}</option>
                            })}
                        </Input>
                    </FormGroup>

                    <FormGroup className="col-12 col-sm-6">
                        <Label for="evt_time_start">Start time</Label>
                        <Input type="time" name="evt_time_start" id="evt_time_start"
                            value={this.state.evt_time_start}
                            onChange={this.handleChange}
                            required
                            valid={this.state.evt_time_start !== "" && errors.evt_time_start === ""}
                            invalid={errors.evt_time_start !== ""}
                        />
                        <FormFeedback>{errors.evt_time_start}</FormFeedback>
                    </FormGroup>


                    <FormGroup className="col-12 col-sm-6">
                        <Label for="evt_time_end">End time</Label>
                        <Input type="time" name="evt_time_end" id="evt_time_end"
                            value={this.state.evt_time_end}
                            onChange={this.handleChange}
                            required
                            valid={this.state.evt_time_end !== "" && errors.evt_time_end === ""}
                            invalid={errors.evt_time_end !== ""}
                        />
                        <FormFeedback>{errors.evt_time_end}</FormFeedback>
                    </FormGroup>
                </Row>
                <ButtonToolbar>
                    <Button type="submit" value="submit" color="primary" size="sm">Add event</Button>
                    <Button className="mx-2" size="sm">Cancel</Button>
                </ButtonToolbar>
            </Form>

        );
    }

}
