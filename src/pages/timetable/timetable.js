import React, { Component } from "react";

import { Container, Row, Nav, NavItem, Button, ButtonGroup, Modal, ModalBody, ModalHeader, } from "reactstrap";
import TimetableComponent from "../../components/timetable/timetableComponent";
import FormTimetableAddEdit from "../../components/timetable/formTimetableAddEdit";
import { get_unique_identifier } from "../../helper_functions/unique_identifier";

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
const ALLOWED_KEYS = ["settings", "events"];
const EVENT_COLORS = ["event-blue", "event-green", "event-orange"];

/**
 * Timetable Component
 */
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
        this.createTimetableEvent = this.createTimetableEvent.bind(this);
        //this.FVH = new FormValidationHelper(this.externalGetState, this.externalSetState);

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

    /**
     * Sets state. Can be called from outside component
     * @param {*} new_state 
     */
    externalSetState(new_state) {
        this.setState(new_state);
    }

    /**
     * Gets state. Can be called from outside component
     */
    externalGetState() {
        return this.state;
    }



    /**
     * Checks webstorage if all keys are legal
     * @param {*} storage_contents
     * @return {boolean} - true if legal else false 
     */

    isWebStorageKeysLegal(storage_contents) {
        console.groupCollapsed("isWebStorageKeysLegal");
        console.log(storage_contents);
        console.log(ALLOWED_KEYS);
        console.groupEnd();
        if (storage_contents === null) return true;
        try {
            Object.keys(storage_contents).forEach((key) => {
                if (!ALLOWED_KEYS.includes(key.toString())) {
                    throw new Error("Illegal key detected: " + key);
                }
            });
        } catch (error) {
            console.error(error)
            return false;
        }
        return true;
    }


    /**
     * Returns contents of local webstorage for the current json_format_version.
     * Returns null, if there is no data for current json_format_version in webstorage.
     */
    getWebStorage() {
        const WEB_STORAGE = window.localStorage;
        let storage_contents = null;

        try {
            storage_contents = WEB_STORAGE.getItem(this.json_format_version);
        } catch (error) {
            console.error(error);

            return null;
        }
        const STORAGE_CONTENTS_JSON = JSON.parse(storage_contents)
        console.groupCollapsed("getWebStorage")
        console.log(storage_contents);
        console.groupEnd();
        if (this.isWebStorageKeysLegal(STORAGE_CONTENTS_JSON)) {
            return STORAGE_CONTENTS_JSON;
        }
        return null;
    }


    /**
     * Saves state to local webstorage
     */
    setWebStorage() {
        const WEB_STORAGE = window.localStorage;
        let to_webstorage = { events: this.state.events, settings: this.state.settings };
        try {
            WEB_STORAGE.setItem(this.json_format_version, JSON.stringify(to_webstorage));
        } catch (error) {
            console.error(error);
        }
    }




    /**
     * Initializes state with saved settings if these exist.
     * If no saved settings exist its initalized with an empty default state.
     */
    initState() {
        /*
        Fix to let gatsby build the site. Causes "ReferenceError window is not defined"
        https://www.gatsbyjs.org/docs/debugging-html-builds/
        */
        const STORAGE_CONTENTS = typeof window !== "undefined" ? this.getWebStorage() : null;
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




    /**
     * Creates an event and adds it to the state.
     * 
     * @param {string} day_id   -   
     * @param {string} evt_name     
     * @param {string} evt_color 
     * @param {*} evt_time_start 
     * @param {*} evt_time_end 
     */
    createTimetableEvent(day_id, evt_name, evt_color, evt_time_start, evt_time_end) {
        const EVENTS = { ...this.state.events };
        const EVT_OBJ = { name: evt_name, color: evt_color, time_start: evt_time_start, time_end: evt_time_end };
        EVENTS[day_id][get_unique_identifier().toString()] = EVT_OBJ;
        this.setState({ events: EVENTS });
        //"16fa3d39f0a0331": {"name": "Mathematics", "color": "event-blue","time_start": "12:15", "time_end": "14:35"},
    }


    /*
        Deletes an event specified by an uid (unique identifier) 
        from the state.

    */

    /**
     * Deletes an event
     * @param {string} uid - unique event-id
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



    /**
     * Returns an empty default state. With default settings and no events.
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



    /**
     *  Clears all events inside state.
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



    /**
     * Replaces all events in state with example data.
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

    /**
     * Toggles the modal containing the form for adding new events.
     */
    toggleModal() {
        this.setState({
            is_modal_open: !this.state.is_modal_open
        });
    }




    resetState() {

    }

    /**
     * Changes the row height.
     * @param {number} r_height 
     */
    changeRowHeight(r_height) {
        const tmp_settings = { ...this.state.settings }
        tmp_settings.hour_row_height = r_height;
        this.setState({ settings: tmp_settings })

    }


    render() {

        //"16fa3d39f0a0331": {"name": "Mathematics", "color": "event-blue","time_start": "12:15", "time_end": "14:35"},
        //console.table(this.state);
        //const formValidator = this.FVH.validate;
        //const handleSubmit = this.FVH.handleSubmit;
        //const handleBlur = this.FVH.handleBlur;
        //const handleChange = this.FVH.handleChange;


        /**
         * Modal for editing or adding events
         * @param {*} editOradd 
         */
        const EventModal = ({ editOradd }) => {
            return (
                <React.Fragment>
                    <Modal isOpen={this.state.is_modal_open} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>{editOradd} event</ModalHeader>
                        <ModalBody>
                            <FormTimetableAddEdit
                                day_names={this.state.settings.day_names}
                                event_colors={EVENT_COLORS}
                                createTimetableEvent={this.createTimetableEvent}
                            />
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }


        return (


            <React.Fragment>

                {<EventModal editOradd={"Add"} />}

                <Container className="bg-odd p-5 container-timetable">

                    <Nav>
                        <NavItem>
                            <ButtonGroup>
                                <Button size="sm" onClick={() => this.toggleModal()}>Add event</Button>
                                {/*<Button size="sm" onClick={() => this.createTimetableEvent("day_6", "Created", "evt-orange", "16:00", "17:00")}>Add test event</Button>*/}

                                {/*<Button size="sm" onClick={()=>{this.FVH.callerSetState({test:"testing"}); console.log(this.state)}}>Edit event</Button>*/}
                                <Button size="sm" onClick={() => this.exampleEvents()}>Example events</Button>
                                <Button size="sm" onClick={() => this.clearEvents()}>Clear events</Button>
                                <Button size="sm" onClick={() => this.setWebStorage()}>Save events</Button>
                                {/*<Button size="sm" onClick={() => this.deleteEvent("16fa3d39f0a0338")}>Delete test</Button>*/}



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