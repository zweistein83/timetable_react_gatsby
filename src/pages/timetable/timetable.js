import React, { Component } from "react";

import { Container, Row, Nav, NavItem, Button, ButtonGroup, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, Col, ButtonToolbar } from "reactstrap";
import TimetableComponent from "../../components/timetable/timetableComponent";
import FormValidationHelper from "../../components/timetable/formValidationHelper";
import "./css/timetable.css";


/*
    TODO:
    X Make object which contains all event details and settings for timetable. Store in state of Timetable.

    X Pass events grouped by day to evenComponent.

    X Save to webstorage.

    X- If webstorage is empty:
        - load this.emptyState 
        else:
        - load webstorage.

    - Make it possible to lift up state from eventComponent to timetable to make events editable.
        - Pass function from timetable to eventComponent.



    - Make webstorage only save events and settings.
        Leave all other parameters.

    - Make buttons responsive to screen size.

    IDEAS:

    Design siden som en almanakk. Sider faller ut av skjermen når man forlater dem.
*/
const allowed_keys = ["settings", "events"];
const event_colors = ["event-blue", "event-orange"];

class Timetable extends Component {
    constructor(props) {
        super(props);
        //colSetting: "col-12 col-xs-2 col-sm-4 col-lg"
        //this.initState = this.initState.bind(this);


        

        this.json_format_version = "timetable_0.21";

        this.state = this.initState();

        this.toggleModal = this.toggleModal.bind(this);

        this.externalSetState = this.externalSetState.bind(this);
        this.externalGetState = this.externalGetState.bind(this);

        this.FVH = new FormValidationHelper(this.externalGetState, this.externalSetState);

        //console.log(JSON.stringify(this.state));

        /*
        this.state = {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            starthour: 5,
            endhour: 19,
            hour_row_height: 4
        }
        */
        console.groupCollapsed("constructor");
        console.log(this.state.is_modal_open);
        console.groupEnd();



    }

    externalSetState(new_state){
        this.setState(new_state);
    }

    externalGetState(){
        return this.state;
    }

    /*
        Checks webstorage if all keys are legal
        Returns false if an illegal key is found.
    */
    isWebStorageKeysLegal(storage_contents) {
        console.groupCollapsed("isWebStorageKeysLegal");
        console.log(storage_contents);
        console.log(allowed_keys);
        console.groupEnd();
        if (storage_contents === null) return true;
        try {
            Object.keys(storage_contents).forEach((key) => {
                if (!allowed_keys.includes(key.toString())) {
                    throw new Error("Illegal key detected: " + key);
                }
            });
        } catch (error) {
            console.error(error)
            return false;
        }
        return true;
    }

    /*
        Returns contents of local webstorage for the current json_format_version.
        Returns null, if there is no data for current json_format_version in webstorage.
    */
    getWebStorage() {
        const WEB_STORAGE = window.localStorage;
        let STORAGE_CONTENTS = null;

        try {
            STORAGE_CONTENTS = WEB_STORAGE.getItem(this.json_format_version);
        } catch (error) {
            console.error(error);

            return null;
        }
        const STORAGE_CONTENTS_JSON = JSON.parse(STORAGE_CONTENTS)
        console.groupCollapsed("getWebStorage")
        console.log(STORAGE_CONTENTS);
        console.groupEnd();
        if (this.isWebStorageKeysLegal(STORAGE_CONTENTS_JSON)) {
            return STORAGE_CONTENTS_JSON;
        }
        return null;
    }

    /*
        Saves state to local webstorage
    */
    setWebStorage() {
        const WEB_STORAGE = window.localStorage;
        let to_webstorage = {events:this.state.events, settings:this.state.settings};
        try {
            WEB_STORAGE.setItem(this.json_format_version, JSON.stringify(to_webstorage));
        } catch (error) {
            console.error(error);
        }
    }






