import React, { Component } from "react";
import "./css/timetable.css";
import { Container, Row, Nav, NavItem, NavLink, Button, ButtonGroup } from "reactstrap";
import TimetableComponent from "./components/TimetableComponent";


/*
    TODO:
    Make object which contains all event details and settings for timetable. Store in state of Timetable.

    Pass events grouped by day to evenComponent.

    Save to webstorage.
*/

class Timetable extends Component {
    constructor(props) {
        super(props);
        //colSetting: "col-12 col-xs-2 col-sm-4 col-lg"
        //this.initState = this.initState.bind(this);
       

        this.state = this.emptyState();
        console.log(JSON.stringify(this.state));

        /*
        this.state = {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            starthour: 5,
            endhour: 19,
            hour_row_height: 4
        }
        */
        
        

        
    }


    emptyState(){
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


    resetState(){
        
    }

    changeRowHeight(r_height) {
        this.setState({ hour_row_height: r_height })

    }


    render() {
        
        
        console.table(this.state);
        return (
            
            <Container className="bg-odd p-5 container-timetable">
                
                <Nav>
                    <NavItem>
                        <ButtonGroup>
                            <Button size="sm" onClick={() => this.changeRowHeight(10)}>Add event</Button>

                            <Button size="sm" >Edit event</Button>
                        </ButtonGroup>
                    </NavItem>

                </Nav>

                <Row>

                    <TimetableComponent days={this.state.settings.day_names}
                        starthour={this.state.settings.starthour}
                        endhour={this.state.settings.endhour}
                        hour_row_height={this.state.settings.hour_row_height} />
                </Row>
            </Container>
        );
    }
}

export default Timetable;