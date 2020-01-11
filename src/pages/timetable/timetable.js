import React, { Component } from "react";
import "./css/timetable.css";
import { Container, Row, Nav, NavItem, NavLink, Button } from "reactstrap";
import TimetableComponent from "./components/TimetableComponent";
import EventsContainer from "./components/eventsComponent";

class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            starthour: 7,
            colSetting: "col-12 col-xs-2 col-sm-4 col-lg"
        }
    }
    render() {
        console.table(this.state);
        return (

            <Container>

                <Nav>
                    <NavItem>
                        <Button>Add event</Button>
                    </NavItem>
                    <NavItem>
                        <Button>Edit event</Button>
                    </NavItem>

                </Nav>

                <Row>
                    <React.Fragment>
                        <EventsContainer colSetting={this.state.starthour} />
                    </React.Fragment>
                    <TimetableComponent days={this.state.days} starthour={this.state.starthour} colSetting={this.state.colSetting} />
                </Row>
            </Container>
        );
    }
}

export default Timetable;