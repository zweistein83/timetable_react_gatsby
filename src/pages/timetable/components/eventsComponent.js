import React, { Component } from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";

class EventsComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        function EventBody({ event_style_custom }) {

            return (
                <React.Fragment>
                    <Card className="event-card" style={event_style_custom}>
                        <CardHeader className="event-header">Testing123</CardHeader>
                        <CardBody className="event-body">
                            09:00
                    </CardBody>
                    </Card>
                </React.Fragment>
            );

        }
        /*
            hour_row_height is the height of a row in rem.
            If starthour is 7 0 * hour_row_height places
            the event at 07:00. 1 * hour_row_height at 08:00
            and so on.
        
            TODO: 
        
            - Event height
            - Event name
            - Event starttime
            - Event endtime
            - Event location
            - Event details
        
            
        
        */
        function EventDetails({ hour_row_height, hour }) {
            const top_pos = (1 * hour_row_height) + "rem"
            const event_style_custom = { top: top_pos, height: "2rem" }
            return (
                <React.Fragment>
                    <EventBody event_style_custom={event_style_custom} />
                </React.Fragment>
            );
        }


        function EventsContainer({hour_row_height }) {
            return (
                <div className="overlay-wrapper">
                    <div className="overlay">
                        <Col className="col-12">
                            <EventDetails hour_row_height={hour_row_height} />
                        </Col>
                    </div>
                </div>)
        }

        return (
            <React.Fragment>
                <EventsContainer hour_row_height={this.props.hour_row_height}/>
            </React.Fragment>
        );

    }
}

export default EventsComponent;