    /*
        Initializes state with saved settings if these exist.
        If no saved settings exist its initalized with an empty default state.
    */
    initState() {
        /*
        Fix to let gatsby build the site. Causes "ReferenceError window is not defined"
        https://www.gatsbyjs.org/docs/debugging-html-builds/
        */
        const STORAGE_CONTENTS = typeof window !=="undefined" ? this.getWebStorage() : null;
        let tmp_storage = this.emptyState();
        if (STORAGE_CONTENTS === null) {
            return tmp_storage;
        }
        else {
            tmp_storage.events = STORAGE_CONTENTS.events;
            tmp_storage.settings = STORAGE_CONTENTS.settings;
            return tmp_storage;
        }
    }

   




    /*
        Returns an unique hexadecimal string
    */
    get_unique_identifier() {
        const to_hex = n => n.toString(16);
        let time_stamp = Date.now();
        time_stamp = to_hex(time_stamp);
        let random_suffix = Math.floor(Math.random() * 1000);
        random_suffix = to_hex(random_suffix).padStart(4, "0");
        return time_stamp + random_suffix;
    }


    /*
        Creates an event and adds it to the state.
    */
    createEvent(day_id, evt_name, evt_color, evt_time_start, evt_time_end) {
        const EVENTS = { ...this.state.events };
        const EVT_OBJ = { name: evt_name, color: evt_color, time_start: evt_time_start, time_end: evt_time_end };
        EVENTS[day_id][this.get_unique_identifier().toString()] = EVT_OBJ;
        this.setState({ events: EVENTS });
        //"16fa3d39f0a0331": {"name": "Mathematics", "color": "event-blue","time_start": "12:15", "time_end": "14:35"},
    }


    /*
        Deletes an event specified by an uid (unique identifier) 
        from the state.

    */
    deleteEvent(uid) {
        const EVENTS = { ...this.state.events };
        Object.keys(EVENTS).forEach((day) => {
            if (uid in EVENTS[day]) {
                console.log(JSON.stringify(EVENTS[day][uid]));
                delete EVENTS[day][uid];
            }
        });
        this.setState({ events: EVENTS });
        console.log(JSON.stringify(this.state));

    }


    /*
        Returns an empty default state. With default settings and no events.
    */
    emptyState() {
        const initJSON = `{
            "is_modal_open": false,
            "settings": {
                "day_names": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "starthour": 5,
                "endhour" : 19,
                "hour_row_height": 4
                
            },
            "events": {
                "day_1": {},
                "day_2": {},
                "day_3": {},
                "day_4": {},
                "day_5": {},
                "day_6": {},
                "day_7": {}          
            }
        }`
        return JSON.parse(initJSON);

    }


    /*
        Clears all events inside state.
    */
    clearEvents() {

        const EMPTY_EVENTS = `{
                "day_1": {},
                "day_2": {},
                "day_3": {},
                "day_4": {},
                "day_5": {},
                "day_6": {},
                "day_7": {}          
                            }`

        this.setState({ events: JSON.parse(EMPTY_EVENTS) });
    }

    /*
        Replaces all events in state with example data.
    */
    exampleEvents() {
        const EXAMPLE_EVENTS = `{
            "day_1": {
                "16fa3d39f0a0331": {"name": "Mathematics", "color": "event-blue","time_start": "12:15", "time_end": "14:35"},
                "16fa3d39f0a0332": {"name": "Gymnastics", "color": "event-blue","time_start": "15:00", "time_end": "16:00"},
                "16fa3d39f0a0333": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "11:30"}
            },
            "day_2": {
                "16fa3d39f0a0334": {"name": "English", "color": "event-blue","time_start": "08:15", "time_end": "10:35"},
                "16fa3d39f0a0335": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "11:30"}
            },
            "day_3": {
                "16fa3d39f0a0336": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "11:30"}
            },
            "day_4": {
                "16fa3d39f0a0337": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "11:30"},
                "16fa3d39f0a0338": {"name": "Test", "color": "event-blue","time_start": "13:00", "time_end": "13:20"}
            },
            "day_5": {
                "16fa3d39f0a0339": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "11:30"}
            },
            "day_6": {},
            "day_7": {}
            }`

        this.setState({ events: JSON.parse(EXAMPLE_EVENTS) });

    }


    toggleModal(){
        this.setState({
            is_modal_open : !this.state.is_modal_open
        });
    }

    


    resetState() {

    }

