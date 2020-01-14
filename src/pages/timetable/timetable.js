import React, { Component } from "react";

import { Container, Row, Nav, NavItem, NavLink, Button, ButtonGroup } from "reactstrap";
import TimetableComponent from "../../components/timetable/timetableComponent";
import "./css/timetable.css";


/*
    TODO:
    Make object which contains all event details and settings for timetable. Store in state of Timetable.

    Pass events grouped by day to evenComponent.

    Save to webstorage.

    - If webstorage is empty:
        - load this.emptyState 
        else:
        - load webstorage.

    - Make it possible to lift up state from eventComponent to timetable to make events editable.
        - Pass function from timetable to eventComponent.


    IDEAS:

    Design siden som en almanakk. Sider faller ut av skjermen når man forlater dem.
*/

class Timetable extends Component {
    constructor(props) {
        super(props);
        //colSetting: "col-12 col-xs-2 col-sm-4 col-lg"
        //this.initState = this.initState.bind(this);


        this.state = this.emptyState();
        //console.log(JSON.stringify(this.state));

        /*
        this.state = {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            starthour: 5,
            endhour: 19,
            hour_row_height: 4
        }
        */




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
        Deletes an event specified by an uid (unique identifier) 
        from the state.

    */
    deleteEvent(uid){
        const EVENTS = {...this.state.events};
        Object.keys(EVENTS).forEach((day)=>{
            if (uid in EVENTS[day]){
                console.log(JSON.stringify(EVENTS[day][uid]));
                delete EVENTS[day][uid];                              
            }
            });
        this.setState({events: EVENTS});
        console.log(JSON.stringify(this.state));

    }


    /*
        Returns an empty default state. With default settings and no events.
    */
    emptyState() {
        const initJSON = `{
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

    exampleEvents() {
        const EXAMPLE_EVENTS = `{
            "day_1": {
                "16fa3d39f0a0331": {"name": "Mathematics", "color": "event-blue","time_start": "12:15", "time_end": "14:35"},
                "16fa3d39f0a0332": {"name": "Gymnastics", "color": "event-blue","time_start": "15:00", "time_end": "16:00"},
                "16fa3d39f0a0333": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "12:00"}
            },
            "day_2": {
                "16fa3d39f0a0334": {"name": "English", "color": "event-blue","time_start": "08:15", "time_end": "10:35"},
                "16fa3d39f0a0335": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "12:00"}
            },
            "day_3": {
                "16fa3d39f0a0336": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "12:00"}
            },
            "day_4": {
                "16fa3d39f0a0337": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "12:00"},
                "16fa3d39f0a0338": {"name": "Test", "color": "event-blue","time_start": "13:00", "time_end": "13:20"}
            },
            "day_5": {
                "16fa3d39f0a0339": {"name": "Break", "color": "event-orange","time_start": "11:00", "time_end": "12:00"}
            },
            "day_6": {},
            "day_7": {}
            }`

        this.setState({ events: JSON.parse(EXAMPLE_EVENTS) });

    }


    resetState() {

    }

    changeRowHeight(r_height) {
        const tmp_settings = { ...this.state.settings }
        tmp_settings.hour_row_height = r_height;
        this.setState({ settings: tmp_settings })

    }


    render() {


        //console.table(this.state);
        return (

            <Container className="bg-odd p-5 container-timetable">

                <Nav>
                    <NavItem>
                        <ButtonGroup>
                            <Button size="sm" onClick={() => this.changeRowHeight(10)}>Add event</Button>

                            <Button size="sm" >Edit event</Button>
                            <Button size="sm" onClick={() => this.exampleEvents()}>Example events</Button>
                            <Button size="sm" onClick={() => this.clearEvents()}>Clear events</Button>
                            <Button size="sm" onClick={() => this.deleteEvent("16fa3d39f0a0338")}>Delete test</Button>


                            
                        </ButtonGroup>
                    </NavItem>

                </Nav>

                <Row>

                    <TimetableComponent settings={this.state.settings} events={this.state.events} />
                </Row>
            </Container>
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