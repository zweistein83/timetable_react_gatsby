import React, { Component } from "react";
import "./css/timetable.css";
import { Container, Row, Nav, NavItem, NavLink, Button } from "reactstrap";
import TimetableComponent from "./components/TimetableComponent";


class Timetable extends Component {
    constructor(props) {
        super(props);
        //colSetting: "col-12 col-xs-2 col-sm-4 col-lg"
        this.state = {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            starthour: 7,
            
        }
    }
    render() {
        console.table(this.state);
        return (

            <Container className="bg-odd p-5 container-timetable">

                <Nav>
                    <NavItem>
                        <Button>Add event</Button>
                    </NavItem>
                    <NavItem>
                        <Button>Edit event</Button>
                    </NavItem>

                </Nav>

                <Row>
                    
                    <TimetableComponent days={this.state.days} starthour={this.state.starthour} />
                </Row>
            </Container>
        );
    }
}

export default Timetable;