    changeRowHeight(r_height) {
        const tmp_settings = { ...this.state.settings }
        tmp_settings.hour_row_height = r_height;
        this.setState({ settings: tmp_settings })

    }


    render() {

        //"16fa3d39f0a0331": {"name": "Mathematics", "color": "event-blue","time_start": "12:15", "time_end": "14:35"},
        //console.table(this.state);
        const formValidator = this.FVH.validate;
        const handleSubmit = this.FVH.handleSubmit;
        const handleBlur = this.FVH.handleBlur;
        const handleChange = this.FVH.handleChange;
        
        

        const EventModal = ({editOradd}) => {
            return (
                <React.Fragment>
                    <Modal onSubmit ={handleSubmit} isOpen={this.state.is_modal_open} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>{editOradd} event</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="evt_name">Name</Label>
                                    <Input type="text" name="evt_name" id="evt_name" placeholder="event name" 
                                    value={this.state.modal_form_name}
                                    onChange={this.handleChange}
                                    >                                       
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="evt_info">Info</Label>
                                    <Input type="text" name="evt_info" id="evt_info" placeholder="event info / location" 
                                    value={this.state.modal_form_info}
                                    onChange={this.handleChange}
                                    ></Input>
                                </FormGroup>
                                <Row>
                                    <FormGroup className="col col-sm-6">
                                        <Label for="evt_day">Day</Label>
                                        <Input type="select" name="evt_day" id="evt_day" onChange={handleChange}>
                                            {this.state.settings.day_names.map((day) => {
                                                return <option key={day} value={day}>{day}</option>
                                            })}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup className="col-12 col-sm-6">
                                        <Label for="evt_color">Color</Label>
                                        <Input type="select" name="evt_color" id="evt_color" onChange={handleChange}>
                                            {event_colors.map((evt_color) => {
                                                return <option key={evt_color} value={evt_color} className={evt_color}>{evt_color.split("-")[1]}</option>
                                            })}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup className="col-12 col-sm-6">
                                        <Label for="evt_time_start">Start time</Label>
                                        <Input type="time" name="evt_time_start" id="evt_time_start" onChange={handleChange}></Input>
                                    </FormGroup>


                                    <FormGroup className="col-12 col-sm-6">
                                        <Label for="evt_time_end">End time</Label>
                                        <Input type="time" name="evt_time_end" id="evt_time_end" onChange={handleChange}></Input>
                                    </FormGroup>
                                </Row>
                                <ButtonToolbar>
                                    <Button type="submit" color="primary" size="sm">Add event</Button>
                                    <Button className="mx-2" size="sm">Cancel</Button>
                                </ButtonToolbar>
                            </Form>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }


        return (


            <React.Fragment>

                {<EventModal editOradd = {"Add"} />}

                <Container className="bg-odd p-5 container-timetable">

                    <Nav>
                        <NavItem>
                            <ButtonGroup>
                                <Button size="sm" onClick={() => this.toggleModal()}>Add event</Button>
                                <Button size="sm" onClick={() => this.createEvent("day_6", "Created", "evt-orange", "16:00", "17:00")}>Add test event</Button>

                                <Button size="sm" onClick={()=>{this.FVH.callerSetState({test:"testing"})
                                    console.log(this.state)}}>Edit event</Button>
                                <Button size="sm" onClick={() => this.exampleEvents()}>Example events</Button>
                                <Button size="sm" onClick={() => this.clearEvents()}>Clear events</Button>
                                <Button size="sm" onClick={() => this.setWebStorage()}>Save events</Button>
                                <Button size="sm" onClick={() => this.deleteEvent("16fa3d39f0a0338")}>Delete test</Button>



                            </ButtonGroup>
                        </NavItem>

                    </Nav>

                    <Row>

                        <TimetableComponent settings={this.state.settings} events={this.state.events} />
                    </Row>
                </Container>
            </React.Fragment>

        );
    }
}

/*
<TimetableComponent days={this.state.settings.day_names}
                        starthour={this.state.settings.starthour}
                        endhour={this.state.settings.endhour}
                        hour_row_height={this.state.settings.hour_row_height} />
*/

export default Timetable;